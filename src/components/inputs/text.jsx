import React from "react";
import { MDBInput } from "mdbreact";

class Text extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <MDBInput type={(this.props.numb)?'number':'text'} required={this.props.required} name={this.props.name} label={this.props.nm} />
        )
    }
}

export default Text;