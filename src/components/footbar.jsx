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
state = {
  isOpen: false
};
render() {
  return (  
      <MDBNavbar  style={{zIndex: '-1',position:'absolute',width:'100%',top:'100%',backgroundColor: 'rgba(9, 56, 117, 0.65)'}}color="" dark expand="md">
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>.      
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav >
          </MDBNavbarNav>
          <MDBNavbarBrand >
          <strong className="white-text">by Uladzislau Kaminski</strong>
        </MDBNavbarBrand>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Footbar