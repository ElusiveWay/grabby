import React, { Component } from 'react'
import Signup from './signup'
import Signin from './signin'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


  class MSwitch extends Component {
    render() {
      return (
            <Switch>
            <Route path="/signin">
              <div className="sign-page">
                <Signup/>
                <Signin/>
              </div>
            </Route>
            <Route exact path="/" >
              <div className='mane-page'>
              </div>
            </Route>
          </Switch>
    )
}
}

export default MSwitch