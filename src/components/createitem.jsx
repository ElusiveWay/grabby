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
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react'
const socket = io()
class ItemCreator extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            collections : [],
            types : ['Brodiags','Alcohol','Cats','Weapon','Motos'],
            availbleNames : [],
            availbleTypes : [],
            redirect : '',
            addsForItemCreation : [],
            chosenForItem : '',
            tegState : [],
            addsOutState : [],
            file2 : ''
        }
        this.refItemDropbox2 = React.createRef()
        this.refItemDropbox1 = React.createRef()
        this.style = {
            submit:{
                zIndex:'0',
                margin:'0px 70% 50px',
                display:'block',
                width:'20%',
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
                padding: '30px',
                //margin: '30px auto',
                minHeight: '500px',
                //boxShadow :  '0 0 15px #aaa'
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

}
componentDidMount(){
    
     this.interval = setInterval(()=>{
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
         this.setState({collections : global.__mainData.collections.map(v=>v).filter(v=>v.email==global.__user.email)}) 
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
        return <Redirect to='/profile'/>
    }
}

subFormColl = (e) => {
    e.preventDefault()
    if(global.__user.email === undefined) return false;
    let array = Array.prototype.map.call(global.document.getElementsByClassName('additionalInputs')[0].children, v=>{ return{[v.getElementsByTagName('button')[0].innerText.toLowerCase()] : v.getElementsByTagName('input')[0].value.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,'')}})
        socket.emit('add-collection',{
            author : JSON.stringify(global.__user),
            email : global.__user.email,
            name : e.target.col_name.value,
            descript : e.target.col_descript.value,
            comment : e.target.col_comment.value,
            type : e.target.col_type.value,
            img : this.state.file2,
            adds : JSON.stringify(array)
        })
    socket.on('add-collection',(r)=>{
        if (r.respa != "ok"){
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1="Error!" text2="Try some differently!" color="danger" id={id}/>, $('#'+id)[0])
          }else if(r.respa == "ok"){
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1="Yeah!" text2="The collection is added!" color="success" id={id}/>, $('#'+id)[0])
            this.setState({redirect : 'profile'})
          }
    })
}
subFormItems = (e) => {
    e.preventDefault()
    if(global.__user.email === undefined) return false;
    socket.emit('add-item',{
        author : JSON.stringify(global.__user),
        email : global.__user.email,
        name : e.target.item_name.value,
        description : e.target.item_descript.value,
        type : this.state.chosenForItem,
        collect: document.getElementsByClassName('addinpdropiq2')[0].value,
        img : this.state.file2,
        add : JSON.stringify(this.state.addsOutState),
        tags : JSON.stringify(this.state.tegState)
    })
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
            //this.setState({redirect : 'profile'})
          }
    })
}
profileData = {
    photo : 'https://sun9-66.userapi.com/c834103/v834103431/15289e/g9cHCbfD2Q0.jpg',
    likes : 'Likes : 100500',
    name : 'Uladzislau',
    online : 'Online',
    views : 'Items : 213',
    status : 'Its hard to find me, easy to lose and impossible to forget. '
}
changeItemType(){
    console.log('da')
}
render(){
    return (
         <div style={this.style.container}>
             <style dangerouslySetInnerHTML={{__html: `
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
                
            `}}/>
             <ProfileBox data={this.profileData} style={this.style.profile} />
            { this.props.sub === 'addc' &&
             <section style={this.style.section} className="addCollectSect">
                <form onSubmit={this.subFormColl} style={this.style.formColl}>
                    <Link style={{color:'rgb(135, 134, 197)',float:'right'}} to={`/users/${this.props.id}`}>Back</Link>
                    <h1 style={this.style.h1}>Add new Collection</h1>
                    <Text name="col_name" required nm="Name of collection*" />
                    <TextareaPage2 name="col_descript" required style={this.style.description2} nm="Description*" />
                    <ImageUpload func={this.returnMeVar.bind(this)} name="col_img" />
                    <Text name="col_comment" nm="Author comment" />
                    <span style={{marginBottom:'30px',display:'inline-block',textAlign:'center',width:'50%'}}>Choose collection type:</span>
                    <DropboxInput name="col_type" disabled arr={this.state.types}  named='Collection type' style={this.style.dropboxinp2} />
                    <DropdownBtn name="col_adds" color=""/>
                    <hr style={this.style.hr}/>
                    <MDBBtn style={this.style.submit}color="" type="submit">OK</MDBBtn>
                </form>
             </section>
            }
            { this.props.sub === 'addi' &&
            <section style={this.style.section} className="addItemSect">
                <form onSubmit={this.subFormItems} style={this.style.formItem}>
                    <Link style={{color:'rgb(135, 134, 197)',float:'right'}} to={`/users/${this.props.id}`}>Back</Link>
                    <h1 style={this.style.h1}>Add new Item to Collection</h1>
                    <Text name="item_name" required nm="Name of Item*" />
                    <TextareaPage2 name="item_descript" required style={this.style.description2} nm="Description*" />
                    <ImageUpload func={this.returnMeVar.bind(this)} name="item_img" />
                    <Text name='addTegPlsIWanna'nm="Add teg" />   
                    <div style={{marginBottom:'30px'}} name="МАССИВ ТЕГОВ">
                        <div onClick={e=>{if(ReactDOM.findDOMNode(this).querySelectorAll('[name = addTegPlsIWanna]')[0].value==''){return false};if(Array.prototype.some.call($(ReactDOM.findDOMNode(this).querySelectorAll('.teg')),v=>v.innerText==ReactDOM.findDOMNode(this).querySelectorAll('[name = addTegPlsIWanna]')[0].value)){return false}$(e.target.parentNode.getElementsByClassName('tegCont')[0]).append(`<div class="teg" onclick={$(this).remove()}className="teg">${ReactDOM.findDOMNode(this).querySelectorAll('[name = addTegPlsIWanna]')[0].value}</div>`)}} className="teg add">Add</div> 
                        <div className='tegCont'></div>
                    </div>
                    <span style={{marginBottom:'30px',display:'inline-block',textAlign:'center',width:'50%'}}>Choose collection type for an Item</span><span style={{display:'inline-block',textAlign:'center',width:'50%'}}>List of available collection</span>
                    <DropboxInput  class="addinpdropiq" ref={this.refItemDropbox1} disabled arr={this.state.availbleTypes} named='Collection type' style={this.style.dropboxinp} />
                    <DropboxInput class="addinpdropiq2" ref={this.refItemDropbox2} disabled arr={this.state.availbleNames} named='Collection' style={this.style.dropboxinp} />
                    <div>
                                    {(this.state.addsForItemCreation.length)?<hr style={this.style.hr} />:''}
                                    <h1 style={this.style.h1}>{(this.state.addsForItemCreation.length)?'Set additional properties':''}</h1>
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
             </section>
            }
            { this.props.sub !== 'addi' && this.props.sub !== 'addc' && <Redirect to={`/users/${this.props.id}`}/>}
            {this.checkRedirect()}
        </div>

    )
}
}

export default ItemCreator;