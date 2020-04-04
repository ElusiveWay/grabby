import React, {Component} from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBNavLink } from 'mdbreact';
import ReactDOM from 'react-dom'
import axios from 'axios'
import Message from '../peref/message'
import * as $ from 'jquery'
import { Link } from 'react-router-dom';


class Collection extends Component {
    constructor(props){
      super(props)
      this.state = {
        liked : true,
        iCanRequest : true
      }
      this.iCanChangeState = true
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
        if (Object.keys(global.__user).length == 0) {
            let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
            $('.message-cont').append('<div id='+id+'></div>')
            ReactDOM.render(<Message text1="Oops!" text2="Login first!" color="danger" id={id}/>, $('#'+id)[0])
            return
        }
        if (this.state.iCanRequest === true) {
            this.setState({iCanRequest : false},()=>{
                axios({
                    method: 'POST',
                    url: '/like',
                    data: {
                        likerId: global.__user._id,
                        liker: global.__user.email,
                        itemId: this.props.data._id
                    }
                    }).then(r=>{
                        ReactDOM.findDOMNode(this).getElementsByClassName('iconqa')[0].className = (r.data.some(v=>v==global.__user.email))?"fas fa-heart iconqa":"far fa-heart iconqa"
                        ReactDOM.findDOMNode(this).getElementsByClassName('__darova_v1_')[0].innerText = r.data.length
                        this.setState({iCanRequest : true})
                    }).catch(e=> this.setState({iCanRequest : true}))  
            })
        }
        
    } 
    render(){
        return (
            <div className="contOfItemMain" style={{display:'flex',width: '100%'}}>
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
                <Link to={`/items/${this.props.data._id}`}><MDBBtn style={{color:'white',backgroundColor:'#7ab0b4'}} color=''>Open</MDBBtn></Link>
                <MDBBtn onClick={()=>this.likeHandler()} style={{
                    backgroundColor: '#8786c5',
                    padding: '0.84rem 1rem',
                    float: 'right',
                    color: 'white'
            
                }} color=""><i className={(JSON.parse(this.props.likes).some(v=>v==global.__user.email))?"fas fa-heart iconqa":"far fa-heart iconqa"}></i><span style={{whiteSpace:'pre'}}> Likes : </span><span className="likes __darova_v1_">{JSON.parse(this.props.likes).length}</span></MDBBtn>
                </MDBCardBody>
            </MDBCard> 
            </div>
        )
    }
}

export default Collection