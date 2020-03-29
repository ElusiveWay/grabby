import React,{Component} from 'react'
import axios from 'axios'

export default class ModalOk extends Component{
    constructor(props){
        super(props)
    }
    render(){
        //target title text
        return(
            <div style={{zIndex: '99999'}} class="modal fade" id={this.props.target} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div style={{ position: 'fixed',left: '50%', top: '50%',zIndex:'100000', transform: 'translate(-50%,-50%)',width: '90%',margin:'0'}} class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> {this.props.title} </h5>
                        <button type="button" class="close"  data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div style={{maxHeight:'70vh',overflowY:'scroll'}}class="modal-body">
                        {this.props.text}
                    </div>
                    <div class="modal-footer">
                        <button type="button" style={{backgroundColor:'#7ab0b4',color:'white'}} class="btn"  data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}