import React,{Component, useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import ModalOk from './modalok'
import ProfileBox from './profilebox'
import Route from "react-router-dom"
import AmazingTable from './amazingTable'
import {Link} from 'react-router-dom'
import Collection from './CollectionElement'
import LANG from '../lang'

const UsersPages = (props) => {
    let { id } = useParams();
    let guser = props.user
    let {grabby} = props
    id = (props.id!==undefined)?props.id:id
    let [colls, setColls] = useState([])
    let [items, setItems] = useState([])
    let [user, setUser] = useState({})
    let [profileData, setProfileData] = useState({
                photo : 'http://placehold.it/450x320?text=No+image+yet',
                likes : `${LANG.likes[localStorage.getItem('lang')]}`,
                name : '',
                online : '',
                views : `${LANG.items[localStorage.getItem('lang')]} `,
                status : `${LANG.status[localStorage.getItem('lang')]}. `
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(global.__mainData?global.__mainData.items.map(v=>v).filter(v=>JSON.parse(v.author)._id == id):[])
            setColls(global.__mainData?global.__mainData.collections.map(v=>v).filter(v=>JSON.parse(v.author)._id == id):[])
            setUser(global.__mainData?global.__mainData.users.map(v=>v).filter(v=>v._id == id)[0]:{})
            setProfileData({
                photo : (user && user.img && user.img!=='')?user.img:'http://placehold.it/450x320?text=No+image+yet',
                likes : (user && Object.keys(user).length!==0 && items && items.length!==0)?`${LANG.likes[localStorage.getItem('lang')]} ${items.reduce((t,c,i)=>{return (c.likes!==undefined)?t+JSON.parse(c.likes).length:t},0)}`:'Likes : 0',
                name : (user && Object.keys(user).length!==0)?user.name:'',
                online : (user && Object.keys(user).length!==0 && global.__signed && global.__signed.length!==0 && global.__signed.some(v=>v==id))?<b style={{color:'green',fontWeight:'600'}}>{LANG.online[localStorage.getItem('lang')]}</b>:<b style={{color:'red',fontWeight:'600'}}>{LANG.offline[localStorage.getItem('lang')]}</b>,
                views : (user && Object.keys(user).length!==0 && items && items.length!==0)?`${LANG.items[localStorage.getItem('lang')]} ${items.length}`:`${LANG.items[localStorage.getItem('lang')]} 0`,
                status : (user && Object.keys(user).length!==0)?user.status:''
            })
        }, 50)
        return () => clearInterval(interval);
      });

    return (user && Object.keys(user).length!==0)?(
            <div> 
                <img src='' onError={()=>window.scrollTo(0,0)}/>
                <ProfileBox owner={user} user={guser} data={profileData}></ProfileBox>
                <section className="sectionsPage">
                    <style dangerouslySetInnerHTML={{__html:`
                        .card .card-body.newrevis{
                            min-height: 200px;
                        }
                        .darkMode .card .card-body.newrevis{
                            transform: scale(1);
                            background-color: #ffffffdb;
                            filter: invert(1);
                        }
                        .microToolBar{
                            margin-top: -40px;
                            margin-bottom: 40px;
                        }
                        .formPageUserPage{
                            width: calc(100% - (300px + 0vw));
                            margin-left: calc(300px + 0vw);
                            padding: 30px 50px;
                            margin-top: 20px;
                            min-height: 600px;
                            border-left: 1px solid rgba(219, 219, 219, 1);
                        }
                        .collectionsBox{
                            display: grid;
                            margin:20px 0;
                            grid-gap:20px;
                            grid-template-columns: 1fr;
                        }
                        .collElemWrapper{
                            width:100%;
                            height:100%;
                            min-height:200px;
                        }
                        @media all and (max-width:769px){
                            .formPageUserPage > h1{
                                margin-top:10px;
                                margin-left: 50%;
                                transform: translateX(-50%);
                                margin-bottom:0px !important;
                            }
                            .formPageUserPage {
                                width: 100%;
                                padding:10px;
                                margin-left: 0;
                                margin-top:0;
                            }
                            .microToolBar{
                                font-size: .8em;
                                margin-top: -20px;
                                margin-bottom: 20px;
                            }
                        }

                        @media screen and (min-width: 1250px){
                            .collectionsBox{
                                grid-template-columns: 1fr 1fr;
                            }
                            .collElemWrapper.filled{
                                grid-column: 1 / span 2;
                            }
                        }
                    `}}/>
                    <form className="formPageUserPage">
                            {(guser.isAdmin === true || guser._id === user._id) && <div className="microToolBar" style={{float:'right'}}>
                            <Link style={{color:'rgb(135, 134, 197)',float:'right'}} to={`/users/${id}/addc`}>{LANG.addcoll[localStorage.getItem('lang')]}</Link>
                                <span style={{whiteSpace:'pre',color:'rgba(9, 56, 117, 0.65)',float:'right'}}>  |  </span>
                            <Link style={{color:'rgb(135, 134, 197)',float:'right'}} to={`/users/${id}/addi`}>{LANG.additem[localStorage.getItem('lang')]}</Link>
                            </div>
                            }
                        <h1 style={{marginBottom:'15px',color:'#747373',paddingBottom:'5px',display:'inline-block',borderBottom:'1px solid #74737333'}}>{LANG.colls[localStorage.getItem('lang')]}:</h1>
                        <div className="collectionsBox">
                            {colls.map(v=>v).reverse().map((v,i,a)=>{
                                return (<div className={(a.length%2==1 && i==a.length-1)?'collElemWrapper filled':'collElemWrapper'}><Collection data2={v._id} iterator={i} data={a[i]} /></div>)
                            })}
                            {colls.length==0 && <h2 className="contrastHx" style={{marginBottom:'50px'}}>{LANG.notaddedcolls[localStorage.getItem('lang')]}</h2>}
                        </div>
                        <h1 style={{marginBottom:'15px',color:'#747373',paddingBottom:'5px',display:'inline-block',borderBottom:'1px solid #74737333'}}>{LANG.items[localStorage.getItem('lang')]}</h1>
                        <div className='__cont_ainer_'>
                            <AmazingTable owner={user} user={guser} color="white" id={colls.map(v=>v._id)}/>
                        </div> 
                        
                    </form>
                </section>
            </div>):<div style={{flexDirection:'column',height:'90vh',display:'flex',justifyContent:'center',alignItems:'center'}}><h2>{LANG.loading[localStorage.getItem('lang')]}</h2><br/><Link to='/signin'><button style={{color:'black'}}className="btn">{LANG.signin[localStorage.getItem('lang')]}</button></Link></div>
}

export default UsersPages







            