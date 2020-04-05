import React, { Component } from "react";
import ReactDOM from 'react-dom'
import axios from 'axios';
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBBtn , MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import MSwitch from './main-switch' 
import { Link } from 'react-router-dom'
import Message from './peref/message'
import * as $ from 'jquery'

class Footbar extends Component {
constructor(props){
  super(props)
  this.changeTheme = this.changeTheme.bind(this)
  this.changeLanguage = this.changeLanguage.bind(this)
}
state = {
  isOpen: false
};
changeLanguage(){
  localStorage.setItem('lang',(localStorage.getItem('lang')==='ru')?'en':'ru')
  if (this.props.user && Object.keys(this.props.user).length!==0) axios({
    method:'post',
    url: '/changeLang',
    data: {
      user: this.props.user._id,
      lang: localStorage.getItem('lang')
    }
  }).then(r=>console.log(r))
}
changeTheme(){
  localStorage.setItem('dark',(localStorage.getItem('dark')==='dark')?'light':'dark')
  if (this.props.user && Object.keys(this.props.user).length!==0) axios({
    method:'post',
    url: '/changeColor',
    data: {
      user: this.props.user._id,
      theme: localStorage.getItem('dark')
    }
  })
}
render() {
  return (  
      <MDBNavbar className="footWrap" style={{zIndex: '-1',position:'absolute',width:'100%',top:'100%',backgroundColor: 'rgba(9, 56, 117, 0.65)'}}color="" dark expand="md">
        <style dangerouslySetInnerHTML={{__html:`
        .changeThemeBtn{
          font-size:1.5em;
          cursor:pointer;
          color: white;
        }
        .footWrap .navbar-toggler{
          display:none;
        }
        `}}></style>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBNavbarNav style={{display: 'flex',flexDirection: 'row'}} left>
              <i  onClick={this.changeTheme} className="changeThemeBtn fas fa-adjust"></i> 
              <button  onClick={this.changeLanguage} className="langBtn">RU/EN</button> 
          </MDBNavbarNav>
      </MDBNavbar>
    );
  }
}

export default Footbar