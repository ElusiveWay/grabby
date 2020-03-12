import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import MSwitch from './main-switch' 
import { Link } from 'react-router-dom'

class Mainbar extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
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
            <MDBNavLink to="/signin">Sign</MDBNavLink>          
            </MDBNavItem>
            <MDBNavItem>  
            <MDBNavLink to="/user">Profile</MDBNavLink>          
            </MDBNavItem>
            <MDBNavItem>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>  
            <MDBNavLink to="/admin"><strong>Admin panel</strong></MDBNavLink>          
            </MDBNavItem>
            <MDBNavItem style={{marginRight:'30px'}}>
            <MDBNavLink to="/logout"><strong>Log out</strong></MDBNavLink>  
            </MDBNavItem>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input style={{float:'right'}}className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Mainbar