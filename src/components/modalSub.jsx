import React,{Component} from 'react'
import axios from 'axios'
import makeMessage from './peref/mess'
import * as $ from 'jquery'
import LANG from '../lang'
import ImageUpload from './inputs/Imageupload'

export default class ModalSub extends Component{
    constructor(props){
        super(props)
        this.state = {
            file2 : '',
        }
        this.editProfile = this.editProfile.bind(this)
        this.returnMeVar = this.returnMeVar.bind(this)
    }
    returnMeVar(vari){
        this.setState({file2 : vari})
    }
    componentDidMount(){
        this.int = setInterval(()=>{
            if(global.document.querySelectorAll('.prof_ile__contain').length!==0){
                if (global.document.querySelectorAll('#modalEditProfile.modal.fade.show').length === 0){
                    global.document.querySelector('.prof_ile__contain').style.position = 'fixed'

                } 
                else{
                    global.document.querySelector('.prof_ile__contain').style.position = 'unset'
                }
            }
        },20)
    }
    editProfile(){
        const photoFormData = new FormData();
        photoFormData.append("owner", JSON.stringify(this.props.owner));
        photoFormData.append("user", JSON.stringify(this.props.user));
        photoFormData.append("name", global.document.querySelector('[name="editProfileName"]').value)
        photoFormData.append("status", global.document.querySelector('[name="editProfileStatus"]').value)
        photoFormData.append("img", ($('[name="profile_img"]')[0].style.backgroundImage.slice(4, -1).replace(/["']/g, "") === this.props.owner.img)?this.props.owner.img:$('[name="profile_img"]')[0].style.backgroundImage.slice(4, -1).replace(/["']/g, ""))
        axios({
            method: 'post',
            url : '/editProfile',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: photoFormData
        }).then(r=>{
            if (r.data.indexOf('http')==0){
                makeMessage()
                $('[name="profile_img"]')[0].style.backgroundImage = `url(${r.data})`
            }
            else{
                makeMessage('danger','Oops!', r.data || 'Unknown error')
            }
        })
    }
    render(){
        //target title text
        return(
            <div class="modal fade" id={this.props.target} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <style dangerouslySetInnerHTML={{__html:`
                .modal-backdrop.show {
                    z-index:10001;
                }
                .prof_ile__contain .upploadImageCont{
                    width: calc(100%);
                    margin: auto;
                }
                #modalEditProfile{
                    z-index: 10002;
                }
                .modal-body{
                    max-height: 50vw;
                    overflow-y: scroll;
                }
                `}}></style>
                <div style={{ maxHeight:'90%', position: 'fixed',left: '50%', top: '50%', transform: 'translate(-50%,-50%)',width: '90%',margin:'0'}} class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 className="contrastHx modal-title" id="exampleModalLabel"> {LANG.editProfile[localStorage.getItem('lang')]} </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label={LANG.close[localStorage.getItem('lang')]}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input defaultValue={this.props.owner.name} name="editProfileName" style={{marginBottom:'20px'}} type="text" placeholder={LANG.uname[localStorage.getItem('lang')]} className='form-control'></input>
                        <ImageUpload name='profile_img' default={this.props.owner.img} func={this.returnMeVar} />
                        <textarea defaultValue={this.props.owner.status} name="editProfileStatus" style={{minHeight:'100px',maxHeight:'200px',marginBottom:'20px',marginTop:'20px'}} type="text" placeholder={LANG.status[localStorage.getItem('lang')]} className='form-control'></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" style={{color:'white',backgroundColor:'#7ab0b4'}} class="btn" data-dismiss="modal">{LANG.close[localStorage.getItem('lang')]}</button>
                        <button type="button" style={{color:'white',backgroundColor:'#7e7ab4'}} onClick={this.editProfile} data-dismiss="modal" class="btn">OK</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}