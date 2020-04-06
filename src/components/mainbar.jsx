import React, { Component } from "react";
import ReactDOM from 'react-dom'
import axios from 'axios';
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBBtn , MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import MSwitch from './main-switch' 
import { Link, Redirect } from 'react-router-dom'
import Message from './peref/message'
import ModalOk from './modalok'
import * as $ from 'jquery'
import LANG from '../lang'
class Mainbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      signed: global.__signed,
      cookKey: global.__key,
      user: this.props.user,
      search : '',
      modalok: '',
      canSearch: true
    }
  }


toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}
Logout = () => {
  axios({
    method: 'POST',
    url: '/signin',
    data: {
      email: this.state.email,
      pass: this.state.pass,
      action: 'logout'
    }
  }).then(r=>{
    console.log(r.data)
    if (r.data.out == "neok"){
      let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
      $('.message-cont').append('<div id='+id+'></div>')
      ReactDOM.render(<Message text1={LANG.nice[this.props.lang]} text2={LANG.alrLogout[this.props.lang]} color="danger" id={id}/>, $('#'+id)[0])
      window.location.reload()
    }else if(r.data.out == "ok"){
      global.__user = {}
      let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
      $('.message-cont').append('<div id='+id+'></div>')
      ReactDOM.render(<Message text1={LANG.bye[this.props.lang]} text2={LANG.seeyou[this.props.lang]} color="success" id={id}/>, $('#'+id)[0])
      this.setState({redirect : 'home'})
    }
  })
}
ShowProfile = () =>{
  if (this.state.user.isAdmin !== undefined){
    return (
      <MDBNavItem>  
      <div onClick={()=>{if(global.document.body.offsetWidth<768)global.document.getElementsByClassName('navbar-toggler')[0].click()}}>
        <Link className="linkerNav" style={(this.state.user.id)} to="/profile">{LANG.profile[this.props.lang]}</Link>    
        </div>      
      </MDBNavItem> 
        ) 
  }
}
ShowLogout = () =>{
  if (this.state.user.isAdmin !== undefined){
    return (
      <MDBNavItem style={{margin:'auto 0'}}>
        <div onClick={()=>{if(global.document.body.offsetWidth<768)global.document.getElementsByClassName('navbar-toggler')[0].click()}}>
          <Link className="linkerNav" color="transparent" onClick={this.Logout}><strong>{LANG.logout[this.props.lang]}</strong></Link>  
        </div>
      </MDBNavItem>
        ) 
  }
}
onch = (e) =>{
  if (this.state.canSearch !== true) return;
  this.setState({search : e.target.value},()=>{
    let itemsArr = [] 
    if (this.state.search.length<1) return
    if (!global.__mainData) return
    global.__mainData.items.map(v=>{
      if (RegExp(this.state.search,'gi').test(v.name)) {itemsArr.push(v); return}
      if (RegExp(this.state.search,'gi').test(v.description)) {itemsArr.push(v); return}
      if (RegExp(this.state.search,'gi').test(v.tags)) {itemsArr.push(v); return}
      JSON.parse(v.add).map(q=>q).filter(q=>(q.type!=='checkbox')).map(q=>{
          if (RegExp(this.state.search,'gi').test(q.value)) {if(itemsArr.every(r=>r._id!==v._id))itemsArr.push(v); return}
      })
      if (v.comments !== undefined){JSON.parse(v.comments).map(q=>{
          if (RegExp(this.state.search,'gi').test(q.tex)) {if(itemsArr.every(r=>r._id!==v._id))itemsArr.push(v); return}
          if (RegExp(this.state.search,'gi').test(q.titl)) {if(itemsArr.every(r=>r._id!==v._id))itemsArr.push(v); return}
      })}
    })
    // from collections
    let collItemsArr = []
    global.__mainData.collections.map(v=>{
      if (RegExp(this.state.search,'gi').test(v.name)) {global.__mainData.items.map(q=>q).filter(q=>q.collect==v.name).forEach(q=>collItemsArr.push(q)); return}
      if (RegExp(this.state.search,'gi').test(v.descript))  {global.__mainData.items.map(q=>q).filter(q=>q.collect==v.name).forEach(q=>collItemsArr.push(q)); return}
      if (RegExp(this.state.search,'gi').test(v.comment))  {global.__mainData.items.map(q=>q).filter(q=>q.collect==v.name).forEach(q=>collItemsArr.push(q)); return}
      if (RegExp(this.state.search,'gi').test(v.type)) {global.__mainData.items.map(q=>q).filter(q=>q.collect==v.name).forEach(q=>collItemsArr.push(q)); return}
      JSON.parse(v.adds).map(q=>{
        if (RegExp(this.state.search,'gi').test(q[Object.keys(q)[0]])) {if(collItemsArr.every(r=>r._id!==v._id)){global.__mainData.items.map(q=>q).filter(q=>q.collect==v.name).forEach(q=>collItemsArr.push(q))}; return}
      })
    })
    //from users
    this.setState({modalok : <div>
      <br/>
      <h3>{LANG.searchRes[this.props.lang]}</h3>
      <ul>
      {itemsArr.map(v=>{
        return <Link to={`/items/${v._id}`}><li onClick={()=>$('#searchModal').modal('hide')}>{v.name}</li></Link>
      })}
      {itemsArr.length==0 && <li>{LANG.noMatches[this.props.lang]} {this.state.search}</li>}
      </ul>
      { collItemsArr.length!==0 && <h3>{LANG.collSearch[this.props.lang]}</h3> }
        <ul> 
        {collItemsArr.map(v=>{
          return <Link to={`/items/${v._id}`}><li onClick={()=>$('#searchModal').modal('hide')}>{v.name}</li></Link>
        })}
       </ul>
    </div>})
    
    $('#searchModal').modal('show')
    this.setState({canSearch : true})
  })
}
ShowSignin = () =>{
  if (this.state.user.isAdmin === undefined){
    return (
      <MDBNavItem>
      <div onClick={()=>{if(global.document.body.offsetWidth<768)global.document.getElementsByClassName('navbar-toggler')[0].click()}}>
        <Link className="linkerNav" exact to="/signin">{LANG.sign[this.props.lang]}</Link>       
      </div>   
      </MDBNavItem>
        ) 
  }
}
componentDidMount(){
  $('#searchModal').on('show.bs.modal', ()=>{
    global.document.getElementById('searcherid').focus()
  })
  $('#searchModal').on('shown.bs.modal	', ()=>{
    global.document.getElementById('searcherid').focus()
  })
  this.timout = setInterval(()=>{
    this.setState({signed : global.__signed, cookKey : global.__key, user : this.props.user})
  },100)
}
componentWillUnmount(){
  clearInterval(this.timout)
}
render() {
  return (
      <MDBNavbar  id="mainGrabbyNavbar"style={{width:'100%',top:'0',zIndex:'10000',position:'fixed',backgroundColor: 'rgba(9, 56, 117, 0.65)'}}color="" dark expand="md">
        <style dangerouslySetInnerHTML={{__html:`
        .linkerNav{
          padding:6px;
          color:white;
          display:block;
        }
        .linkerNav:hover{
          color:lightgreen;
        }
        `}}
        ></style>
        <MDBNavbarBrand>
          <Link to="/"><strong className="white-text">Grabby</strong></Link>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
          <div onClick={()=>{if(global.document.body.offsetWidth<768)global.document.getElementsByClassName('navbar-toggler')[0].click()}}>
            <Link className="linkerNav" to="/">{LANG.main[this.props.lang]}</Link>
          </div> 
           { this.ShowProfile() }
           { this.ShowSignin() }
          </MDBNavbarNav>
          <MDBNavbarNav right>
          {this.state.user.isAdmin &&
          <MDBNavItem style={{margin:'auto 0'}}>  
          <div onClick={()=>{if(global.document.body.offsetWidth<768)global.document.getElementsByClassName('navbar-toggler')[0].click()}}>
              <Link className="linkerNav" to="/admin"><strong>{LANG.adminPanel[this.props.lang]}</strong></Link>    
            </div>      
          </MDBNavItem>}
            <MDBNavItem>
              <MDBFormInline>
                <div className="md-form my-0">
                  <input onKeyPress={e=>{if(e.key=='Enter'){e.preventDefault()}}}onChange={this.onch.bind(this)} value={this.state.search} style={{boxShadow:'0 0 transparent',borderColor:'transparent',float:'right'}}className="searchinp form-control mr-sm-2" type="text" placeholder={`    ${LANG.search[this.props.lang]}`} aria-label={LANG.search[this.props.lang]} />
                </div>
              </MDBFormInline>
            </MDBNavItem>
            { this.ShowLogout() }
          </MDBNavbarNav>
        </MDBCollapse>
        <ModalOk title={LANG.search[this.props.lang]}  target="searchModal" text={<div><div style={{display:'flex'}}><input style={{flex:'1'}} id="searcherid" onChange={this.onch.bind(this)} value={this.state.search}type="text"></input><i style={{cursor: 'pointer',fontSize:'32px',padding:'5px 10px 5px 20px'}} onClick={()=>{this.setState({search: ''});global.document.getElementById('searcherid').focus()}} className="fas fa-eraser"></i></div>{this.state.modalok}</div>}></ModalOk>
      </MDBNavbar>
    );
  }
}

export default Mainbar