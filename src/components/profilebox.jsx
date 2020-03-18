import React,{Component} from 'react'
import ReactDOM from 'react-dom'

class ProfileBox extends Component {
    constructor(props){
        super(props)
    }
    componentWillUnmount(){
      clearInterval(this.inter)  
    }
    componentDidMount(){
        this.inter = setInterval(()=>this.updatera(), 20)
    }
    updatera(){
        if (window.scrollY > 88 && ReactDOM.findDOMNode(this).style.position !== 'fixed'){
            ReactDOM.findDOMNode(this).style.position = 'fixed'
        }
        else{
            if (window.scrollY <= 88 && ReactDOM.findDOMNode(this).style.position !== 'relative'){
                ReactDOM.findDOMNode(this).style.position = 'relative'
            }
        }
    }


    style = {
            span : {
                    position:'absolute',
                    left:'50%',
                    width: '90%',
                    top:'50%',
                    lineHeight: '32px',
                    overflow: 'hidden',
                    textAlign:'right',
                    transform:'translate(-50%,-50%)'
                    },
            profile:{
                        photo:{
                            position: 'absolute',
                            backgroundColor:'#e9ecef',
                            backgroundSize: 'cover',
                            borderRadius: '50%',
                            backgroundPosition: 'center',
                            width: '200px',
                            borderBottom: '1px solid #00000033',
                            height: '200px',
                            top: '5%',
                            left: '5%',
                            backgroundImage : `url(${this.props.data.photo})`
                        },
                        likes:{
                            position: 'absolute',
                            width: '35%',
                            borderBottom: '1px solid #00000033',
                            height: '10%',
                            left: '60%',
                            top: 'calc(35% + (30% / 3))'
                        },
                        name:{
                            position: 'absolute',
                            width: '35%',
                            borderBottom: '1px solid #00000033',
                            height: '10%',
                            left: '60%',
                            top: '5%'
                        },
                        views:{
                            position: 'absolute',
                            width: '35%',
                            height: '10%',
                            borderBottom: '1px solid #00000033',
                            left: '60%',
                            top: 'calc(25% + (20% / 3))'
                        },
                        online:{
                            position: 'absolute',
                            width: '35%',
                            height: '10%',
                            borderBottom: '1px solid #00000033',
                            left: '60%',
                            top: 'calc(15% + (10% / 3))'
                        },
                        container:{
                            float: 'left',
                            width:'30%', 
                            height: '400px',
                            color: '#495057',
                            position: 'relative',
                            fontSize : '16px',
                            transition:'.2s',
                            top:'20px'
                        },
                        status:{
                            position: 'absolute',
                            width: '90%',
                            borderBottom: '1px solid #00000033',
                            fontSize: '17px',
                            overflow: 'hidden',
                            textAlign: 'center',
                            height: '35%',
                            left: '5%',
                            top: '60%'
                        }
            },
        
    }
    render(){
        return (
            <div style={this.style.profile.container}>
                <div style={this.style.profile.photo} className="profile-photo"></div>
                <div style={this.style.profile.likes} className="profile-likes"><span style={this.style.span}>{this.props.data.likes}</span></div>
                <div style={this.style.profile.name} className="profile-name"><span style={this.style.span}>{this.props.data.name}</span></div>
                <div style={this.style.profile.online} className="profile-online"><span style={this.style.span}><b style={{color:'green',fontWeight:'600'}}>{this.props.data.online}</b></span></div>
                <div style={this.style.profile.views} className="profile-views"><span style={this.style.span}>{this.props.data.views}</span></div>
                <div style={this.style.profile.status} className="profile-status"><span style={this.style.span}><i style={{color:'rgb(220, 53, 69)',fontWeight:'900'}}>{this.props.data.status}</i></span></div>
            </div>
        )
    }
}

export default ProfileBox