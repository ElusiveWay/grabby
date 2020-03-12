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
class Mainbar extends Component {
state = {
  isOpen: false,
  signed: [],
  cookKey: '',
  signed: '',
  user: {}
};

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
    }else if(r.data.out == "ok"){
      global.__user = {}
      let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
      $('.message-cont').append('<div id='+id+'></div>')
      ReactDOM.render(<Message text1="Byu Buy!" text2="See you!" color="success" id={id}/>, $('#'+id)[0])
      this.setState({redirect : 'home'})
    }
  })
}
render() {
  return (
      <MDBNavbar  color="blue" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Grabby</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
            </MDBNavItem>
            <MDBNavLink to="/">Main</MDBNavLink>  
            <MDBNavItem>
            <MDBNavLink to="/collect">Collections</MDBNavLink>  
            </MDBNavItem>
            <MDBNavItem>  
            <MDBNavLink to="/user">Profile</MDBNavLink>          
            </MDBNavItem>
            <MDBNavItem>  
            <MDBNavLink to="/signin">Sign</MDBNavLink>          
            </MDBNavItem>
            <MDBNavItem>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem style={{marginRight:'30px'}}>  
            <MDBNavLink to="/admin"><strong>Admin panel</strong></MDBNavLink>          
            </MDBNavItem>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input style={{float:'right'}}className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
            <MDBNavItem style={{marginLeft:'30px'}}>
            <MDBBtn style={{padding: '8px',margin:'0',lineHeight: '1.5',color:'white',boxShadow:'unset',width:'auto',height:'100%'}}color="transparent" onClick={this.Logout}><strong>Log out</strong></MDBBtn>  
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Mainbar