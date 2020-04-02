import React,{Component, useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import ModalOk from './modalok'
import ProfileBox from './profilebox'
import Route from "react-router-dom"
import AmazingTable from './amazingTable'
import {Link} from 'react-router-dom'
import Collection from './CollectionElement'

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
                likes : 'Likes :',
                name : '',
                online : '',
                views : 'Items : ',
                status : 'Its hard to find me, easy to lose and impossible to forget. '
    })

    useEffect(() => {
        const interval = setInterval(() => {
            
            setItems(global.__mainData?global.__mainData.items.map(v=>v).filter(v=>JSON.parse(v.author)._id == id):[])
            setColls(global.__mainData?global.__mainData.collections.map(v=>v).filter(v=>JSON.parse(v.author)._id == id):[])
            setUser(global.__mainData?global.__mainData.users.map(v=>v).filter(v=>v._id == id)[0]:{})
            setProfileData({
                photo : (user && user.img && user.img!=='')?user.img:'http://placehold.it/450x320?text=No+image+yet',
                likes : (user && Object.keys(user).length!==0 && items && items.length!==0)?`Likes : ${items.reduce((t,c,i)=>{return (c.likes!==undefined)?t+JSON.parse(c.likes).length:t},0)}`:'Likes : 0',
                name : (user && Object.keys(user).length!==0)?user.name:'',
                online : (user && Object.keys(user).length!==0 && global.__signed && global.__signed.length!==0 && global.__signed.some(v=>v==id))?<b style={{color:'green',fontWeight:'600'}}>Online</b>:<b style={{color:'red',fontWeight:'600'}}>Offline</b>,
                views : (user && Object.keys(user).length!==0 && items && items.length!==0)?`Items : ${items.length}`:'Items : 0',
                status : (user && Object.keys(user).length!==0)?user.status:''
            })
        }, 50)
        return () => clearInterval(interval);
      });

    return (user && Object.keys(user).length!==0)?(
            <div> 
                <img src='' onError={()=>window.scrollTo(0,0)}/>
                <ProfileBox data={profileData}></ProfileBox>
                <section className="sectionsPage">
                    <style dangerouslySetInnerHTML={{__html:`
                        .formPageUserPage{
                            width: calc(100% - (300px + 0vw));
                            margin-left: calc(300px + 0vw);
                            padding: 30px 50px;
                            margin-top: 20px;
                            min-height: 600px;
                            border-left: 1px solid rgba(219, 219, 219, 1);
                        }
                        .collectionsBox{
                            display: flex;
                             flex-wrap:wrap;
                             flex-direction:row-reverse;
                        }
                        .collElemWrapper{

                        }
                        @media screen and (min-width: 1250px){
                            .collectionsBox{
                                 justify-content:space-between;
                            }
                            .collElemWrapper{
                                width:47.5%;
                            }
                        }
                    `}}/>
                    <form className="formPageUserPage">
                        {(guser.isAdmin === true || guser._id === user._id) && <Link style={{color:'rgb(135, 134, 197)',float:'right'}} to={`/users/${id}/addc`}>Add collection</Link>}
                        {(guser.isAdmin === true || guser._id === user._id) && <Link style={{color:'rgb(135, 134, 197)',float:'right'}} to={`/users/${id}/addi`}>Add item|</Link>}
                        <h1 style={{marginBottom:'15px',color:'#747373',paddingBottom:'5px',display:'inline-block',borderBottom:'1px solid #74737333'}}>Collections:</h1>
                        <div className="collectionsBox">
                            {colls.map((v,i,a)=>{
                                return (<div className='collElemWrapper'><Collection data2={v._id} iterator={i} data={colls[i]} /></div>)
                            })}
                            {colls.length==0 && <h2 style={{marginBottom:'50px'}}>User has not added collections yet.</h2>}
                        </div>
                        <h1 style={{marginBottom:'15px',color:'#747373',paddingBottom:'5px',display:'inline-block',borderBottom:'1px solid #74737333'}}>Items:</h1>
                        <div className='__cont_ainer_'>
                            <AmazingTable owner={user} user={guser} color="#fafffa" id={colls.map(v=>v._id)}/>
                        </div> 
                        
                    </form>
                </section>
            </div>):<div style={{flexDirection:'column',height:'90vh',display:'flex',justifyContent:'center',alignItems:'center'}}><h2>Loading...</h2><br/><Link to='/signin'><button style={{color:'black'}}className="btn">Sign</button></Link></div>
}

export default UsersPages







            