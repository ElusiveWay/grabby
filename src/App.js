import React, { Component } from 'react'
import './App.css'
import Signup from './components/signup'
import Signin from './components/signin'
import Mainbar from './components/mainbar'
import CreateItemWrapper from './components/createitemwrapper'
import ItemCreator from './components/createitem'
import ImageUpload from './components/inputs/Imageupload'
import Modal from './components/modal'
import ModalOk from './components/modalok'
import TegCloud from './components/tegscloud'
import Message from './components/peref/message'
import TextField from './components/textField'
import {Redirect} from  'react-router-dom'
import 'bootstrap'
import AdminPage from './components/adminpage'
import Collections from './components/collections/collectionsBox'
import Footbar from './components/footbar'
import Carusel from './components/carusel'
import ItemPage from './components/itempage'
import UsersPages from './components/userpage'
import CollectionPage from './components/collectionpage'
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
global.__canAjax = true
global.__canAjaxSync = true
global.__canEmitSync = true


//
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: '',
      user:{},
      online2:false,
      modalok: <div>Loading...</div>
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    //sync
    socket.on('getAllData',msg=>{
      global.__canEmitSync = true
      global.__mainData = msg
      let user = msg.users.filter(v=>v._id === global.__user._id)
      if (user.length !== 0 ) this.setState({user : user[0]})
      this.setState({grabby : msg})
    })
    // 
    fetch('/api/home') 
     .then(response => response.json())
     .then(res => {
       global.__user = res.user
       this.setState({user : global.__user})    //tyt
       global.__signed = res.signed
       global.__key = res.key
     });
     this.int2 = setInterval(()=>{
      if (global.__modalok!==this.state.modalok){
        this.setState({modalok : global.__modalok},()=>global.document.querySelectorAll('.activeSearchList').forEach(v=>v.classList.remove('activeSearchList')))
      }
      if (this.state.online2==false) this.setState({online2 : (global.__mainData)?true:false})
     },10)
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
   clearInterval(this.int2)
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
              <div className='mane-page'>
                {this.state.online2===true &&  <h2 style={{textAlign:'center',marginTop:'45px'}}>There is nowhere to go if your favorite thing in life is to collect something. Besides Grabby!</h2>}
                <div style={{display:'flex',width:'100%'}}>
                {this.state.online2===true  &&  <div className="textField">
                      <TextField grabby={this.state.grabby}/>
                    </div>}
                  <div className="carusel">
                    <Carusel/>
                  </div>
                </div>
                  <TegCloud/>
                  <Collections />
              </div>
            </Route>
            <Route exact path="/admin" >
                <AdminPage grabby={this.state.grabby} user={this.state.user}/>
            </Route>
            <Route path="/items/:id" grabby={this.state.grabby} user={this.state.user} children={<ItemPage/>} />
            <Route path="/collections/:id" grabby={this.state.grabby} user={this.state.user} children={<CollectionPage/>} />
            <Route path="/users/:id/:sub" grabby={this.state.grabby} user={this.state.user} children={<CreateItemWrapper/>} />
            <Route exact path="/users/:id" grabby={this.state.grabby} user={this.state.user} children={<UsersPages/>} />
            <Route exact path="/profile" >
              <UsersPages grabby={this.state.grabby} user={this.state.user} id={global.__user._id} />
            </Route>
          </Switch>
        <ModalOk title='Info' target="collPageModal" text={this.state.modalok}></ModalOk>
        </Router>
        <Footbar></Footbar>
        <Modal action={global.__modalAction}title='Comment deleting' target="commentDeleterModal" text='Are you sure about this?'></Modal>
      </div>
    );
  }
}
export default App;
