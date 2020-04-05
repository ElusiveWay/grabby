import React,{Component, useEffect, useState} from 'react'
import { useParams, useLocation } from "react-router-dom";
import ItemCreator from './createitem'
import LANG from '../lang'

const CreateItemWrapper = (props) => {
    let { id, sub } = useParams()
    const { grabby } = props
    const guser = props.user
    let [ProfileData, setProfileData] = useState({
        photo : 'http://placehold.it/450x320?text=No+image+yet',
        likes : LANG.likes[localStorage.getItem('lang')],
        name : '',
        online : '',
        views : `${LANG.items[localStorage.getItem('lang')]}`,
        status : `${LANG.status[localStorage.getItem('lang')]}.`,
})  
    let [colls, setColls] = useState([])
    let [items, setItems] = useState([])      
    let [user, setUser] = useState({})
    const location = useLocation()

    id = (props.id!==undefined)?props.id:id
    sub = (props.sub!==undefined)?props.sub:sub

    useEffect(()=>{
                setItems(grabby?grabby.items.map(v=>v).filter(v=>JSON.parse(v.author)._id == id):[])
                setColls(grabby?grabby.collections.map(v=>v).filter(v=>JSON.parse(v.author)._id == id):[])
                setUser(grabby?grabby.users.map(v=>v).filter(v=>v._id == id)[0]:{})
                setProfileData({
                    photo : (user && user.img && user.img!=='')?user.img:'http://placehold.it/450x320?text=No+image+yet',
                    likes : (user && Object.keys(user).length!==0 && items && items.length!==0)?`${LANG.likes[localStorage.getItem('lang')]} ${items.reduce((t,c,i)=>{return (c.likes!==undefined)?t+JSON.parse(c.likes).length:t},0)}`:`${LANG.likes[localStorage.getItem('lang')]} 0`,
                    name : (user && Object.keys(user).length!==0)?user.name:'',
                    online : (user && Object.keys(user).length!==0 && global.__signed && global.__signed.length!==0 && global.__signed.some(v=>v==id))?<b style={{color:'green',fontWeight:'600'}}>{LANG.online[localStorage.getItem('lang')]}</b>:<b style={{color:'red',fontWeight:'600'}}>{LANG.offline[localStorage.getItem('lang')]}</b>,
                    views : (user && Object.keys(user).length!==0 && items && items.length!==0)?`${LANG.items[localStorage.getItem('lang')]} ${items.length}`:`${LANG.items[localStorage.getItem('lang')]} 0`,
                    status : (user && Object.keys(user).length!==0)?user.status:''
                })
    },[user])
    
    
    return (
        <ItemCreator location={location} ProfileData={ProfileData} user={guser} owner={user} grabby={grabby} sub={sub} id={id} />
    )
}

export default CreateItemWrapper