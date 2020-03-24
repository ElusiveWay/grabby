import React from "react";
import {useState} from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

const CommentsForm = (props) => {
let [inpCom, setInpComm] = useState('')
let [inpCom2, setInpComm2] = useState('')
const setInpCom = (e) =>{
  setInpComm(e.target.value)
}
const setInpCom2 = (e) =>{
  setInpComm2(e.target.value)
}
const reset = (e) => {
  props.onSubmit(e)
  setInpComm2('')
  setInpComm('')
}
return (
    <MDBCol className={props.className}md="6">
      <style dangerouslySetInnerHTML={{__html: `
      input[type=date]:focus:not([readonly]), input[type=datetime-local]:focus:not([readonly]), input[type=email]:focus:not([readonly]), input[type=number]:focus:not([readonly]), input[type=password]:focus:not([readonly]), input[type=search-md]:focus:not([readonly]), input[type=search]:focus:not([readonly]), input[type=tel]:focus:not([readonly]), input[type=text]:focus:not([readonly]), input[type=time]:focus:not([readonly]), input[type=url]:focus:not([readonly]), textarea.md-textarea:focus:not([readonly]) {
          border-bottom: 1px solid #7e7ab4 !important;
          box-shadow: 0 1px 0 0 #7e7ab4 !important;
      }
      label.active{
        color: #7e7ab4 !important;
      }
      i.active{
        color: #7e7ab4 !important;
      }
      .outlineButtonOfSh:hover{
        color: #7e7ab4;
        outline: 2px solid #7e7ab4;
      }
      .mytextcomm:hover{
        cursor: pointer;
        color: #7e7ab4;
        transition: 0.5s;
      }
      `}}/>
      <form method="post" onSubmit={reset}>
        <p className="h5 mytextcomm text-center mb-4">Comment the item</p>
        <div className="grey-text">
          <MDBInput onChange={setInpCom} value={inpCom} name="titla" label="Subject" icon="tag" type="text" />
          <MDBInput onChange={setInpCom2} value={inpCom2} name="texta" style={{minHeight:'50px',maxHeight:'400px'}}type="textarea" required rows="2" label="Your message" icon="pencil-alt" />
        </div>
        <div className="text-center">
          <MDBBtn outline type="submit"  color="" className="outlineButtonOfSh">
            Send
            <MDBIcon far icon="paper-plane" className="ml-1" />
          </MDBBtn>
        </div>
      </form>
    </MDBCol>
);
};

export default CommentsForm;