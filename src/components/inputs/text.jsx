import React from "react";
import { MDBInput } from "mdbreact";

class Text extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            val : (this.props.default)?this.props.default:''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({val : e.target.value})
    }
    clear(){
        this.setState({val : ''})
    }
    render(){
        return (
            <MDBInput onChange={this.handleChange}value={this.state.val} type={(this.props.numb)?'number':'text'} required={this.props.required} name={this.props.name} label={this.props.nm} />
        )
    }
}

export default Text;