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
                ReactDOM.findDOMNode(this).style.top = '30px'
            }
            else{
                if (window.scrollY <= 108 && ReactDOM.findDOMNode(this).style.position !== 'relative'){
                    ReactDOM.findDOMNode(this).style.position = 'relative'
                    ReactDOM.findDOMNode(this).style.top = '20px'
                }
            }
        },50)
    }
    render(){
        return (
            <div style={this.props.style.container}>
                <div style={this.props.style.photo} className="profile-photo"></div>
                <div style={this.props.style.likes} className="profile-likes">{this.props.data.likes}</div>
                <div style={this.props.style.name} className="profile-name">{this.props.data.name}</div>
                <div style={this.props.style.online} className="profile-online">{this.props.data.online}</div>
                <div style={this.props.style.views} className="profile-views">{this.props.data.views}</div>
                <div style={this.props.style.status} className="profile-status">{this.props.data.status}</div>
            </div>
        )
    }
}

export default ProfileBox