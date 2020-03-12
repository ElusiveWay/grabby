import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios';
import { BrowserRouter as Router,
  Redirect } from "react-router-dom";
import Message from './peref/message'
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
  getVK = async (e) => {
    await $.ajax({
      method: 'GET',
      url: 'https://api.vk.com/method/photos.get?album_id=profile&access_token=796fd002587e4524f2d82be2503605dc9e3972916b4fda6384e4c04a00ab243eec6af184c148e3d3e9165&v=5.52',
      dataType: 'JSONP',
      success: r=>{
         this.setState({vkUrl : r.response.items[r.response.items.length-1].photo_604})
    }
    })
    await $.ajax({
      method: 'GET',
      url: 'https://api.vk.com/method/users.get?access_token=796fd002587e4524f2d82be2503605dc9e3972916b4fda6384e4c04a00ab243eec6af184c148e3d3e9165&v=5.52',
      dataType: 'JSONP',
      success: r=>{
        this.setState({vkProf : r.response[0]})
    }
    })
    console.log(this.state.vkProf)
    console.log(this.state.vkUrl)
    axios({
      method: 'POST',
      url: '/signvk',
      data: {
        email: this.state.vkProf.id,
        id: this.state.vkProf.id,
        pass: this.state.vkProf.id,
        name: `${this.state.vkProf.first_name} ${this.state.vkProf.last_name}`
      }
    }).then(r=>console.log(r))
  }
  subme = (e) => {
    e.preventDefault()
    console.log('a')
    axios({
      method: 'POST',
      url: '/signin',
      data: {
        email: this.state.email,
        pass: this.state.pass,
        action: e.target.action.value
      }
    }).then(r=>{
      console.log(r.data)
      if (r.data == "neok"){
        let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
        $('.message-cont').append('<div id='+id+'></div>')
        ReactDOM.render(<Message text1="Oops!" text2="Something went wrong. Try again!" color="danger" id={id}/>, $('#'+id)[0])
      }else if(r.data.out == "ok"){
        let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
        $('.message-cont').append('<div id='+id+'></div>')
        ReactDOM.render(<Message text1="Yahooo!" text2="You are logined!" color="success" id={id}/>, $('#'+id)[0])
        this.setState({redirect : 'home'})
      }
    })
 }
  checkRedirect(){
    if (this.state.redirect == 'home'){
      return (<Redirect to='/' />)
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value},()=>console.log(this.state.email+'AND'+this.state.pass))
  }
  render(){
    const vkStyle = {
      display: 'inline-block',
      width: '50px',
    }
    const vkStyleA = {
      display: 'block',
      textAlign: 'center',
      marginBottom: '25px'
    }
    return (
            <MDBCard style={{margin:'75px',width : '400px', height : '500px', minHeigth : "300px"}}>
              <MDBCardBody>
                <form onSubmit={ this.subme }>
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
                    <a onClick={this.getVK} style={vkStyleA}><img style={vkStyle}src="./assets/vk.svg" alt="vk"/></a>
                    <MDBBtn color="cyan" type="submit">
                      Login
                    </MDBBtn>
                  </div>
                </form>
                { this.checkRedirect() }
              </MDBCardBody>
            </MDBCard>
    )
  }
}

export default Signin;