import React from 'react'
import ReactDOM from 'react-dom'
import { MDBInput } from 'mdbreact';
import * as $ from 'jquery'

class TextareaPage2 extends React.Component {
    constructor(props){
        super(props)
    }
componentDidMount(){
    ReactDOM.findDOMNode(this).style.display = 'inline-block'
    ReactDOM.findDOMNode(this).style.width = 'calc(50% - 20px)'
    ReactDOM.findDOMNode(this).style.margin = '20px 10px'
}
render(){
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon">
                {this.props.nm}
                <i className="fas fa-pencil-alt prefix"></i>
                </span>
            </div>
            <textarea name={this.props.name} required={this.props.required} style={this.props.style} className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
        </div>
    )
}
}

export default TextareaPage2

