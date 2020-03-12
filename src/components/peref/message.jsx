import React, { Component } from 'react'
import { MDBContainer, MDBAlert } from 'mdbreact';
import ReactDOM from 'react-dom'
import * as $ from 'jquery'
  class Message extends Component {
    constructor(props){
        super(props)
        this.defStyle = {
            position: 'fixed',
            padding: '10px',
            left: '50%',
            top: '30%',
            transform: 'translate(-50%,-50%) scale(1.5)',
            width: 'auto',
            textAlign: 'center'
        }
        this.id = props.id || 0
        this.bg = props.bg || 'red'
        this.color = props.color || 'primary'
        this.text1 = props.text1 || 'Oops!'
        this.text2 = props.text2 || ' Something went wrong. Try again!'
    }
    componentDidMount(){
        $(['#'+this.id][0]).delay( 2000 ).css({display:'inline-block'}).animate({'opacity' : 'toggle'},1000, function(){
            ReactDOM.unmountComponentAtNode(document.getElementById([this.id+''][0]))
            $(['#'+this.id+''][0]).delay(1000).remove()
        })
    } 
    render() {
      return (
        <MDBContainer style={this.defStyle} >
            <MDBAlert color={this.color}>
            <strong>{this.text1}</strong> {this.text2}
            </MDBAlert>
        </MDBContainer>
    )
}
}

export default Message