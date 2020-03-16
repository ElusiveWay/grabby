import React,{Component} from 'react'
import ReactDOM from 'react-dom'

class ProfileBox extends Component {
    constructor(props){
        super(props)
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    componentDidMount(){
        this.interval = setInterval(()=>{
            if (window.scrollY > 108 && ReactDOM.findDOMNode(this).style.position !== 'fixed'){
                ReactDOM.findDOMNode(this).style.position = 'fixed'
            }
            else{
                if (window.scrollY <= 108 && ReactDOM.findDOMNode(this).style.position !== 'relative'){
                    ReactDOM.findDOMNode(this).style.position = 'relative'
                }
            }
        },20)
    }
    span = {
        position:'absolute',
        left:'50%',
        width: '90%',
        top:'50%',
        lineHeight: '32px',
        overflow: 'hidden',
        textAlign:'center',
        transform:'translate(-50%,-50%)'
    }
    render(){
        return (
            <div style={this.props.style.container}>
                <div style={this.props.style.photo} className="profile-photo"></div>
                <div style={this.props.style.likes} className="profile-likes"><span style={this.span}>{this.props.data.likes}</span></div>
                <div style={this.props.style.name} className="profile-name"><span style={this.span}>{this.props.data.name}</span></div>
                <div style={this.props.style.online} className="profile-online"><span style={this.span}><b style={{color:'green',fontWeight:'600'}}>{this.props.data.online}</b></span></div>
                <div style={this.props.style.views} className="profile-views"><span style={this.span}>{this.props.data.views}</span></div>
                <div style={this.props.style.status} className="profile-status"><i style={{color:'rgb(220, 53, 69)',fontWeight:'900'}}><span style={this.span}>{this.props.data.status}</span></i></div>
            </div>
        )
    }
}

export default ProfileBox