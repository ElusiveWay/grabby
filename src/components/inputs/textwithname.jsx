import React from "react";
import ReactDOM from 'react-dom'
import { MDBContainer, MDBInputGroup, MDBDropdown, MDBDropdownToggle, MDBIcon, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import * as $ from 'jquery'

class AdditionalElem extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.state
    }

delete(e){
    $(ReactDOM.findDOMNode(this)).remove()
}
componentDidMount(){
    this.state = this.props.state
}
findValue(aidi){
    console.log(aidi)
    return this.state[this.props.name].reduce((t,c,i,a)=>{
        if (c.id==aidi) {
            t=c.value
            console.log(t)
        }
    },'')
}
render() {
    return (    
                <div style={this.props.style} className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button className="btn btn-primary btn-md m-0 px-3 py-2 z-depth-0 dropdown-toggle" type="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.name}</button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" onClick={(e)=>this.delete(e)}>Delete</a>
                        </div>
                    </div>
                    <input type="text" value={this.findValue(this.props.datid)} id={this.props.datid} name={this.props.name} onChange={this.props.onChange} className="form-control" placeholder={'Enter the name for your new '+ this.props.name  } aria-label={this.props.name}/>
                </div>
    )
  }
}

export default AdditionalElem;