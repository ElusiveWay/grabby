import React, { Component } from 'react'
import './App.css'
import Signup from './components/signup'
import Signin from './components/signin'
import Mainbar from './components/mainbar'
import ItemCreator from './components/createitem'
import ImageUpload from './components/inputs/Imageupload'
import Modal from './components/modal'
import Message from './components/peref/message'
import 'bootstrap'
import Collections from './components/collections/collectionsBox'
import Footbar from './components/footbar'
import ItemPage from './components/itempage'
import CollectionPage from './components/collectionpage'
import io from 'socket.io-client'
import Task from './components/task'
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
global.__canAjax = true
global.__canAjaxSync = true
global.__canEmitSync = true
//sync
socket.on('getAllData',msg=>{
    global.__canEmitSync = true
    global.__mainData = msg
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
     this.int = setInterval(()=>{
      if (!global.__signed.length && !global.__key) global.__user = {}
      if (global.__canEmitSync == true){
        global.__canEmitSync = false
        socket.emit('getAllData')
      } 
      if(global.__canAjaxSync == true){ 
        global.__canAjaxSync = false
        $.ajax({
         method: 'POST',
         url: '/sync',
         success: r=>{
           global.__key = r.key
           global.__canAjaxSync = true
         },
         error : e=>global.__canAjaxSync = true
       })}
      },500)
 }
 componentWillUnmount(){
   clearInterval(this.int)
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
            <Route path="/profile">
              <div className="profile-page">
                <ItemCreator/>
              </div>
            </Route>
            <Route exact path="/" >
              <div className='mane-page'>
                  <Collections />
              </div>
            </Route>
            <Route exact path="/collect" >
                <Collections />
            </Route>
            <Route exact path="/admin" >
                <ImageUpload />
            </Route>
            <Route path="/items/:id" children={<ItemPage/>} />
            <Route path="/collections/:id" children={<CollectionPage/>} />
          </Switch>
        </Router>
        <Footbar></Footbar>
        <Modal action={global.__modalAction}title='Comment deleting' target="commentDeleterModal" text='Are you sure about this?'></Modal>
      </div>
    );
  }
}
export default App;
