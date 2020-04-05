import React from "react"
import DropboxInput from './inputs/dropboxitemname'
import Text from './inputs/text'
import {Route,Link, Redirect} from 'react-router-dom'
import TextareaPage2 from './inputs/textarea2'
import ProfileBox from './profilebox'
import ReactDOM from 'react-dom'
import ImageUpload from './inputs/Imageupload'
import ModalOk from './modalok'
import Collection from './CollectionElement'
import DataPicker from './datapicker'
import Message from './peref/message'
import AmazingTable from './amazingTable'
import DropdownBtn from './dropdown'
import io from 'socket.io-client'
import * as $ from 'jquery'
import 'bootstrap'
import SocketIOFileUpload from 'socketio-file-upload'
import {MDBBtn} from 'mdbreact'
import LANG from '../lang'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react'
const socket = io()
class ItemCreator extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            collections : [],
            types : ['Alcohol','Cats','Weapon','Motos'],
            availbleNames : [],
            availbleTypes : [],
            redirect : '',
            addsForItemCreation : [],
            chosenForItem : '',
            tegState : [],
            addsOutState : [],
            file2 : '',
            owner : {},
            link: '',
            editcol : {},
            edititem : {}
        }
        this.refItemDropbox2 = React.createRef()
        this.refItemDropbox1 = React.createRef()
        this.style = {
            submit:{
                zIndex:'0',
                margin:'0px 70% 50px',
                display:'block',
                width:'100px',
                color:'white',
                backgroundColor:'#7ab0b4'
            },
            section:{
                
            },
            h1:{
                marginBottom:'50px',
                color : 'rgb(135, 134, 197)'
            },
            formColl:{
                width:'66%',
                marginLeft: '32%',
                padding: '30px 50px',
                marginTop: '20px',
                borderLeft: '1px solid rgba(219, 219, 219, 1)',
                minHeight: '600px',
            },
            formPage:{
                width:'66%',
                marginLeft: '32%',
                padding: '30px 50px',
                marginTop: '20px',
                minHeight: '600px',
                borderLeft: '1px solid rgba(219, 219, 219, 1)',
            },
            formItem:{
                width:'66%',
                marginLeft: '32%',
                padding: '30px 50px',
                borderLeft: '1px solid rgba(219, 219, 219, 1)',
                marginTop: '20px',
                minHeight: '600px',
            },
            container:{
                width:'100%',
                boxSizing: 'content-box',
                backgroundColor: '#fafffa',
                minHeight: '500px',
            },
            file:{
                display: 'inline-block',
                margin: '10px',
                padding: 'unset',
                width: 'calc(50% - 20px)',
                overflow: 'hidden'
            },
            dropboxinp:{
                display: 'inline-block',
                margin: '10px',
                transform: 'translateY(-22px)',
                padding: 'unset',
                width: 'calc(50% - 20px)',
                zIndex:'3'
            },
            dropboxinp2:{
                display: 'inline-block',
                margin: '10px',
                transform: 'translateY(0px)',
                padding: 'unset',
                width: 'calc(50% - 20px)',
                zIndex:'3'
            },
            dropboxinp3:{
                display: 'block',
                position: 'relative',
                margin: '-20px 10px',
                transform: 'translateY(-25px)',
                width: 'calc(50% - 20px)',
                zIndex:'3'
            },
            comment:{},
            description:{
                width: '100%',
                resize:'none'
            },
            description2:{
                width: '100%',
                height: '262px',
                resize:'none',
                display: 'inline-block'
            },
            description11:{
                width: '100%',
                height: '100px',
                resize:'none',
                display: 'block'
            },
            hr:{
                backgroundColor: '#2223',
                margin: '40px 0px 40px',
                border: '0px',
                marginLeft: '0%',
                width: '100%',
                height: '1px',
            },
            hr2:{
                backgroundColor: 'gray',
                margin: '30px 0px 30px',
                border: '0px',
                marginLeft: '0%',
                width: '70%',
                height: '1px',
            },
            additional:{
                width:'90%',
                margin: '30px 5% 0px'
            },
        }
        
    }

