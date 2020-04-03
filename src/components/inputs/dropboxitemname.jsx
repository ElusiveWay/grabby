import React from "react";
import ReactDOM from 'react-dom'
import { MDBContainer, MDBInputGroup, MDBDropdown, MDBDropdownToggle, MDBIcon, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

class DropboxInput extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          drop: '',
          toggleInit : false
        }
    }
componentDidMount(){
  ReactDOM.findDOMNode(this).getElementsByClassName('disabledInput')[0].disabled = this.props.disabled
  if(this.state.toggleInit === false)this.setState({drop : this.props.arr[0]}, ()=>{})
  global.document.getElementById(this.aidi).name = this.props.name
  global.document.getElementById(this.aidi).value = this.state.drop
  this.inter = setInterval(()=>{
    if (this.state.toggleInit === false && this.props.init && this.props.init.type){
      console.log(this.props.init.type)
      this.setState({drop:this.props.init.type, toggleInit : true})
    }
    if (this.state.toggleInit === false && this.props.forced){
      console.log(this.props.forced)
      this.setState({drop:this.props.forced, toggleInit : true},()=>console.log(`drop changed to: ${this.state.drop}`))
    }
  },20)
}
componentWillUnmount(){
  clearInterval(this.inter)
}
aidi = [new Date+Math.random()].toLocaleString().replace(/\D/g,"")
switchState(e){
  this.setState({drop : e.target.innerText}, ()=>{})
    global.document.getElementById(this.aidi).value = this.state.drop
}
changeState(obj){
  if (this.props.forced) return false
  this.setState(obj)
}
render() {
    return (
      <MDBContainer className={this.props.className} style={this.props.style}>
        <MDBInputGroup
          className={(this.props.class!==undefined)?`${this.props.class} disabledInput`:"disabledInput"}
          id = {this.aidi}
          style = {{marginBottom:'0 !important'}}
          containerClassName="mb-3"
          value = {this.state.drop}
          append={
            <MDBDropdown dropup>
              <MDBDropdownToggle
                color=""
                style={{backgroundColor:(this.state.toggleInit === true)?'gray':"#7ab0b4",color:'white'}}
                size="md"
                className="m-0 px-3 z-depth-0"
                value = {this.state.drop}
              >
                {this.props.named} <MDBIcon icon="caret-down" className="ml-1" />
              </MDBDropdownToggle>
              {this.state.toggleInit === false && <MDBDropdownMenu>
              { this.props.arr.map(v => <MDBDropdownItem onClick={(e)=>this.switchState(e)}>{v}</MDBDropdownItem> ) }
              </MDBDropdownMenu>}
            </MDBDropdown>
          }
        />
      </MDBContainer>
    )
  }
}

export default DropboxInput;