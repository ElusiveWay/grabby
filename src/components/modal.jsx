import React,{Component} from 'react'
import axios from 'axios'
import makeMessage from './peref/mess'
import * as $ from 'jquery'
import LANG from '../lang'

export default class Modal extends Component{
    constructor(props){
        super(props)
        this.modalAction = this.modalAction.bind(this)
        this.deleteItems = this.deleteItems.bind(this)
        this.deleteCollections = this.deleteCollections.bind(this)
    }
    deleteCollections(){
        console.log('del')
        const collections = this.props.deleteCollections
        axios({
            method: 'post',
            url : '/deletecollections',
            data: {
                owner : JSON.stringify(this.props.owner),
                user : JSON.stringify(this.props.user),
                collections : JSON.stringify(collections)
            }
        }).then(r=>{
            console.log(r)
            if (r.data.resp=='ok'){
                makeMessage()
            }
            else{
                makeMessage('danger','Oops!', r.data.resp || 'Unknown error')
            }
        })
    }
    deleteItems(){
        const itemsIds = this.props.deleteItems.items
        axios({
            method: 'post',
            url : '/deleteitems',
            data: {
                owner : JSON.stringify(this.props.owner),
                user : JSON.stringify(this.props.user),
                items : JSON.stringify(itemsIds)
            }
        }).then(r=>{
            if (r.data.resp=='ok'){
                makeMessage()
                global.document.querySelectorAll('[data-type="chosenItem"]').forEach(v=>v.checked = false)
            }
            else{
                makeMessage('danger','Oops!', r.data.resp || 'Unknown error')
            }
        })
    }
    modalAction(){
        if(global.__user.email == global.__deleteCommentsData.comment.liker){
            axios({
                method: 'POST',
                url: '/deleteComment',
                data: {
                    delete: global.__deleteCommentsData,
                    user: global.__user
                }
                }).then(r=>{
                    global.__deleteCommentsData = {}
                }).catch(e=>console.log(e)) 
                 
        }
        else{
            console.log('you are not owner')
        } 
    }
    render(){
        //target title text
        return(
            <div class="modal fade" id={this.props.target} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div style={{ position: 'fixed',left: '50%', top: '35%', transform: 'translate(-50%,-50%)',width: '90%',margin:'0'}} class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> {this.props.title} </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label={LANG.close[localStorage.getItem('lang')]}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {this.props.text}
                    </div>
                    <div class="modal-footer">
                        <button type="button" style={{color:'white',backgroundColor:'#7ab0b4'}} class="btn" data-dismiss="modal">{LANG.close[localStorage.getItem('lang')]}</button>
                        <button type="button" style={{color:'white',backgroundColor:'#7e7ab4'}} onClick={(this.props.deleteItems)?this.deleteItems:(this.props.deleteCollections)?this.deleteCollections:this.modalAction} data-dismiss="modal" class="btn">{LANG.delete[localStorage.getItem('lang')]}</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}