componentWillMount(){
    socket.off('edit-item');
    socket.on('edit-item',(r)=>{
        if (r.respa != "ok"){
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1="Oops!" text2={r.respa} color="danger" id={id}/>, $('#'+id)[0])
            console.log(r)
          }else if(r.respa == "ok"){
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1="Yeah!" text2="The item is added to collection!" color="success" id={id}/>, $('#'+id)[0])
            this.setState({redirect : 'item'})
            console.log(r)
          }
    })
    socket.off('add-collection');
    socket.on('add-collection',(r)=>{
        if (r.respa != "ok"){
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1="Error!" text2={r.respa} color="danger" id={id}/>, $('#'+id)[0])
          }else if(r.respa == "ok"){
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1="Yeah!" text2="The collection is added!" color="success" id={id}/>, $('#'+id)[0])
            this.setState({redirect : 'profile'})
          }
    })
    socket.off('edit-collection');
    socket.on('edit-collection',(r)=>{
        if (r.respa != "ok"){
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1="Error!" text2={r.respa} color="danger" id={id}/>, $('#'+id)[0])
          }else if(r.respa == "ok"){
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1="Yeah!" text2="The collection is eddited!" color="success" id={id}/>, $('#'+id)[0])
            this.setState({redirect : 'collect'})
            console.log(r.data)
          }
    })
    socket.off('add-item');
    socket.on('add-item',(r)=>{
        if (r.respa != "ok"){
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1="Oops!" text2="Something went wrong!" color="danger" id={id}/>, $('#'+id)[0])
            console.log(r)
          }else if(r.respa == "ok"){
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1="Yeah!" text2="The item is added to collection!" color="success" id={id}/>, $('#'+id)[0])
            console.log(r)
          }
    })
}

componentDidMount(){
     this.interval = setInterval(()=>{
         if ((Object.keys(this.state.editcol).length===0 && this.props.location.editcol) || (this.props.location.editcol && this.state.editcol._id!==this.props.location.editcol)){
             this.setState({editcol : this.props.grabby.collections.filter(f=>f._id==this.props.location.editcol)[0]},()=>{
                 if (Object.keys(this.state.editcol).length !== 0) {
                     console.log('init editcol')
                    $(`[name='col_descript']`).val(this.state.editcol.descript)
                 }
             })
         }
         if (this.state.edititem && (Object.keys(this.state.edititem).length===0 && this.props.location.edititem) || (this.state.edititem && this.props.location.edititem && this.state.edititem._id!==this.props.location.edititem)){
             this.setState({edititem : this.props.grabby.items.filter(f=>f._id==this.props.location.edititem)[0]},()=>{
                 console.log(this.state.edititem)
                 if (Object.keys(this.state.edititem).length !== 0) {
                     console.log('init edititem')
                    $(`[name='item_descript']`).val(this.state.edititem.description)
                 }
             })
         }
         if (this.state.link !== this.props.sub) {
             this.setState({link : this.props.sub})
         }
         if(this.props.grabby && JSON.stringify(this.props.grabby.users.filter(v=>v._id === this.props.id)[0]) !== JSON.stringify(this.state.owner))this.setState({owner : (this.props.grabby)?this.props.grabby.users.filter(v=>v._id === this.props.id)[0]:{}})
    try{
        let arr = []
        Array.prototype.forEach.call(global.document.getElementsByClassName('addsOutCont')[0].querySelectorAll('input, textarea'),v=>{
            if (v.type == 'checkbox'){
                arr.push({type: v.type, value : v.checked})
            }
            else{
                arr.push({type: v.type, value : v.value})
            }
        })
        this.setState({addsOutState : arr})
    }catch(e){}
    try{this.setState({tegState : Array.prototype.map.call(global.document.getElementsByClassName('tegCont')[0].getElementsByClassName('teg'),v=>v.innerText)})}catch(e){}
    try{this.setState({addsForItemCreation : JSON.parse(this.state.collections.filter(v=>v.name==global.document.getElementsByClassName('addinpdropiq2')[0].value)[0].adds)})}catch(e){}
    try{
         this.setState({collections : global.__mainData.collections.map(v=>v).filter(v=>v.email==this.state.owner.email)}) 
         if (JSON.stringify(this.state.availbleTypes) != JSON.stringify(this.state.types.filter(v=>this.state.collections.map(r=>r.type).some(q=>q==v)))){
            console.log('types changed')
             this.setState({availbleTypes : this.state.types.filter(v=>this.state.collections.map(r=>r.type).some(q=>q==v))}, ()=>{
                try {this.refItemDropbox1.current.changeState({drop : this.state.availbleTypes[0]})}catch(e){}
             })
         }
         this.setState({availbleNames : this.state.collections.filter(v=>v.type==this.state.chosenForItem).map(v=>v.name)})
         let prev = global.document.getElementsByClassName('addinpdropiq')[0].value
         if (prev != this.state.chosenForItem){
            console.log('changed')
            this.setState({chosenForItem: global.document.getElementsByClassName('addinpdropiq')[0].value},()=>{
                try {this.refItemDropbox2.current.changeState({drop : this.state.collections.filter(v=>v.type==this.state.chosenForItem)[0].name})}catch(e){}
            })
         }
        }
        catch(e){

        }
     },100)
}
returnMeVar(vari){
    this.setState({file2 : vari})
}
componentWillUnmount(){
    clearInterval(this.interval)
}
checkRedirect(){
    if (this.state.redirect == 'profile'){
        this.setState({redirect : ''})
        return <Redirect to={`/users/${this.props.id}`}/>
    }
    if (this.state.redirect == 'collect'){
        this.setState({redirect : ''})
        return <Redirect to={`/collections/${this.state.editcol._id}`}/>
    }
    if (this.state.redirect == 'item'){
        this.setState({redirect : ''})
        return <Redirect to={`/items/${this.state.edititem._id}`}/>
    }
}

