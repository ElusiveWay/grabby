import React, { Component } from "react"
import ReactDOM from 'react-dom'
import axios from 'axios'
import { MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact'
import { BrowserRouter as Router,
  Redirect } from "react-router-dom";
import Message from './peref/message'
import "axios-jsonp-pro"
import * as $ from 'jquery'
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
  urla = `https://oauth.vk.com/authorize?client_id=7356046&display=page&scope=4&redirect_uri=http://localhost:3000/signin/vk&scope=photos&response_type=code&v=5.52`
  urlb = "https://accounts.google.com/o/oauth2/auth?redirect_uri=http://localhost:3000/signin/goo/&response_type=code&client_id=645970962185-vsd8i9vo1qlmlmjhc386p04onmmmvm5v.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile"
  subme = (e) => {
    e.preventDefault()
    if (global.__canAjax == true){
    global.__canAjax = false
    setTimeout(()=>{global.__canAjax = true},500)
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
      if (r.data.out == "neok"){
        let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
        $('.message-cont').append('<div id='+id+'></div>')
        ReactDOM.render(<Message text1="Oops!" text2="Something went wrong. Try again!" color="danger" id={id}/>, $('#'+id)[0])
      }else if(r.data.out == "ok"){
        let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
        $('.message-cont').append('<div id='+id+'></div>')
        ReactDOM.render(<Message text1="Yeah!" text2="You are logined!" color="success" id={id}/>, $('#'+id)[0])
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
      width: '50px',
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
      global.__urla = `https://oauth.vk.com/access_token?client_id=7356046&client_secret=RkjosevOktcKtd6vRXNN&redirect_uri=http://localhost:3000/signin/vk&code=${global.__codevk}`
      if (global.__canAjax == true){
        global.__canAjax = false
        setTimeout(()=>{global.__canAjax = true},500)
      this.setState({redirect : 'ref'},()=>{
        const url = global.__urla
        $.ajax({
          method: 'POST',
          url: `/sigvk`,
          data:{url:global.__urla},
          success:r=>{
            myfunc(JSON.parse(r))
          }
          })
      })
    }
    }
    if (codeid!=-1 && (window.location.pathname=="/signin/goo/" || window.location.pathname=="/signin/goo")){
      global.__codegoo = window.location.href.slice(codeid+6,window.location.href.indexOf('&'))
      global.__urlgoo = `https://accounts.google.com/o/oauth2/token?code=${global.__codegoo}&client_id=645970962185-vsd8i9vo1qlmlmjhc386p04onmmmvm5v.apps.googleusercontent.com&client_secret=qHI-nVfKOJ2gerY0Lxa6zBfS&redirect_uri=http://localhost:3000/signin/goo/&grant_type=authorization_code`
      if (global.__canAjax == true){
        global.__canAjax = false
        setTimeout(()=>{global.__canAjax = true},500)
      this.setState({redirect : 'ref'},()=>{
        const url = global.__urlgoo
        $.ajax({
          method: 'POST',
          url: `/siggoo`,
          data:{url: url},
          success:r=>{
              myfunc2(JSON.parse(r))
          }
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
              if (r.data.out == "neok"){
                let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
                $('.message-cont').append('<div id='+id+'></div>')
                ReactDOM.render(<Message text1="Oops!" text2="Something went wrong. Try again!" color="danger" id={id}/>, $('#'+id)[0])
              }else if(r.data.out == "ok"){
                let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
                $('.message-cont').append('<div id='+id+'></div>')
                ReactDOM.render(<Message text1="Yeah!" text2="You are logined with VKontakte!" color="success" id={id}/>, $('#'+id)[0])
                this.setState({redirect : 'home'})
                global.__signed = r.data.signed
                global.__user = r.data.user
              }
            })
          }).catch((er)=>{
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1="Oops!" text2="Something went wrong. Try again!" color="danger" id={id}/>, $('#'+id)[0])
          })
        }
    const myfunc2 = (obj) => {
      if (obj.email === undefined){
        let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
          $('.message-cont').append('<div id='+id+'></div>')
          ReactDOM.render(<Message text1="ERROR!" text2="Something went wrong. Try again!" color="danger" id={id}/>, $('#'+id)[0])
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
        if (r.data.out == "neok"){
          let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
          $('.message-cont').append('<div id='+id+'></div>')
          ReactDOM.render(<Message text1="Oops!" text2="Something went wrong. Try again!" color="danger" id={id}/>, $('#'+id)[0])
        }else if(r.data.out == "ok"){
          let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
          $('.message-cont').append('<div id='+id+'></div>')
          ReactDOM.render(<Message text1="Yeah!" text2="You are logined with Google!" color="success" id={id}/>, $('#'+id)[0])
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
                  <p className="h4 text-center py-4">Sign in</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Your email"
                      icon="envelope"
                      group
                      required
                      type="email"
                      validate
                      onChange= { this.handleChange }
                      value= { this.state.value }
                      name="email"
                      error="wrong"
                      success="right"
                    />
                    <MDBInput
                      label="Your password"
                      icon="lock"
                      name="pass"
                      required
                      onChange= { this.handleChange }
                      value= { this.state.value }
                      group
                      type="password"
                      validate
                    />
                    <MDBInput
                      name="action"
                      value="login"
                      required
                      type="hidden"
                    />
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn style={{display:'block', margin:'auto'}}color="cyan" type="submit">
                      Login
                    </MDBBtn>
                    <hr style={{backgroundColor:'#eeffee',marginTop:'30px'}}/>
                  <span style={{padding:'10px',display:'inline-block',width:'auto',height:'auto',backgroundColor:'transparent',boxShadow:'unset',color: '#9e9e9e',fontSize: '16px'}} className='btn'>Or use social media:</span>
                    <a href={this.urla} style={vkStyleA}><img style={vkStyle}src="./assets/vk.svg" alt="vk"/></a>
                    <a href={this.urlb} style={vkStyleA}><img style={vkStyle}src="./assets/goo.svg" alt="google"/></a>
                  </div>
                </form>
                { this.checkRedirect() }
              </MDBCardBody>
            </MDBCard>
    )
  }
}

export default Signin;