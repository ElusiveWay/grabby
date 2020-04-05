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
import makeMessage from './components/peref/mess'
import TextField from './components/textField'
import {Redirect} from  'react-router-dom'
import 'bootstrap'
import axios from 'axios'
import AdminPage from './components/adminpage'
import Collections from './components/collections/collectionsBox'
import Footbar from './components/footbar'
import Carusel from './components/carusel'
import ItemPage from './components/itempage'
import UsersPages from './components/userpage'
import CollectionPage from './components/collectionpage'
import io from 'socket.io-client' 
import * as $ from 'jquery'
import LANG from './lang'
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
      modalok: <div>{LANG.loading[localStorage.getItem('lang')]}</div>
    };
    this.defaultLang = "en"
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    this.int3 = setInterval(()=>{
        if (localStorage.getItem('dark') === null || localStorage.getItem('dark') === 'light'){
          if (Array.prototype.some.call(global.document.querySelector('html').classList,v=>v=='darkMode'))global.document.querySelector('html').classList.remove('darkMode')
        }
        else{
          if (Array.prototype.every.call(global.document.querySelector('html').classList,v=>v!=='darkMode'))global.document.querySelector('html').classList.add('darkMode')
        }
        if (localStorage.getItem('lang') === null){
            localStorage.setItem('lang', this.defaultLang)
        }

    },20)
  }
  componentDidMount() {
    //sync
    socket.on('getAllData',msg=>{
      global.__canEmitSync = true
      global.__mainData = msg
      let user = msg.users.filter(v=>v._id === global.__user._id)
      if (user.length !== 0 && this.state.user && JSON.stringify(user[0])!==JSON.stringify(this.state.user) && typeof user[0].theme === 'string' && localStorage.getItem('dark')!==user[0].theme){
          localStorage.setItem('dark',user[0].theme)
      }
      if (user.length !== 0 && this.state.user && JSON.stringify(user[0])!==JSON.stringify(this.state.user) && typeof user[0].lang === 'string' && localStorage.getItem('lang')!==user[0].lang){
          localStorage.setItem('lang',user[0].lang)
      }
      if (user.length !== 0 ) this.setState({user : user[0]})
      if (Object.keys(global.__user).length===0) this.setState({user : {}})
      this.setState({grabby : msg})
    })
    // 
    fetch('/api/home') 
     .then(response => response.json())
     .then(res => {
       global.__user = res.user
       this.setState({user : res.user})    //tyt
       global.__signed = res.signed
       global.__key = res.key
     });
     this.int2 = setInterval(()=>{
      if (this.state.user && typeof this.state.user.isBlocked !== 'undefined' && this.state.user.isBlocked == true) {
          axios({
            method: 'POST',
            url: '/signin',
            data: {
              email: this.state.user.email,
              action: 'logout'
            }
          }).then(r=>{
            if (r.data.out == "neok"){
              makeMessage("danger", LANG.bye[this.props.lang], LANG.blocked[this.props.lang])
              window.location.reload()
            }else if(r.data.out == "ok"){
              global.__user = {}
              this.setState({user : {}})
              makeMessage("danger", LANG.bye[this.props.lang], LANG.blocked[this.props.lang])
            }
          })
      }
      if (this.state.user && typeof this.state.user.theme === 'string') {
        if (localStorage.getItem('dark') === null) localStorage.setItem('dark',this.state.user.theme)
      }
      if (this.state.user && typeof this.state.user.lang === 'string') {
        if (localStorage.getItem('lang') === null) localStorage.setItem('lang',this.state.user.lang)
      }
      if (global.__modalok!==this.state.modalok){
        this.setState({modalok : global.__modalok},()=>global.document.querySelectorAll('.activeSearchList').forEach(v=>v.classList.remove('activeSearchList')))
      }
      if (this.state.online2==false) this.setState({online2 : (global.__mainData)?true:false})
      if (this.state.grabby && this.state.user && Object.keys(this.state.user).length!==0 &&!this.state.grabby.signed.some(v=>v==this.state.user._id)) this.setState({user : {}})
     },10)
     this.int = setInterval(()=>{
      if (global.__canEmitSync == true){
        global.__canEmitSync = false
        socket.emit('getAllData')
      } 
      },500)
 }
 componentWillUnmount(){
   clearInterval(this.int)
   clearInterval(this.int2)
   clearInterval(this.int3)
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
        <div className="wrapperDiv"/>
        <Router>
            <Mainbar lang={localStorage.getItem('lang')} grabby={this.state.grabby} user={this.state.user}></Mainbar>
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
                {this.state.online2===true  && <div style={{position:'relative'}}>
                    <div className="advancedFields">
                      <div className="textField">
                          <TextField lang={localStorage.getItem('lang')} grabby={this.state.grabby}/>
                        </div>
                      <div className="carusel">
                        <Carusel lang={localStorage.getItem('lang')} />
                      </div>
                    </div>
                </div>
                }
                  <TegCloud/>
                  <Collections />
              </div>
            </Route>
            <Route exact path="/admin" >
                <AdminPage grabby={this.state.grabby} user={this.state.user}/>
            </Route>
            <Route path="/items/:id" children={<ItemPage grabby={this.state.grabby} user={this.state.user}/>} />
            <Route path="/collections/:id"  children={<CollectionPage grabby={this.state.grabby} user={this.state.user}/>} />
            <Route path="/users/:id/:sub"  children={<CreateItemWrapper grabby={this.state.grabby} user={this.state.user} />} />
            <Route exact path="/users/:id" children={<UsersPages grabby={this.state.grabby} user={this.state.user}/>} />
            <Route exact path="/profile" >
              <UsersPages grabby={this.state.grabby} user={this.state.user} id={this.state.user._id} />
            </Route>
          </Switch>
        <ModalOk title='Info' target="collPageModal" text={this.state.modalok}></ModalOk>
        </Router>
        <Footbar user={this.state.user}></Footbar>
        <Modal action={global.__modalAction} title={LANG.delComments[localStorage.getItem('lang')]} target="commentDeleterModal" text={LANG.sure[localStorage.getItem('lang')]}></Modal>
      </div>
    );
  }
}
export default App;