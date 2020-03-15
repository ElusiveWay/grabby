import React from "react";
import { MDBInput } from "mdbreact";

class Text extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <MDBInput label={this.props.nm} />
        )
    }
}

export default Text;