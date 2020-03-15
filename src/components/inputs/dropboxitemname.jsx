import React from "react";
import ReactDOM from 'react-dom'
import { MDBContainer, MDBInputGroup, MDBDropdown, MDBDropdownToggle, MDBIcon, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

class DropboxInput extends React.Component {
    constructor(props){
        super(props)
    }
componentDidMount(){
  ReactDOM.findDOMNode(this).getElementsByClassName('disabledInput')[0].disabled = this.props.disabled
  global.document.getElementById(this.aidi).value = this.props.arr[0]
}
aidi = [new Date+Math.random()].toLocaleString().replace(/\D/g,"")
switchState(e){
    global.document.getElementById(this.aidi).value = e.target.innerText
}

render() {
    return (
      <MDBContainer style={this.props.style}>
        <MDBInputGroup
          className="disabledInput"  
          id = {this.aidi}
          style = {{marginBottom:'0 !important'}}
          value = "Books "
          containerClassName="mb-3"
          append={
            <MDBDropdown>
              <MDBDropdownToggle
                color="default"
                size="md"
                className="m-0 px-3 z-depth-0"
              >
                {this.props.named} <MDBIcon icon="caret-down" className="ml-1" />
              </MDBDropdownToggle>
              <MDBDropdownMenu>
              { this.props.arr.map(v => <MDBDropdownItem onClick={(e)=>this.switchState(e)}>{v}</MDBDropdownItem> ) }
              </MDBDropdownMenu>
            </MDBDropdown>
          }
        />
      </MDBContainer>
    )
  }
}

export default DropboxInput;