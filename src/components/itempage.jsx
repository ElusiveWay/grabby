import React,{Component, useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import ReactDOM from 'react-dom'
import axios from 'axios'
import {Link} from 'react-router-dom'
import * as $ from 'jquery'
import Modal from './modal'
import Message from './peref/message'
import ModalOk from './modalok'
import CommentsForm from './inputs/comments-form'
import makeMessage from './peref/mess'
import LANG from '../lang'


const ItemPage = (props) => {
    let [myItem, setMyItem] = useState({})
    let [colItem, setCol] = useState({})
    let [author, setAuthor] = useState({})
    let [adds, setAdds] = useState({})
    let [likes, setLikes] = useState([])
    let [commens, setComs] = useState([])
    let [tags, setTags] = useState([])
    let [toggler, setToggler] = useState(true)
    let [isUser, setUser] = useState(false)
    let width = 80
    let height = 90
    let { id } = useParams();
    const {grabby, user} = props

    const deleteComment = (e) =>{
        let index = Array.prototype.indexOf.call(e.target.parentNode.parentNode.parentNode.children,e.target.parentNode.parentNode)-1
        if (!global.__mainData){
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1={LANG.oops[localStorage.getItem('lang')]} text2={LANG.loginfirst[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
            return
        }
        if (global.__user._id != commens[index].likerId){
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1={LANG.oops[localStorage.getItem('lang')]} text2={LANG.notyourscomment[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
            return
        }
        let newComments = commens.map(v=>v)
        newComments.splice(index,1)
        global.__deleteCommentsData = {new : newComments, item : myItem, comment : commens[index]}
    }
    const returnTamplate = (arr) => {
        return (
            //v.text v.name v.title v.img
            arr.map((v,i)=>{
            return (
                <div className={(i%2==0)?'comment right':'comment left'}>
                            <h5 style={{paddingBottom:'10px',borderBottom:'1px solid #ddd'}}>{global.__user._id==v.likerId && <i data-toggle="modal" data-target="#commentDeleterModal" onClick={deleteComment}className="far deleteIcon fa-trash-alt"></i>}<div style={(v.img=='')?{color:'black'}:{color:'transparent',backgroundImage:`url(${v.img})`}} className="avatarus-commentus">{v.likerName[0].toUpperCase()}</div><Link to={`/users/${v.likerId}`}><i className='comentato__r'>{v.likerName}: {v.titl}</i></Link></h5>
                            <p>{v.tex}</p>
                </div>
                )
            })
        )
    }
    const tegclicker = (e) => {
        let teg = e.target.innerText
        global.__modalok = <div>
                              <h3 style={{marginBottom:'20px'}}>Items with teg : #<i>{teg}</i></h3>
                              <ul>
                                {global.__mainData.items.filter(v=>JSON.parse(v.tags).some(q=>q==teg)).map(v=><Link onClick={(e)=>{e.stopPropagation();global.document.querySelectorAll('.activeSearchList').forEach(v=>v.classList.remove('activeSearchList'));e.target.classList.add('activeSearchList')}} to={`/items/${v._id}`}><li onClick={()=>$('#collPageModal').modal('hide')}><h5>{v.name}</h5></li></Link>)}
                              </ul>
                              
                           </div>
    }
    useEffect(() => {
        //
        const interval = setInterval(() => {
                if (global.__user && toggler && likes.length && global.document.getElementsByClassName('__cont_ainer_')[0]){
                    setToggler(false)
                    global.document.getElementsByClassName('__cont_ainer_')[0].getElementsByClassName('iconqa')[0].className = (likes.some(v=>v==global.__user.email))?"fas fa-heart iconqa":"far fa-heart iconqa"
                }
                setUser(Object.keys(global.__user).length!==0 && global.__user!==undefined)
                setMyItem((global.__mainData)?global.__mainData.items.filter(v=>v._id==id)[0]:{})
                setCol((global.__mainData && colItem && myItem)?global.__mainData.collections.filter(k=>{return (k.email == myItem.email && myItem.collect == k.name)})[0]:{})
                setAdds((global.__mainData && colItem)?(typeof colItem.adds == 'string')?JSON.parse(colItem.adds):{}:{})
                setLikes((global.__mainData && myItem)?(typeof myItem.likes == 'string')?JSON.parse(myItem.likes):[]:[])
                setAuthor((myItem)?JSON.parse(myItem.author):{})
                setComs((global.__mainData && myItem)?(typeof myItem.comments == 'string')?JSON.parse(myItem.comments):[]:[])
                setTags((global.__mainData && myItem)?(typeof myItem.tags == 'string')?JSON.parse(myItem.tags):[]:[])
        }, 50);
    
        return () => clearInterval(interval);
      });

      const clicker = () =>{
        if (Object.keys(global.__user).length == 0) {
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1={LANG.oops[localStorage.getItem('lang')]} text2={LANG.loginfirst[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
            return
        }
        if(myItem && global.__user.email){
            axios({
                method: 'POST',
                url: '/like',
                data: {
                    likerId: global.__user._id,
                    liker: global.__user.email,
                    itemId: myItem._id
                }
                }).then(r=>{
                    global.document.getElementsByClassName('__cont_ainer_')[0].getElementsByClassName('iconqa')[0].className = (r.data.some(v=>v==global.__user.email))?"fas fa-heart iconqa":"far fa-heart iconqa"
                    global.document.getElementsByClassName('__cont_ainer_')[0].getElementsByClassName('__darova_v1_')[0].innerText = r.data.length
                }).catch(e=>e) 
        } 
      }
      const addComment = e =>{
          e.preventDefault()
          let eventus = e.target
        if (Object.keys(global.__user).length == 0) {
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1={LANG.oops[localStorage.getItem('lang')]} text2={LANG.loginfirst[localStorage.getItem('lang')]} color="danger" id={id}/>, $('#'+id)[0])
            return
        }
        if(myItem && global.__user.email){
            axios({
                method: 'POST',
                url: '/addComment',
                data: {
                    likerId: global.__user._id,
                    likerName: global.__user.name,
                    liker: global.__user.email,
                    itemId: myItem._id,
                    itemCom: (myItem.comments===undefined)?'[]':myItem.comments,
                    titl: e.target.titla.value,
                    tex: e.target.texta.value,
                    img: global.__user.img
                }
                }).then(r=>{
                    eventus.reset()
                }).catch(e=>console.log(e)) 
        } 
      }
        return (global.__mainData && Object.keys(global.__mainData).length!==0 && myItem && colItem && Object.keys(myItem).length!==0 && Object.keys(colItem).length!==0)?(
        <div style={{display:'flex'}}>
            <img src='' onError={()=>window.scrollTo(0,0)}/>
            <style dangerouslySetInnerHTML={{__html: `
                .__cont_ainer_ > *{
                    margin:0 3vw;
                }
                .__cont_ainer_{
                    position: relative;
                    overflow:hidden;
                    display: ${(myItem && myItem._id)?'table':'none'};
                    width: ${width}vw;
                    float:left;
                    max-width: 1020px;
                    margin:2vw auto;
                    height: auto;
                }
                .__ima_ge__.dva{
                    display:none;
                }
                .__ima_ge__{
                    display:block;
                    float: left;
                    margin: 3vw 3vw 1vw  3vw;
                    width: 40%;
                    max-width: 100%;
                    height: auto;
                    background-color: #eee;
                }
                .__ti_tle__{
                    float: right;
                    margin-right: 3vw;
                    margin-top: 40px;
                    max-width: calc(45% - 5vw);
                    word-wrap: break-word;
                    height:auto;
                    display: block;
                    color: #7e7ab4;
                    width: auto;
                }
                .__ico_nqa:hover{
                    color: white;
                }
                .__ico_nqa{
                    background-color: #7e7ab4;
                    padding: 0.84rem 1rem;
                    float: right;
                    display:inline-block;
                    color: white;
                    width: calc(35% - 3vw);
                    margin-right: 3vw;
                    margin-top: 1vw;
                    clear:right;
                }
                .card > .__h_r_{
                    float:right;
                    display:inline-block;
                    width:35%;
                    margin: 2vw 3vw 2vw 1vw;
                }
                .__descr_iption{
                    text-align:justify;
                    margin: 3vw 3vw 3vw;
                    padding-top: 3vw;
                    text-indent:3vw;
                    clear: right;
                }
                .__ads_ads_{
                    clear:both;
                    margin-top:0.5vw;
                    margin-bottom:0.5vw;
                }
                .listed:before{
                    content:"•  ";
                    font-size:24px;
                }
                .comments-wrapper{
                    margin-top: 50px;
                    width:auto;
                    margin-left: 48%;
                    transform:translateX(-50%);
                    height:auto;
                    position:relative;
                }
                .comments-container{
                    padding: 3vw;
                    margin:0;
                    width:100%;
                    position:relative;
                    float:left;
                    word-wrap:break-word;
                }
                .comments-form{
                    width: 100%;
                    float: left;
                    max-width: unset;
                }
                .comment{
                    margin:20px;
                    width:80%;
                    paddding:10px;
                }
                .comment.left{
                    float: left;
                    clear:both;
                    position:relative;
                }
                .comment.right{
                    float: right;
                    clear:both;
                    position:relative;
                }
                .right h5{
                    float:right;
                    width:100%;
                    text-align:right;
                }
                .left h5{
                    float:left;
                    width:100%;
                    text-align:left;
                }
                .left p{
                    text-align:left;
                    word-wrap:break-word;
                    float:left;
                    max-width: 800px;
                    margin-top: 5px;
                }
                .right p{
                    text-align:right;
                    word-wrap:break-word;
                    float:right;
                    max-width: 800px;
                    margin-top: 5px;
                }
                .avatarus-commentus{
                    display: inline-block;
                    width: 2rem;
                    font-size: 1.5rem;
                    text-align:center;
                    line-height:1.3;
                    height:2rem;
                    border-radius:50%;
                    background-color: #ddd;
                    margin:0;
                    margin-right:10px;
                    margin-bottom:-8px;
                    background-position: center center;
                    background-size: cover;
                    background-image:url('');
                    padding:0
                }
                .deleteIcon{
                    position: relative;
                    top: 0.7rem;
                    line-height: 1.1;
                    transition:.3s;
                }
                .right h5 .deleteIcon{
                    float: left;
                    left: 1rem;
                }
                .left h5 .deleteIcon{
                    float: right;
                    right: 1rem;
                }
                .deleteIcon:hover{
                    cursor:pointer;
                    color: #bc4141;
                }
                .comentato__r:hover{
                    color: #bc4141;
                }
                .comentato__r{
                    transition:.3s;
                    cursor:pointer;
                    color:#142f7e;
                }
                .teger { 
                    float:left;
                    width: auto;
                    border-radius:24px;
                    height: 24px;
                    text-align:center;
                    display:inline-block;
                    padding:4px;
                    box-sizing: content-box;
                    line-height:1.3;
                    margin:2px;
                    transition:0.3s;
                    color:black;
                    margin-bottom:10px
                }
                .teger:before{
                    content:'#'
                }
                .teger::selection{
                    background-color: transparent;
                }
                .teger:hover{
                    cursor:pointer;
                    color:white;
                    background: #7ab0b4; 
                    box-shadow: 0 0 5px #00000099;
                }
                .editBtn:hover{
                    background-color: #7ab0b4;
                    color:white;
                }
                .editBtn{
                    cursor:pointer;
                    border-radius:.5em;
                    padding:.25em;
                    transition:.3s;
                }
                .modal.fade.show{
                    z-index:9999999;
                }

                @media screen and (max-width: 1021px){
                    .__cont_ainer_{
                        width: 100%;
                        max-width: 1020px;
                        margin:2vw 2vw;

                    }
                }
                @media all and (max-width:769px){
                    .__ti_tle__{
                        float: unset;
                        margin: 40px auto 20px;
                        text-align: center;
                        max-width: 100%;
                    }
                    img.__ima_ge__{
                        display:none;
                    }
                    .__ima_ge__.dva {
                        width: 100%;
                        float: unset;
                        max-width:400px;
                        clear: both;
                        margin: auto;
                        display:block;
                    }
                    .card > a {
                        margin: 0;
                    }
                    .card  .__ico_nqa,
                    .card  .__ico_nqa.v2{
                        width:90%;
                        margin-left:5%;
                        float:unset;
                        max-width: 100%;
                    }
                    .card > .__h_r_{
                        width:70%;
                        float:unset;
                        margin: 34px 15% 20px 15%;
                    }
                    .comments-wrapper{
                        width: 100%;
                        max-width: 400px;
                    }
                    .left h5 .deleteIcon,
                    .right h5 .deleteIcon{
                        right:unset;
                        left:unset;
                    }
                }
            `}}/>
            <MDBCard className="__cont_ainer_">
                <img src={myItem.img}className="__ima_ge__"/>
                <h1 className="__ti_tle__">{myItem.name} 
                    <span style={{top:'10px',right:'10px',position:'absolute'}}>
                        {author && Object.keys(author).length!==0 && (author._id===user._id || user.isAdmin === true) &&<Link style={{color:'#7e7ab4'}} to={{pathname:`/users/${author._id}/editi`,edititem:id}}><i style={{verticalAlign:'top',fontSize:'.5em',marginLeft:'10px'}}className="editBtn fas fa-tools"></i></Link>} 
                        {author && Object.keys(author).length!==0 && (author._id===user._id || user.isAdmin === true) &&<i data-target="#itemDeleteModal" data-toggle='modal' className="far editBtn fa-trash-alt" style={{verticalAlign:'top',fontSize:'.5em',marginLeft:'10px'}}></i>} 
                    </span>
                </h1>
                <img src={myItem.img} className="__ima_ge__ dva"/>
                <hr className="__h_r_"/>
                {colItem && <Link to={`/collections/${colItem._id}`}><MDBBtn color="" style={{backgroundColor:'rgb(122, 176, 180)',color:'white'}} className="__ico_nqa v2">{LANG.gotocolls[localStorage.getItem('lang')]}</MDBBtn></Link>}
            <MDBBtn onClick={clicker} className="__ico_nqa" color="" ><i className="fas fa-heart iconqa"></i><span style={{whiteSpace:'pre'}}> {LANG.likes[localStorage.getItem('lang')]} </span><span className="likes __darova_v1_">{likes.length}</span></MDBBtn>
                <p className="__descr_iption">{myItem.description}</p>
                <p style={{clear:'both'}} className="__comm_ention">{tags.map(v=><div  data-target="#collPageModal" data-toggle="modal" onClick={tegclicker} className="teger">{v}</div>)}</p>  

                

                {myItem.add && JSON.parse(myItem.add).length && 
                <div>
                    <h1 className="__ads_ads_">{LANG.propps[localStorage.getItem('lang')]}</h1> 
                    {JSON.parse(myItem.add).map((v,i)=>{
                        switch (v.type){
                        case 'checkbox': return <p className="__ads_ads_ listed">{(adds)?(adds[i])?adds[i][v.type]+': ':'':''}{(v.value == true)?<i className="far fa-check-circle"></i>:<i className="far fa-times-circle"></i>}</p>
                        case 'number': return <p className="__ads_ads_ listed">{(adds)?(adds[i])?adds[i][v.type]+': ':'':''}{v.value}</p>
                        case 'text': return <p className="__ads_ads_ listed">{(adds)?(adds[i])?adds[i]['date']?adds[i]['date']+': ':(adds[i]['string'])?adds[i]['string']+': ':'':'':''}{v.value}</p>
                        case 'textarea': return <div className="__ads_ads_"><h2 style={{marginTop:'2vw'}} className="listed">{(adds)?(adds[i])?adds[i][v.type]:'':''}:</h2><p style={{marginBottom:'2vw'}}>{v.value}</p></div>
                        }
                    })}
                </div>}
                <div className="comments-wrapper">{isUser && <CommentsForm onSubmit={addComment} className="comments-form"/>}</div>
                <div className="comments-container">
                      {(commens.length !== 0) && <h2 style={{marginBottom:'20px'}}>{LANG.comments[localStorage.getItem('lang')]}:</h2>}
                      {returnTamplate(commens)}
                </div>
                <p style={{visibility:'hidden'}}className="__ads_ads_ listed">FAKE P FOR MARGIN IN THE BOTTOM OF CARD</p>
            </MDBCard> 
            {author && user && id && <Modal user={user} owner={author} deleteItems={{items:[id]}} title={LANG.delItem[localStorage.getItem('lang')]} target="itemDeleteModal" text={LANG.sure[localStorage.getItem('lang')]}></Modal>}
            </div>
            
        ):(<h1 style={{position:'fixed',left:'50%',top:'50%',transform: 'translate(-50%,-50%)'}}>Loading...</h1>)
}

export default ItemPage