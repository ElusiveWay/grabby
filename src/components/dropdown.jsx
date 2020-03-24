import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import AdditionalElem from '../components/inputs/textwithname'
import ItemCreator from './createitem'
import * as $ from 'jquery'

class DropdownBtn extends Component{
  constructor(props){
    super(props)
    this.state = {
      Checkbox : [],
      Textarea : [],
      String : [],
      Number : [],
      Date : []
    }
    this.createAdd = (e)=>{
      const id = [new Date+Math.random()*11][0].toLocaleString().replace(/\D/gi, '')
      this.renderAdd(id,e.target.innerText)
    }
    this.renderAdd = (id,name) => {
          let elem = global.document.createElement('div')
          elem.id = id
          global.document.getElementsByClassName('additionalInputs')[0].appendChild(elem)
          let str = `<div style='width:100%;margin: 30px 0% 0px' class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <button style="background-color:rgb(122, 176, 180) !important"  class="btn btn-primary btn-md m-0 px-3 py-2 z-depth-0 dropdown-toggle" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${name}</button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" onclick='$("#${id}").remove()'>Delete</a>
                                    </div>
                                </div>
                                <input type="text" value='' class="form-control" placeholder='Enter the name for your new ${name}'  aria-label='${name}'/>
                      </div>`
          elem.innerHTML = str
    }
  }
  style = {
    zIndex: '3',
    left: '50%', 
    position: 'relative', 
    margin:'0',
    transform:' translate(-50%, 0)',
    display:'block',
  }

render(){
    return (
      <div style={this.style} name={this.props.name}>
        <div style={{display:'flex',justifyContent:'center'}}>
            <MDBDropdown placement='right' >
            <MDBDropdownToggle caret color='' style={{color:'white',backgroundColor:'rgb(135, 134, 197)'}}>
                Click to add some new property for your collection
            </MDBDropdownToggle>
            <MDBDropdownMenu  basic>
                <MDBDropdownItem onClick={this.createAdd}>Checkbox</MDBDropdownItem>
                <MDBDropdownItem onClick={this.createAdd}>Textarea</MDBDropdownItem>
                <MDBDropdownItem onClick={this.createAdd}>String</MDBDropdownItem>
                <MDBDropdownItem onClick={this.createAdd}>Number</MDBDropdownItem>
                <MDBDropdownItem onClick={this.createAdd}>Date</MDBDropdownItem>
            </MDBDropdownMenu>
            </MDBDropdown>
        </div>
        <div id='targ'className="additionalInputs">
        {/*возможные строки\була\даты\текста\числа */}
        </div>
      </div>
    )
  }
}

export default DropdownBtn