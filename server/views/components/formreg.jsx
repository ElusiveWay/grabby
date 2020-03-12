import React from "react";
import {Form, Button } from 'react-bootstrap'

const FormReg = () => {
  return (
      <div className="form-container">
<Form  method="post">
  <input type="hidden" name="action" value="signin"/>
  <Form.Group controlId="formBasicName">
    <Form.Label>Your name</Form.Label> 
    <Form.Control pattern="[A-Za-z ]{1,20}" name="name" required type="text" placeholder="Enter name" />
    <Form.Text className="text-muted">
      Put your name, we want to know, who you are.
    </Form.Text>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control name="email" title="Invalid email address, example 'three@one.two'" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control name="pass" pattern="[A-Za-z0-9_]{3,10}$" title="Invalid password, must contain english letters or numbers or '_', from 3 to 10" required type="password" placeholder="Password" />
  </Form.Group>
  <Button  type="submit">
    Submit
  </Button>
</Form>
</div>
  );
};

export default FormReg;