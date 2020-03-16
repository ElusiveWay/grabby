import React from "react"
import File from './inputs/file'
import DropboxInput from './inputs/dropboxitemname'
import Text from './inputs/text'
import TextareaPage from './inputs/textarea'
import {Route,Link, Redirect} from 'react-router-dom'
import TextareaPage2 from './inputs/textarea2'
import ProfileBox from './profilebox'
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
            collections : []
        }
        this.style = {
            submit:{
                zIndex:'0',
                margin:'0px 70% 50px',
                display:'block',
                width:'20%'
            },
            profile:{
                photo:{
                    position: 'absolute',
                    backgroundColor:'#e9ecef',
                    backgroundSize: 'cover',
                    borderRadius: '.25rem',
                    backgroundPosition: 'center',
                    width: '50%',
                    borderBottom: '1px solid #00000033',
                    height: '50%',
                    top: '5%',
                    left: '5%',
                    backgroundImage : `url(${this.profileData.photo})`
                },
                likes:{
                    position: 'absolute',
                    backgroundColor:'#e9ecef',
                    width: '35%',
                    borderRadius: '.25rem',
                    borderBottom: '1px solid #00000033',
                    height: '10%',
                    left: '60%',
                    top: 'calc(35% + (30% / 3))'
                },
                name:{
                    position: 'absolute',
                    backgroundColor:'#e9ecef',
                    width: '35%',
                    borderBottom: '1px solid #00000033',
                    borderRadius: '.25rem',
                    height: '10%',
                    left: '60%',
                    top: '5%'
                },
                views:{
                    position: 'absolute',
                    backgroundColor:'#e9ecef',
                    width: '35%',
                    borderRadius: '.25rem',
                    height: '10%',
                    borderBottom: '1px solid #00000033',
                    left: '60%',
                    top: 'calc(25% + (20% / 3))'
                },
                online:{
                    position: 'absolute',
                    backgroundColor:'#e9ecef',
                    width: '35%',
                    height: '10%',
                    borderBottom: '1px solid #00000033',
                    borderRadius: '.25rem',
                    left: '60%',
                    top: 'calc(15% + (10% / 3))'
                },
                container:{
                    float: 'left',
                    width:'35%', 
                    height: '400px',
                    color: '#495057',
                    fontSize : '16px',
                    transition:'.2s',
                    top:'20px',
                    backgroundColor: 'rgb(236, 253, 236)',
                    boxShadow: '0 0 15px gray',
                },
                status:{
                    position: 'absolute',
                    backgroundColor:'#e9ecef',
                    width: '90%',
                    borderBottom: '1px solid #00000033',
                    borderRadius: '.25rem',
                    fontSize: '17px',
                    overflow: 'hidden',
                    height: '35%',
                    left: '5%',
                    top: '60%'
                }
            },
            section:{
                
            },
            h1:{
                marginBottom:'50px',
                color : 'rgb(255, 94, 94)'
            },
            formColl:{
                width:'57.5%',
                marginLeft: '37.5%',
                marginTop: '20px',
                backgroundColor:'rgb(236, 253, 236)',
                boxShadow: '0 0 15px grey',
                padding: '30px'
            },
            formPage:{
                width:'57.5%',
                marginLeft: '37.5%',
                marginTop: '20px',
                minHeight: '500px',
                backgroundColor:'rgb(236, 253, 236)',
                boxShadow: '0 0 15px grey',
                padding: '30px'
            },
            formItem:{
                width:'57.5%',
                marginLeft: '37.5%',
                marginTop: '20px',
                backgroundColor:'rgb(236, 253, 236)',
                boxShadow: '0 0 15px grey',
                padding: '30px'
            },
            container:{
                width:'100%',
                boxSizing: 'content-box',
                backgroundColor: 'white',
                padding: '30px',
                margin: '30px auto',
                minHeight: '500px',
                boxShadow :  '0 0 15px #aaa'
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
            comment:{},
            description:{
                width: '100%',
                resize:'none'
            },
            hr:{
                backgroundColor: '#2223',
                margin: '40px 0px 40px',
                border: '0px',
                marginLeft: '0%',
                width: '100%',
                height: '1px',
            },
            additional:{
                width:'90%',
                margin: '30px 5% 0px'
            },
        }
    }
componentWillMount(){
    this.interval = setInterval(()=>{
        socket.emit('get-collections',{email : global.__user.email})
        socket.on('get-collections', r=>{
            let arr = r.data
            this.setState({collections : arr},()=>{})
        })
    },1000)
}
componentWillUnmount(){
    clearInterval(this.interval)
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
        console.log(r)
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
render(){
    return (
         <div style={this.style.container}>
             <ProfileBox data={this.profileData} style={this.style.profile} />
             <Route exact path="/profile/addc" >
             <section style={this.style.section} className="addCollectSect">
                <form onSubmit={this.subFormColl} style={this.style.formColl}>
                    <Link style={{float:'right'}} to="/profile">Back</Link>
                    <h1 style={this.style.h1}>Add new Collection</h1>
                    <Text name="col_name" required nm="Name of collection*" />
                    <TextareaPage2 name="col_descript" required style={this.style.description} nm="Description*" />
                    <TextareaPage2 name="col_comment" style={this.style.description} nm="Author comment" />
                    <span style={{display:'inline-block',textAlign:'center',width:'50%'}}>Choose collection type</span><span style={{display:'inline-block',textAlign:'center',width:'50%'}}>And add image for collection</span>
                    <DropboxInput name="col_type" disabled arr={['Brodiags','Alcohol','Cats','Weapon','Motos']}  named='Collection type' style={this.style.dropboxinp} />
                    <File name="col_img" style={this.style.file} />
                    <DropdownBtn name="col_adds" color="" style={{backgroundColor:'rgb(255, 94, 94)'}}/>
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
                    <Text nm="Add teg" />   <div name="МАССИВ ТЕГОВ"></div>   
                    <span style={{display:'inline-block',textAlign:'center',width:'50%'}}>Choose collection</span><span style={{display:'inline-block',textAlign:'center',width:'50%'}}>And add image for item</span>
                    <DropboxInput disabled arr={['Dobermans','Dvorniags']} named='Collection' style={this.style.dropboxinp} />
                    <File style={this.style.file} />
                    <hr style={this.style.hr}/>
                    <MDBBtn style={this.style.submit} type="submit">OK</MDBBtn>
                </form>
             </section>
            </Route>
            <Route exact path="/profile" >
            <section style={this.style.section} className="sectionsPage">
                <form style={this.style.formPage}>
                    <Link style={{float:'right'}} to="/profile/addc">Add collection</Link><br/>
                    <Link style={{float:'right'}}to="/profile/addi">Add item</Link>
                    <h1 style={this.style.h1}>Collections page</h1>
                    <div className="collectionsBox">
                        {this.state.collections.map((v,i)=>{
                            return (<Collection data={this.state.collections[i]} />)
                        })}
                    </div>
                </form>
             </section>
            </Route>
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
                overflow:'hidden'
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
                            <div style={this.style.collect.desc}><span>{this.props.data.descript}</span></div>   
                            <div className="btn"style={this.style.collect.open}><span>Open</span></div>  
                        </div> 
                    </div>
                    )
                }
}
export default ItemCreator;