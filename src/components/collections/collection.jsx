import React, {Component} from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import io from 'socket.io-client'
const socket = io()

class Collection extends Component {
    constructor(props){
      super(props)
      this.state = {
        liked : true
      }
      this.likeHandler = this.likeHandler.bind(this)
    }
    width = "100%"
    style = {
        description:{
            maxHeight: '12em',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
        container :{
             width: this.width,
             margin: '20px 0px'
        },
        image :{
            minHeight: (this.props.bg===undefined)?'200px':'unset',
            width: (this.props.bg===undefined)?'unset':'100%'
        }
    }
    likeHandler(){
        if (Object.keys(global.__user).length == 0) return
        if (JSON.parse(this.props.likes).some((v)=>v==(global.__user.email))){
            socket.emit('remove-like',global.__user.email)
        }
        else{
            socket.emit('add-like',global.__user.email)
        }
        socket.on('like', r=>console.log(r))  
    } 
    render(){
        return (
            <div style={{display:'flex'}}>
            <MDBCard style={this.style.container}>
                <div style={{position:'relative'}}>
                    <span style={{display:(this.props.bg===undefined)?'unset':'none',color:'#747373',textAlign:'center',top: '50%', left: '50%',transform: 'translate(-50%,-50%)',fontSize:'30px',position:'absolute'}}>There is no image</span>
                    <MDBCardImage style={this.style.image} src={this.props.bg} className="img-fluid" waves />
                </div>
                <MDBCardBody>
                <MDBCardTitle>{this.props.name}</MDBCardTitle>
                <MDBCardText style={this.style.description}>
                    {this.props.description}
                </MDBCardText>
                <MDBBtn style={{padding: '0.84rem 1.44rem'}}>Open</MDBBtn>
                <MDBBtn onClick={this.likeHandler} style={{
                    backgroundColor: 'rgba(255, 160, 160, 1)',
                    padding: '0.84rem 1rem',
                    float: 'right',
                    color: 'white'
            
                }} color=""><i className={(this.props.likes)?"fas fa-heart":"far fa-heart"}></i> Likes :<span className="likes">{JSON.parse(this.props.likes).length}</span></MDBBtn>
                </MDBCardBody>
            </MDBCard> 
            </div>
        )
    }
}

export default Collection