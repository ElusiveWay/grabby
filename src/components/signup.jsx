import React, {Component} from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router,
  Redirect } from "react-router-dom";
import Message from './peref/message'
import * as $ from 'jquery'
import LANG from '../lang'

class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      pass: '',
      name: '',
      redirect: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.subme = this.subme.bind(this);
  }
  checkRedirect(){
    if (this.state.redirect == 'home'){
      return (<Redirect to='/' />)
    }
  }
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
        name: this.state.name,
        action: e.target.action.value
      }
    }).then(r=>{
      console.log(r.data)
      if (r.data.out == "neok"){
        let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
        $('.message-cont').append('<div id='+id+'></div>')
        ReactDOM.render(<Message text1={LANG.oops[localStorage.getItem('lang')]} text2={LANG.somewrong[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
      }else if(r.data.out == "ok"){
        let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
        $('.message-cont').append('<div id='+id+'></div>')
        ReactDOM.render(<Message text1={LANG.yeah[localStorage.getItem('lang')]} text2={LANG.urmember[localStorage.getItem('lang')]} color="success" id={id}/>, $('#'+id)[0])
        this.setState({redirect : 'home'})
        global.__signed = r.data.signed
        global.__user = r.data.user
      }
    })
    }
 }

  

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value},e=>e)
  }
  render(){
    return (

            <MDBCard style={{margin:'20px', width : '400px', height : 'auto', minHeigth : "300px"}}>
              <MDBCardBody>
              <form style={{color:'#2196f3'}} onSubmit={ this.subme }>
                  <p className="h4 text-center py-4">{LANG.signup[localStorage.getItem('lang')]}</p>
                  <div className="grey-text">
                    <MDBInput
                      label={LANG.uname[localStorage.getItem('lang')]}
                      icon="user"
                      group
                      type="text"
                      validate
                      required
                      onChange= { this.handleChange }
                      value= { this.state.value }
                      name="name"
                      error="wrong"
                      success="right"
                    />
                    <MDBInput
                      label={LANG.uemail[localStorage.getItem('lang')]}
                      icon="envelope"
                      group
                      type="email"
                      validate
                      required
                      onChange= { this.handleChange }
                      value= { this.state.value }
                      name="email"
                      error="wrong"
                      success="right"
                    />
                    <MDBInput
                      label={LANG.upass[localStorage.getItem('lang')]}
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
                      value="signup"
                      type="hidden"
                    />
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="cyan" type="submit">
                    {LANG.signup[localStorage.getItem('lang')]}
                    </MDBBtn>
                  </div>
                  {this.checkRedirect()}
                </form>
              </MDBCardBody>
            </MDBCard>
    )
  }
}
export default Signup