subFormColl = (e) => {
    e.preventDefault()
    if(this.state.owner.email === undefined) return false;
    let array = Array.prototype.map.call(global.document.getElementsByClassName('additionalInputs')[0].children, v=>{ return{[v.getElementsByTagName('button')[0].innerText.toLowerCase()] : v.getElementsByTagName('input')[0].value.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,'')}})
        socket.emit('add-collection',{
            author : JSON.stringify(this.state.owner),
            email : this.state.owner.email,
            name : e.target.col_name.value,
            descript : e.target.col_descript.value,
            comment : e.target.col_comment.value,
            type : e.target.col_type.value,
            img : this.state.file2,
            adds : JSON.stringify(array),
            creator : this.props.user.email
        })
}
subEditCol = (e) => {
    e.preventDefault()
    if(this.state.owner.email === undefined) return false;
    let primaryArray = Array.prototype.map.call(global.document.getElementsByClassName('alreadyInUse')[0].children, v=>{ return{[v.getElementsByTagName('button')[0].innerText.toLowerCase()] : v.getElementsByTagName('input')[0].value.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,'')}})
    let array = Array.prototype.map.call(global.document.getElementsByClassName('additionalInputs')[0].children, v=>{ return{[v.getElementsByTagName('button')[0].innerText.toLowerCase()] : v.getElementsByTagName('input')[0].value.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,'')}})
        socket.emit('edit-collection',{
            author : JSON.stringify(this.state.owner),
            email : this.state.owner.email,
            name : e.target.col_name.value,
            defName: this.state.editcol.name,
            descript : e.target.col_descript.value,
            comment : e.target.col_comment.value,
            type : e.target.col_type.value,
            img : ($('[name="col_img"]')[0].style.backgroundImage.slice(4, -1).replace(/["']/g, "") === this.state.editcol.img)?this.state.editcol.img:this.state.file2,
            primAdds : JSON.stringify(primaryArray),
            adds : JSON.stringify(array),
            creator : this.props.user.email
        })
    
}
subFormItems = (e) => {
    e.preventDefault()
    if(this.state.owner.email === undefined) return false;
    socket.emit('add-item',{
        author : JSON.stringify(this.state.owner),
        email : this.state.owner.email,
        name : e.target.item_name.value,
        description : e.target.item_descript.value,
        type : this.state.chosenForItem,
        collect: document.getElementsByClassName('addinpdropiq2')[0].value,
        img : this.state.file2,
        add : JSON.stringify(this.state.addsOutState),
        tags : JSON.stringify(this.state.tegState),
        creator : this.props.user.email
    })
}
subEditItem = (e) => {
    e.preventDefault()
    if(this.state.owner.email === undefined) return false;
    socket.emit('edit-item',{
        author : JSON.stringify(this.state.owner),
        email : this.state.owner.email,
        name : e.target.item_name.value,
        defName : this.state.edititem.name,
        description : e.target.item_descript.value,
        type : document.getElementsByClassName('addinpdropiq')[0].value,
        collect: document.getElementsByClassName('addinpdropiq2')[0].value,
        img : ($('[name="item_img"]')[0].style.backgroundImage.slice(4, -1).replace(/["']/g, "") === this.state.edititem.img)?this.state.edititem.img:this.state.file2,
        add : JSON.stringify(this.state.addsOutState),
        tags : JSON.stringify(this.state.tegState),
        creator : this.props.user.email
    })
    
}
changeItemType(){
    console.log('da')
}
render(){
    
    return (
         <div className="createItemContainer">
             <style dangerouslySetInnerHTML={{__html: `
                    .createItemContainer{
                        width: 100%;
                        box-sizing: content-box;
                        min-height: 500px;
                    }
                    .teg { 
                        background: #7ab0b4; 
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
                        color:white;
                    }
                    .teg.add{
                        color:white;
                        background: #7a93b4;
                    }
                    .teg.add:before{
                        content:''
                    }
                    .teg:before{
                        content:'#'
                    }
                    .teg::selection{
                        background-color: transparent;
                    }
                    .teg:hover{
                        cursor:pointer;
                        color:white;
                        box-shadow: 0 0 5px #00000099;
                    }
                    .formCreateItem{
                        width: calc(100% - (300px + 0vw));
                        margin-left: calc(300px + 0vw);
                        padding: 30px 50px;
                        margin-top: 20px;
                        min-height: 600px;
                        border-left: 1px solid rgba(219, 219, 219, 1);
                    }
                    .createItem-h1{
                        marginBottom:50px;
                        color: rgb(135, 134, 197);
                    }
                    .createItem-link{
                        position: static;
                        top: 100px;
                        font-size:1em;
                        right: 20px;
                        color: rgb(135, 134, 197);
                        float: right;
                    }
                    .createItem-db2{
                        display: inline-block;
                        margin: 10px;
                        transform: translateY(0px);
                        padding: unset;
                        width: calc(50% - 20px);
                        z-index: 3;
                    }
                    .createItem-dbtitle{
                        margin-bottom: 30px;
                        display: inline-block;
                        text-align: center;
                        width: 50%;
                    }
                    .createItem-dbtitle.tri{
                        display:none;
                    }
                    @media screen and (max-width: 1000px){
                        .createItem-db2{
                            display: block;
                            margin: auto;
                            transform: translateY(0px);
                            padding: unset;
                            width: calc(100% - 20px);
                            z-index: 3;
                        }
                        .createItem-dbtitle{
                            width:100%;
                        }
                        .createItem-dbtitle.dva{
                            display:none;
                        }
                        .createItem-dbtitle.tri{
                            display:inline-block;
                        }
                    }
                    @media screen and (max-width: 769px){
                        .formCreateItem {
                            width: 100%;
                            padding:10px;
                            margin-left: 0;
                            margin-top:65px;
                        }
                        .createItem-h1{
                            marginBottom:0px;
                            font-size:8vw;
                            text-align:center;
                        }
                        .createItem-link{
                            position: static;
                            top: 100px;
                            font-size:.8em;
                            right: 20px;
                            color: rgb(135, 134, 197);
                            float: right;
                        }
                    }
                
            `}}/>
             <ProfileBox data={this.props.ProfileData} />
            { this.props.sub === 'addc' && (this.props.user._id === this.props.id || this.props.user.isAdmin === true) &&
             <section style={this.style.section} className="addCollectSect">
                <form onSubmit={this.subFormColl} className="formCreateItem" >
                    <div className='createitem-reducer'>
                        <Link className="createItem-link" to={`/users/${this.props.id}`}>{LANG.back[localStorage.getItem('lang')]}</Link>
                        <h1 className="createItem-h1">{LANG.addcoll[localStorage.getItem('lang')]}</h1>
                        <Text name="col_name" required nm={`${LANG.nameofcoll[localStorage.getItem('lang')]}*`} />
                        <TextareaPage2 name="col_descript" required style={this.style.description2} nm={`${LANG.desc[localStorage.getItem('lang')]}*`} />
                        <ImageUpload func={this.returnMeVar.bind(this)} name="col_img" />
                        <Text name="col_comment" nm={LANG.authnote[localStorage.getItem('lang')]} />
                        <span className="createItem-dbtitle">{LANG.chcolltype[localStorage.getItem('lang')]}</span>
                        <DropboxInput name="col_type" disabled arr={this.state.types}  named={LANG.colltype[localStorage.getItem('lang')]} className="createItem-db2"/>
                        <DropdownBtn name="col_adds" color=""/>
                        <hr style={this.style.hr}/>
                        <MDBBtn style={this.style.submit}color="" type="submit">Oк</MDBBtn>
                    </div>
                </form>
             </section>
            }
            { this.props.sub === 'editc' && (this.props.user._id === this.props.id || this.props.user.isAdmin === true) &&
             <section style={this.style.section} className="addCollectSect">
                <form onSubmit={this.subEditCol} className="formCreateItem">
                    <Link className="createItem-link" to={`/collections/${this.state.editcol._id}`}>{LANG.back[localStorage.getItem('lang')]}</Link>
                    <h1 className="createItem-h1">{LANG.editcoll[localStorage.getItem('lang')]}</h1>
                    {this.state.editcol.name && <Text default={this.state.editcol.name} name="col_name" required nm={`${LANG.nameofcoll[localStorage.getItem('lang')]}*`} />}
                    <TextareaPage2 name="col_descript" required style={this.style.description2} nm={`${LANG.desc[localStorage.getItem('lang')]}*`} />
                    {typeof this.state.editcol.img == 'string' &&<ImageUpload default={this.state.editcol.img} func={this.returnMeVar.bind(this)} name="col_img" />}
                    {typeof this.state.editcol.comment == 'string' && <Text default={this.state.editcol.comment} name="col_comment" nm={LANG.authnote[localStorage.getItem('lang')]} />}
                    <span className="createItem-dbtitle">{LANG.typeofucoll[localStorage.getItem('lang')]}:</span>
                    <DropboxInput name="col_type" disabled arr={this.state.types} init={this.state.editcol}  named={LANG.colltype[localStorage.getItem('lang')]} className="createItem-db2" />
                    <div className="alreadyInUse">
                    {typeof this.state.editcol.adds === 'string' && JSON.parse(this.state.editcol.adds).map((v,i,a)=>{
                        return <div style={{width:"100%",margin: "30px 0% 0px"}} className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <button style={{width:'100%',color:'white',backgroundColor:'gray'}} className="btn  btn-md m-0 px-3 py-2 z-depth-0" type="button" aria-haspopup="true" aria-expanded="false">{Object.keys(a[i])[0]}</button>
                                    </div>
                                    <input type="text" defaultValue={v[Object.keys(a[i])[0]]} className="form-control" placeholder={`${LANG.pholderaddadds[localStorage.getItem('lang')]} field`} ariaLabel="Not for edit"/>
                                </div>
                    })}
                    </div>
                    <DropdownBtn name="col_adds" color=""/>
                    <hr style={this.style.hr}/>
                    <MDBBtn style={this.style.submit}color="" type="submit">OK</MDBBtn>
                </form>
             </section>
            }
            { this.props.sub === 'addi' && (this.props.user._id === this.props.id || this.props.user.isAdmin === true) &&
            (this.props.grabby.collections.filter(f=>f.email===this.props.owner.email).length > 0)?<section style={this.style.section} className="addItemSect">
                <form onSubmit={this.subFormItems} className="formCreateItem">
                    <Link className="createItem-link" to={(this.props.location.addcoll)?`/collections/${this.props.location.addcoll._id}`:`/users/${this.props.id}`}>{LANG.back[localStorage.getItem('lang')]}</Link>
                    <h1 className="createItem-h1">{LANG.additocoll[localStorage.getItem('lang')]}</h1>
                    <Text name="item_name" required nm={`${LANG.nameofitem[localStorage.getItem('lang')]}*`} />
                    <TextareaPage2 name="item_descript" required style={this.style.description2} nm={`${LANG.desc[localStorage.getItem('lang')]}*`} />
                    <ImageUpload func={this.returnMeVar.bind(this)} name="item_img" />
                    <Text name='addTegPlsIWanna'nm={LANG.addtag[localStorage.getItem('lang')]} />   
                    <div style={{marginBottom:'30px'}} name="МАССИВ ТЕГОВ">
                        <div onClick={e=>{if(ReactDOM.findDOMNode(this).querySelectorAll('[name = addTegPlsIWanna]')[0].value==''){return false};if(Array.prototype.some.call($(ReactDOM.findDOMNode(this).querySelectorAll('.teg')),v=>v.innerText==ReactDOM.findDOMNode(this).querySelectorAll('[name = addTegPlsIWanna]')[0].value)){return false}$(e.target.parentNode.getElementsByClassName('tegCont')[0]).append(`<div class="teg" onclick={$(this).remove()}className="teg">${ReactDOM.findDOMNode(this).querySelectorAll('[name = addTegPlsIWanna]')[0].value}</div>`)}} className="teg add">{LANG.add[localStorage.getItem('lang')]}</div> 
                        <div className='tegCont'></div>
                    </div>
                    <span className="createItem-dbtitle">{LANG.chcolltype[localStorage.getItem('lang')]}</span><span className="createItem-dbtitle dva">{LANG.collslist[localStorage.getItem('lang')]}</span>
                    {(this.props.location.addcoll)?<DropboxInput forced={this.props.location.addcoll.type} className='createItem-db2' class="addinpdropiq" ref={this.refItemDropbox1} disabled arr={this.state.availbleTypes} named={LANG.colltype[localStorage.getItem('lang')]} />:<DropboxInput  className='createItem-db2' class="addinpdropiq" ref={this.refItemDropbox1} disabled arr={this.state.availbleTypes} named={LANG.colltype[localStorage.getItem('lang')]}  />}
                    <span className="createItem-dbtitle tri">{LANG.collslist[localStorage.getItem('lang')]}</span>
                    {(this.props.location.addcoll)?<DropboxInput forced={this.props.location.addcoll.name} className='createItem-db2' class="addinpdropiq2" ref={this.refItemDropbox2} disabled arr={this.state.availbleNames} named={LANG.coll[localStorage.getItem('lang')]} />:<DropboxInput className='createItem-db2' class="addinpdropiq2" ref={this.refItemDropbox2} disabled arr={this.state.availbleNames} named={LANG.coll[localStorage.getItem('lang')]} />}
                    <div>
                                    {(this.state.addsForItemCreation.length)?<hr style={this.style.hr} />:''}
                                    <h1 className="createItem-h1">{(this.state.addsForItemCreation.length)?`${LANG.setadds[localStorage.getItem('lang')]}`:''}</h1>
                                <div className='addsOutCont' style={{
                                    backgroundColor: '#e9ecef',
                                    padding: '0 20px',
                                    borderRadius: '10px',
                                    border: '1px solid #ced4da',
                                    color: '#7a93b4',
                                    display: (this.state.addsForItemCreation.length)?'block':'none'
                                }}>
                    {this.state.addsForItemCreation.map((v,i,a)=>{
                        switch(Object.keys(v)[0]){

                        case 'date' :  return (
                                    <DataPicker text={`${v[Object.keys(v)[0]]} : `} />  
                            ) 
                        case 'textarea' :  return (
                                <fieldset style={{width:'90%',margin:"30px 5%"}} class="form-group">
                                    <label for={`exampleFormControlTextareaa${i}`}>{`${v[Object.keys(v)[0]]}`}</label>
                                    <textarea style={this.style.description11} className="form-control rounded-0" id={`exampleFormControlTextareaa${i}`} rows="10"></textarea>
                                </fieldset>  
                            ) 
                        case 'string'  : return (
                                <fieldset style={{width:'90%',margin:"30px 5%"}}>
                                        <label for={`textt${i}`}>{`${v[Object.keys(v)[0]]}`}</label>
                                        <input type="text" id={`textt${i}`} class="form-control"></input>
                                </fieldset>  
                            ) 
                        case 'number'  : return (
                                <fieldset style={{width:'90%',margin:"30px 5%"}}>
                                        <label for={`numberr${i}`}>{`${v[Object.keys(v)[0]]}`}</label>
                                        <input type="number" id={`numberr${i}`} class="form-control"></input>
                                    </fieldset>   
                            ) 
                        case 'checkbox'  :  return (
                                <fieldset style={{width:'90%',margin:"30px 5%"}} className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id={`checkboxx${i}`} />
                                            <label className="custom-control-label" for={`checkboxx${i}`}>{` ${v[Object.keys(v)[0]]}`}</label>
                                </fieldset>   
                            ) 
                            }
                        })}
                            </div>
                        </div>
                    
                    
                    <hr style={this.style.hr}/>
                    <MDBBtn style={this.style.submit} color=""type="submit">OK</MDBBtn>
                </form>
                </section>: 
                this.state.link=='addi' && <section className="addItemSect">
                            <form onSubmit={this.subFormItems} className="formCreateItem">
                                <div style={{position:'relative',width:'100%',minHeight:'400px'}}>
                                    <Link className="createItem-link" to={`/users/${this.props.id}`}>{LANG.back[localStorage.getItem('lang')]}</Link>
                                    <div style={{position:'absolute',left:'50%',top:'50%',transform: 'translate(-50%,-50%)'}}>
                                        <h2 style={{marginBottom:'25px',textAlign:'center'}}>{LANG.addcollsfirst[localStorage.getItem('lang')]}</h2>
                                        <Link style={{color:'black'}} to={{pathname:`/users/${this.props.owner._id}/addc`}}><MDBBtn style={{position:'relative',left:'50%',transform: 'translateX(-50%)'}}color=''>{LANG.add[localStorage.getItem('lang')]}</MDBBtn></Link>
                                    </div>
                                </div>
                            </form>
                        </section>
            }
            { this.props.sub === 'editi' && (this.props.user._id === this.props.id || this.props.user.isAdmin === true) &&
            (this.props.grabby.collections.filter(f=>f.email===this.props.owner.email).length > 0) && <section style={this.style.section} className="addItemSect">
                <form onSubmit={this.subEditItem} className="formCreateItem">
                    <Link className="createItem-link" to={(this.props.location.edititem)?`/items/${this.props.location.edititem}`:`/users/${this.props.id}`}>{LANG.back[localStorage.getItem('lang')]}</Link>
                    <h1 className="createItem-h1">{LANG.edititem[localStorage.getItem('lang')]}</h1>
                    {typeof this.state.edititem.name === 'string' && <Text name="item_name" default={this.state.edititem.name} required nm={`${LANG.nameofitem[localStorage.getItem('lang')]}*`} />}
                    <TextareaPage2 name="item_descript" required style={this.style.description2} nm={`${LANG.desc[localStorage.getItem('lang')]}*`} />
                    {typeof this.state.edititem.img === 'string' && <ImageUpload default={this.state.edititem.img} func={this.returnMeVar.bind(this)} name="item_img" />}
                    <Text name='addTegPlsIWanna'nm={LANG.addtag[localStorage.getItem('lang')]} />   
                    <div style={{marginBottom:'30px'}} name="МАССИВ ТЕГОВ">
                        <div onClick={e=>{if(ReactDOM.findDOMNode(this).querySelectorAll('[name = addTegPlsIWanna]')[0].value==''){return false};if(Array.prototype.some.call($(ReactDOM.findDOMNode(this).querySelectorAll('.teg')),v=>v.innerText==ReactDOM.findDOMNode(this).querySelectorAll('[name = addTegPlsIWanna]')[0].value)){return false}$(e.target.parentNode.getElementsByClassName('tegCont')[0]).append(`<div class="teg" onclick={$(this).remove()}className="teg">${ReactDOM.findDOMNode(this).querySelectorAll('[name = addTegPlsIWanna]')[0].value}</div>`)}} className="teg add">{LANG.add[localStorage.getItem('lang')]}</div> 
                        <div className='tegCont'>
                        {typeof this.state.edititem.tags === 'string' && 
                            JSON.parse(this.state.edititem.tags).map(t=>{
                            return  <div className="teg" onClick={(e)=>$(e.target).remove()} className="teg">{t}</div>
                            })
                        }
                        </div>
                    </div>
                    <span className="createItem-dbtitle">{LANG.colltype[localStorage.getItem('lang')]}</span><span className="createItem-dbtitle dva">Collection</span>
                    {typeof this.state.edititem.type === 'string' && <DropboxInput forced={this.state.edititem.type} className="createItem-db2" class="addinpdropiq" ref={this.refItemDropbox1} disabled arr={this.state.availbleTypes} named={LANG.colltype[localStorage.getItem('lang')]}  />}
                    <span className="createItem-dbtitle tri">{LANG.coll[localStorage.getItem('lang')]}</span>
                    {typeof this.state.edititem.collect === 'string' && <DropboxInput forced={this.state.edititem.collect} className="createItem-db2" class="addinpdropiq2" ref={this.refItemDropbox2} disabled arr={this.state.availbleNames} named={LANG.coll[localStorage.getItem('lang')]}  />}
                    <div>
                                    {(this.state.addsForItemCreation.length)?<hr style={this.style.hr} />:''}
                                    <h1 className="createItem-h1">{(typeof this.state.edititem.add === 'string' && JSON.parse(this.state.edititem.add).length!==0)?`${LANG.setadds[localStorage.getItem('lang')]}`:''}</h1>
                                <div className='addsOutCont' style={{
                                    backgroundColor: '#e9ecef',
                                    padding: '0 20px',
                                    borderRadius: '10px',
                                    border: '1px solid #ced4da',
                                    color: '#7a93b4',
                                    display: (typeof this.state.edititem.add === 'string' && JSON.parse(this.state.edititem.add).length!==0)?'block':'none'
                                }}>
                    {typeof this.state.edititem.add === 'string' && JSON.parse(this.state.edititem.add).length!==0 &&
                    this.props.grabby.collections.filter(f=>f.name === this.state.edititem.collect && this.state.edititem.email === f.email).map(m=>JSON.parse(m.adds))[0].map((v,i,a)=>{
                        const val = (JSON.parse(this.state.edititem.add)[i] !== undefined)?JSON.parse(this.state.edititem.add)[i].value:''
                        switch(Object.keys(v)[0]){
                            
                        case 'date' :  return (
                                    <DataPicker default={val} text={`${v[Object.keys(v)[0]]} : `} />  
                            ) 
                        case 'textarea' :  return (
                                <fieldset style={{width:'90%',margin:"30px 5%"}} class="form-group">
                                    <label for={`exampleFormControlTextareaa${i}`}>{`${v[Object.keys(v)[0]]}`}</label>
                                    <textarea defaultValue={val} style={this.style.description11} className="form-control rounded-0" id={`exampleFormControlTextareaa${i}`} rows="10"></textarea>
                                </fieldset>  
                            ) 
                        case 'string'  : return (
                                <fieldset style={{width:'90%',margin:"30px 5%"}}>
                                        <label for={`textt${i}`}>{`${v[Object.keys(v)[0]]}`}</label>
                                        <input defaultValue={val} type="text" id={`textt${i}`} class="form-control"></input>
                                </fieldset>  
                            ) 
                        case 'number'  : return (
                                <fieldset style={{width:'90%',margin:"30px 5%"}}>
                                        <label for={`numberr${i}`}>{`${v[Object.keys(v)[0]]}`}</label>
                                        <input defaultValue={val} type="number" id={`numberr${i}`} class="form-control"></input>
                                    </fieldset>   
                            ) 
                        case 'checkbox'  :  return (
                                <fieldset style={{width:'90%',margin:"30px 5%"}} className="custom-control custom-checkbox">
                                            <input defaultChecked={val} type="checkbox" className="custom-control-input" id={`checkboxx${i}`} />
                                            <label  className="custom-control-label" for={`checkboxx${i}`}>{` ${v[Object.keys(v)[0]]}`}</label>
                                </fieldset>   
                            ) 
                            }
                        })}
                            </div>
                        </div>
                    
                    
                    <hr style={this.style.hr}/>
                    <MDBBtn style={this.style.submit} color=""type="submit">OK</MDBBtn>
                </form>
                </section>} 
            { ((this.props.user._id !== this.props.id && this.props.user.isAdmin !== true) || (this.props.sub !== 'addi' && this.props.sub !== 'addc' && this.props.sub !== 'editi' && this.props.sub !== 'editc')) && <Redirect to={`/users/${this.props.id}`}/>}
            {this.checkRedirect()}
        </div>

    )
}
}

export default ItemCreator;