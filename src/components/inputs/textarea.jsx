import React from 'react'
import ReactDOM from 'react-dom'
import { MDBInput } from 'mdbreact';
import * as $ from 'jquery'

class TextareaPage extends React.Component {
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
        <MDBInput style={this.props.style} className="inlineTextarea" type="textarea" label={this.props.nm} rows="5" />
    )
}
}

export default TextareaPage;