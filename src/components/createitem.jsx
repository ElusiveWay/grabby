import React from "react"
import File from './inputs/file'
import DropboxInput from './inputs/dropboxitemname'
import Text from './inputs/text'
import TextareaPage from './inputs/textarea'
import {Route,Link, Redirect} from 'react-router-dom'
import TextareaPage2 from './inputs/textarea2'
import ProfileBox from './profilebox'
import ReactDOM from 'react-dom'
import ImageUpload from './inputs/Imageupload'
import DataPicker from './datapicker'
import Message from './peref/message'
import DropdownBtn from './dropdown'
import io from 'socket.io-client'
import * as $ from 'jquery'
import 'bootstrap'
import {MDBBtn} from 'mdbreact'
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
            addsOutState : []
        }
        this.refItemDropbox2 = React.createRef()
        this.refItemDropbox1 = React.createRef()
        this.style = {
            submit:{
                zIndex:'0',
                margin:'0px 70% 50px',
                display:'block',
                width:'20%'
            },
            section:{
                
            },
            h1:{
                marginBottom:'50px',
                color : 'rgb(255, 94, 94)'
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
                backgroundColor: '#ecfdec',
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
        if($('.spanDesc').height() < 100) {
            $('.spanDesc').parent().css("align-items", 'center').css("color", 'unset')
        }
        else{
            $('.spanDesc').parent().css("align-items", 'start').css("color", 'unset')
        }
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
            img : e.target.col_img.value,
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
                        background: #ff5e5e; 
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
                    }
                    .teg.add{
                        background: lightgreen;
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
             <Route exact path="/profile/addc" >
             <section style={this.style.section} className="addCollectSect">
                <form onSubmit={this.subFormColl} style={this.style.formColl}>
                    <Link style={{float:'right'}} to="/profile">Back</Link>
                    <h1 style={this.style.h1}>Add new Collection</h1>
                    <Text name="col_name" required nm="Name of collection*" />
                    <TextareaPage2 name="col_descript" required style={this.style.description2} nm="Description*" />
                    <ImageUpload name="col_img" />
                    <Text name="col_comment" nm="Author comment" />
                    <span style={{marginBottom:'30px',display:'inline-block',textAlign:'center',width:'50%'}}>Choose collection type:</span>
                    <DropboxInput name="col_type" disabled arr={this.state.types}  named='Collection type' style={this.style.dropboxinp2} />
                    <DropdownBtn name="col_adds" color=""/>
                    <hr style={this.style.hr}/>
                    <MDBBtn style={this.style.submit} type="submit">OK</MDBBtn>
                </form>
             </section>
            </Route>
            <Route exact path="/profile/addi" >
            <section style={this.style.section} className="addItemSect">
                <form style={this.style.formItem}>
                    <Link style={{float:'right'}} to="/profile">Back</Link>
                    <h1 style={this.style.h1}>Add new Item to Collection</h1>
                    <Text name="item_name" required nm="Name of Item*" />
                    <TextareaPage2 name="item_descript" required style={this.style.description2} nm="Description*" />
                    <ImageUpload name="item_img" />
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
                                    color: 'rgb(220, 53, 69)',
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
                    <MDBBtn style={this.style.submit} type="submit">OK</MDBBtn>
                </form>
             </section>
            </Route>
            <Route exact path="/profile" >
            <section style={this.style.section} className="sectionsPage">
                <form style={this.style.formPage}>
                    <Link style={{float:'right'}} to="/profile/addc">Add collection</Link>
                    <Link style={{float:'right'}}to="/profile/addi">Add item|</Link>
                    <h1 style={this.style.h1}>Collections page</h1>
                    <div style={{display: 'flex', flexWrap:'nowrap',flexDirection:'column-reverse'}}className="collectionsBox">
                        {this.state.collections.map((v,i,a)=>{
                            return (<Collection data={this.state.collections[i]} />)
                        })}
                    </div>
                </form>
             </section>
            </Route>
            {this.checkRedirect()}
        </div>

    )
}
}
class Collection extends React.Component{
    constructor(props){
        super(props)
    }
    style={
        collect:{
            container:{
                width: '100%',
                position: 'relative',
                margin:'20px 0',
                minHeight:'150px',
                height: 'auto',
                borderRadius: '10px',
                backgroundColor:'transparent',
                //boxShadow: '0 0 10px gray',
                color: '#dc3545'
            },
            image:{
                display:(this.props.data.img=='')?'none':'flex',
                height:'100%',
                position:'absolute',
                boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
                width:'25%',
                backgroundColor:'#e9ecef',
                backgroundPosition:'center',
                backgroundSize:'cover',
                justifyContent: 'center',
                alignItems:'center',
                backgroundImage : (this.props.data.img=='')?'unset':`url(${this.props.data.img})`
            },
            type:{
                display:'flex',
                height:'30%',
                right: '1%',
                top: '6.3%',
                boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
                padding: '0',
                margin: '0',
                position:'absolute',
                width:'17%',
                backgroundColor:'#e9ecef',
                justifyContent: 'center',
                alignItems:'center'
            },
            open:{
                display:'flex',
                height:'50%',
                right: '1%', 
                bottom:'6.8%',
                position:'absolute',
                width:'17%',
                padding: '0',
                margin: '0',
                backgroundColor:'#e9ecef',
                justifyContent: 'center',
                alignItems:'center',
                cursor: 'pointer'
            },
            desc:{
                display:'flex',
                height:'87%',
                left: (this.props.data.img=='')?'1%':'27.5%', 
                bottom:'10px',  
                padding: '10px',
                margin: '0',
                position:'absolute',
                width:(this.props.data.img=='')?'80%':'52%',
                boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
                backgroundColor:'#e9ecef',
                justifyContent: 'center',
                alignItems: 'space-around',
                overflow:'hidden',
                color:'transparent'
            },
        },
    }
    
    render(){
             return ( 
                    <div>
                        <hr/>
                        <h2 style={{color:'#0c7ff2'}}>{this.props.data.name}</h2>
                        <div style={this.style.collect.container}>
                            <div style={this.style.collect.image}></div>   
                            <div style={this.style.collect.type}><span style={{color:'green'}}>{this.props.data.type}</span></div>   
                            <div style={this.style.collect.desc}><span className='spanDesc'>{this.props.data.descript}</span></div>   
                            <div className="btn"style={this.style.collect.open}><span>Open</span></div>  
                        </div> 
                    </div>
                    )
                }
}
export default ItemCreator;