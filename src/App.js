import React, { Component } from 'react'
import './App.css'
import Signup from './components/signup'
import Signin from './components/signin'
import Mainbar from './components/mainbar'
import Message from './components/peref/message'
import io from 'socket.io-client'
import * as $ from 'jquery'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const socket = io();

global.__signed = []
global.__user = {}
global.__key = ''

//sync
setInterval(()=>{
  if (!global.__signed.length && !global.__key) global.__user = {}
   socket.emit('sync',{cookies : global.__key, user : global.__user}) 
   $.ajax({
     method: 'POST',
     url: '/sync',
     success: r=>{
       global.__key = r.key
     }
   })
  },2000)
socket.on('sync',msg=>{
    global.__signed = msg.sess
    if (msg.user!==undefined) global.__user = msg.user
    // console.log(global.__signed)
    // console.log(global.__user)
    // console.log(global.__key)  
  })
// 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch('/api/home') 
     .then(response => response.json())
     .then(res => {
       global.__user = res.user
       global.__signed = res.signed
       global.__key = res.key
     });
 }
  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="App">
        <Router>
            <Mainbar></Mainbar>
            <div className="message-cont"></div>
            <Switch>
            <Route path="/signin">
              <div className="sign-page">
                <Signup/>
                <Signin/>
              </div>
            </Route>
            <Route exact path="/" >
              <div className='mane-page'></div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
