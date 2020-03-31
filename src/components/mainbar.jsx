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
      ReactDOM.render(<Message text1="Wow!" text2="You are already loged out!" color="danger" id={id}/>, $('#'+id)[0])
      window.location.reload()
    }else if(r.data.out == "ok"){
      global.__user = {}
      let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
      $('.message-cont').append('<div id='+id+'></div>')
      ReactDOM.render(<Message text1="Byu Buy!" text2="See you!" color="success" id={id}/>, $('#'+id)[0])
      this.setState({redirect : 'home'})
    }
  })
}
ShowProfile = () =>{
  if (this.state.user.isAdmin !== undefined){
    return (
      <MDBNavItem>  
        <MDBNavLink style={(this.state.user.id)} to="/profile">Profile</MDBNavLink>          
      </MDBNavItem> 
        ) 
  }
}
ShowLogout = () =>{
  if (this.state.user.isAdmin !== undefined){
    return (
      <MDBNavItem style={{marginLeft:'30px'}}>
      <MDBBtn style={{padding: '8px',margin:'0',lineHeight: '1.5',color:'white',boxShadow:'unset',width:'auto',height:'100%'}}color="transparent" onClick={this.Logout}><strong>Log out</strong></MDBBtn>  
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
      <h3>Items as searching result:</h3>
      <ul>
      {itemsArr.map(v=>{
        return <Link to={`/items/${v._id}`}><li onClick={()=>$('#searchModal').modal('hide')}>{v.name}</li></Link>
      })}
      {itemsArr.length==0 && <li>There are no matches: {this.state.search}</li>}
      </ul>
      { collItemsArr.length!==0 && <h3>Items from collections search matching:</h3> }
        <ul> 
        {collItemsArr.map(v=>{
          return <Link to={`/items/${v._id}`}><li>{v.name}</li></Link>
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
      <MDBNavLink exact to="/signin">Sign</MDBNavLink>          
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
      <MDBNavbar  style={{width:'100%',top:'0',zIndex:'10000',position:'fixed',backgroundColor: 'rgba(9, 56, 117, 0.54)'}}color="" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Grabby</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
            </MDBNavItem>
            <MDBNavLink to="/">Main</MDBNavLink>  
            {/* <MDBNavItem>
            <MDBNavLink to="/collect">Collections</MDBNavLink>  
            </MDBNavItem> */}
           { this.ShowProfile() }
           { this.ShowSignin() }
            <MDBNavItem>   
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
          {this.state.user.isAdmin &&
          <MDBNavItem style={{marginRight:'30px'}}>  
            <MDBNavLink to="/admin"><strong>Admin panel</strong></MDBNavLink>          
          </MDBNavItem>}
            <MDBNavItem>
              <MDBFormInline>
                <div className="md-form my-0">
                  <input onKeyPress={e=>{if(e.key=='Enter'){e.preventDefault()}}}onChange={this.onch.bind(this)} value={this.state.search} style={{boxShadow:'0 0 transparent',borderColor:'transparent',float:'right'}}className="searchinp form-control mr-sm-2" type="text" placeholder="    Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
            { this.ShowLogout() }
          </MDBNavbarNav>
        </MDBCollapse>
        <ModalOk title='Search'  target="searchModal" text={<div><div style={{display:'flex'}}><input style={{flex:'1'}} id="searcherid" onChange={this.onch.bind(this)} value={this.state.search}type="text"></input><i style={{cursor: 'pointer',fontSize:'32px',padding:'5px 10px 5px 20px'}} onClick={()=>{this.setState({search: ''});global.document.getElementById('searcherid').focus()}} className="fas fa-eraser"></i></div>{this.state.modalok}</div>}></ModalOk>
      </MDBNavbar>
    );
  }
}

export default Mainbar