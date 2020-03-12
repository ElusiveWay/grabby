import React, {Component} from "react";
import ReactDOM, {render} from 'react-dom';
import {Form, Button, Navbar, Nav ,NavDropdown,FormControl, DropdownButton, MenuItem} from 'react-bootstrap'



const Collections = () => {
  return (
      <div className="navbar-container">
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
</div>
  );
};

export default Collections;