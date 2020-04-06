import React, { Component } from "react"
import ReactDOM from 'react-dom'
import axios from 'axios'
import { MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact'
import { BrowserRouter as Router,
  Redirect } from "react-router-dom";
import Message from './peref/message'
import "axios-jsonp-pro"
import * as $ from 'jquery'
import LANG from '../lang'
import makeLoad from './peref/makeLoad'
// import io from 'socket.io-client'
// const socket = io()
//da
class Signin extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      email: '',
      pass: '',
      redirect: '',
      vkUrl: '',
      vkProf : {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.subme = this.subme.bind(this);
  }
  urla = `https://oauth.vk.com/authorize?client_id=7356046&display=page&scope=4&redirect_uri=http://${window.location.host}/signin/vk&scope=photos&response_type=code&v=5.52`
  urlb = `https://accounts.google.com/o/oauth2/auth?redirect_uri=http://${window.location.host}/signin/goo/&response_type=code&client_id=645970962185-vsd8i9vo1qlmlmjhc386p04onmmmvm5v.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile`
  subme = (e) => {
    e.preventDefault()
    if (global.__canAjax == true){
    global.__canAjax = false
    setTimeout(()=>{global.__canAjax = true},500)
    const del = makeLoad()
    axios({
      method: 'POST',
      url: '/signin',
      withCredentials : true,
      data: {
        email: this.state.email,
        pass: this.state.pass,
        action: e.target.action.value
      }
    }).then(r=>{
      console.log(r)
      ReactDOM.unmountComponentAtNode($(del)[0])
      if (r.data.out == "neok-blocked"){
        let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
        $('.message-cont').append('<div id='+id+'></div>')
        ReactDOM.render(<Message text1={LANG.oops[localStorage.getItem('lang')]} text2={LANG.urblocked[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
      }
      else if (r.data.out == "neok"){
        let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
        $('.message-cont').append('<div id='+id+'></div>')
        ReactDOM.render(<Message text1={LANG.oops[localStorage.getItem('lang')]} text2={LANG.somewrong[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
      }else if(r.data.out == "ok"){
        let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
        $('.message-cont').append('<div id='+id+'></div>')
        ReactDOM.render(<Message text1={LANG.yeah[localStorage.getItem('lang')]} text2={LANG.urlogined[localStorage.getItem('lang')]} color="success" id={id}/>, $('#'+id)[0])
        this.setState({redirect : 'home'})
        global.__signed = r.data.signed
        global.__user = r.data.user
      }
    })
  }
 }
  checkRedirect(){
    if (this.state.redirect == 'home'){
      return (<Redirect to='/' />)
    }
    if (this.state.redirect == 'ref'){
        return (<Redirect to='/signin/social/' />)
      }
    if (this.state.redirect == 'tosign'){
        return (<Redirect to='/signin' />)
      }

  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value},e=>e)
  }
  render(){
    const vkStyle = {
      display: 'inline-block',
      width: '40px',
    }
    const vkStyleA = {
      margin: '0 10px',
      display: 'inline-block',
      textAlign: 'center',
      marginTop: '0px'
    }
    let codeid = window.location.href.indexOf('?code=')
    if (codeid!=-1 && (window.location.pathname=="/signin/vk/" || window.location.pathname=="/signin/vk")){
      global.__codevk = window.location.href.slice(codeid+6)
      global.__urla = `https://oauth.vk.com/access_token?client_id=7356046&client_secret=RkjosevOktcKtd6vRXNN&redirect_uri=http://${window.location.host}/signin/vk&code=${global.__codevk}`
      if (global.__canAjax == true){
        global.__canAjax = false
        setTimeout(()=>{global.__canAjax = true},500)
      this.setState({redirect : 'ref'},()=>{
        const url = global.__urla
        const del2 = makeLoad()
        $.ajax({
          method: 'POST',
          url: `/sigvk`,
          data:{url:global.__urla},
          success:r=>{
            ReactDOM.unmountComponentAtNode($(del2)[0])
            myfunc(JSON.parse(r))
          },
          error:e=>ReactDOM.unmountComponentAtNode($(del2)[0])
          })
      })
    }
    }
    if (codeid!=-1 && (window.location.pathname=="/signin/goo/" || window.location.pathname=="/signin/goo")){
      global.__codegoo = window.location.href.slice(codeid+6,window.location.href.indexOf('&'))
      global.__urlgoo = `https://accounts.google.com/o/oauth2/token?code=${global.__codegoo}&client_id=645970962185-vsd8i9vo1qlmlmjhc386p04onmmmvm5v.apps.googleusercontent.com&client_secret=qHI-nVfKOJ2gerY0Lxa6zBfS&redirect_uri=http://${window.location.host}/signin/goo/&grant_type=authorization_code`
      if (global.__canAjax == true){
        global.__canAjax = false
        setTimeout(()=>{global.__canAjax = true},500)
      this.setState({redirect : 'ref'},()=>{
        const url = global.__urlgoo
        const del2 = makeLoad()
        $.ajax({
          method: 'POST',
          url: `/siggoo`,
          data:{url: url},
          success:r=>{
            ReactDOM.unmountComponentAtNode($(del2)[0])
            myfunc2(JSON.parse(r))
          },
          error:e=>ReactDOM.unmountComponentAtNode($(del2)[0])
          }) 
      })
    }
    }
    const myfunc = (obj) => {
      global.__params = obj;
      window.location.hash=''
      //у нас есть эмейл айди и токен
      const f1 = async () =>{
            await $.ajax({
            method: 'GET',
            url: `https://api.vk.com/method/users.get?access_token=${global.__params['access_token']}&v=5.52`,
            dataType: 'JSONP',
            error: e=>e,
            success: r=>{
              if (r.response){
                this.setState({vkProf : r.response[0]})
              }
              }
            })
            await $.ajax({
            method: 'GET',
            url: `https://api.vk.com/method/photos.get?album_id=profile&access_token=${global.__params['access_token']}&v=5.52`,
            dataType: 'JSONP',
            error: e=>e,
            success: r=>{
              if (r.response){
                this.setState({vkUrl : r.response.items[r.response.items.length-1].photo_604 || ''})
               }
            }
            })
          }
          f1().then((v)=>{
            axios({
              method: 'POST',
              withCredentials : true,
              url: '/signin',
              data: {
                email: this.state.vkProf.id,
                pass: this.state.vkProf.id,
                action: 'signvk',
                name: `${this.state.vkProf.first_name} ${this.state.vkProf.last_name}`,
                img: this.state.vkUrl
              }
            }).then(r=>{
              if (r.data.out == "neok-blocked"){
                let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
                $('.message-cont').append('<div id='+id+'></div>')
                ReactDOM.render(<Message text1={LANG.oops[localStorage.getItem('lang')]} text2={LANG.urblocked[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
              }
              else if (r.data.out == "neok"){
                let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
                $('.message-cont').append('<div id='+id+'></div>')
                ReactDOM.render(<Message text1={LANG.oops[localStorage.getItem('lang')]} text2={LANG.somewrong[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
              }else if(r.data.out == "ok"){
                let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
                $('.message-cont').append('<div id='+id+'></div>')
                ReactDOM.render(<Message text1={LANG.yeah[localStorage.getItem('lang')]} text2={LANG.urloginedvk[localStorage.getItem('lang')]} color="success" id={id}/>, $('#'+id)[0])
                this.setState({redirect : 'home'})
                global.__signed = r.data.signed
                global.__user = r.data.user
              }
            })
          }).catch((er)=>{
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1={LANG.oops[localStorage.getItem('lang')]} text2={LANG.somewrong[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
          })
        }
    const myfunc2 = (obj) => {
      if (obj.email === undefined){
        let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
          $('.message-cont').append('<div id='+id+'></div>')
          ReactDOM.render(<Message text1={LANG.error[localStorage.getItem('lang')]} text2={LANG.somewrong[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
          this.setState({redirect : 'tosign'})
        return
      }
      global.__paramsgoo = obj;
      console.log(obj)
      window.location.hash=''
      axios({
        method: 'POST',
        url: '/signin',
        data: {
          email: `start.g00.c0m:${global.__paramsgoo.email}:g00.c0m.end`,
          pass: `start.g00.c0m:${global.__paramsgoo.id}:g00.c0m.end`,
          action: 'signvk',
          name: global.__paramsgoo.name,
          img: global.__paramsgoo.picture
        }
      }).then(r=>{
        if (r.data.out == "neok-blocked"){
          let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
          $('.message-cont').append('<div id='+id+'></div>')
          ReactDOM.render(<Message text1={LANG.oops[localStorage.getItem('lang')]} text2={LANG.urblocked[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
        }
        else if (r.data.out == "neok"){
          let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
          $('.message-cont').append('<div id='+id+'></div>')
          ReactDOM.render(<Message text1={LANG.oops[localStorage.getItem('lang')]} text2={LANG.somewrong[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
        }else if(r.data.out == "ok"){
          let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
          $('.message-cont').append('<div id='+id+'></div>')
          ReactDOM.render(<Message text1={LANG.yeah[localStorage.getItem('lang')]} text2={LANG.urloginedgoo[localStorage.getItem('lang')]} color="success" id={id}/>, $('#'+id)[0])
          this.setState({redirect : 'home'})
          global.__signed = r.data.signed
          global.__user = r.data.user
        }
      })
    }
    return (
            <MDBCard style={{margin:'20px',width : '400px', height : '500px', minHeigth : "300px"}}>
              <MDBCardBody>
                <form style={{color:'#2196f3'}} onSubmit={ this.subme }>
                  <p style={{color:'rgb(135, 134, 197)'}} className="inverted h4 text-center py-4">{LANG.signin[localStorage.getItem('lang')]}</p>
                  <div className="grey-text">
                    <MDBInput
                      label={LANG.uemail[localStorage.getItem('lang')]}
                      icon="envelope"
                      group
                      required
                      type="email"
                      validate
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      onChange= { this.handleChange }
                      value= { this.state.value }
                      name="email"
                      error="wrong"
                      className="inverted"
                      success="right"
                    />
                    <MDBInput
                      label={LANG.upass[localStorage.getItem('lang')]}
                      icon="lock"
                      name="pass"
                      className="inverted"
                      required
                      onChange= { this.handleChange }
                      value= { this.state.value }
                      group
                      type="password"
                      pattern="[A-Za-z0-9_]{3,10}$"
                      validate
                    />
                    <MDBInput
                      name="action"
                      value="login"
                      className="inverted"
                      required
                      type="hidden"
                    />
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn  style={{display:'block', margin:'auto',color:'white',backgroundColor:'rgb(135, 134, 197)'}}color="" type="submit">
                    {LANG.signin[localStorage.getItem('lang')]}
                    </MDBBtn>
                    <hr style={{backgroundColor:'#eeffee',marginTop:'30px'}}/>
                  <span style={{padding:'10px',display:'inline-block',width:'auto',height:'auto',backgroundColor:'transparent',boxShadow:'unset',color: '#9e9e9e',fontSize: '16px'}} >{LANG.usesocial[localStorage.getItem('lang')]}:</span>
                    <a className="inverted" href={this.urla} style={vkStyleA}><img style={vkStyle}src="./assets/vk.svg" alt="vk"/></a>
                    <a className="inverted" href={this.urlb} style={vkStyleA}><img style={vkStyle}src="./assets/goo.svg" alt="google"/></a>
                  </div>
                </form>
                { this.checkRedirect() }
              </MDBCardBody>
            </MDBCard>
    )
  }
}

export default Signin;