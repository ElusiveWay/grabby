import React,{Component} from 'react'
import ReactDOM from 'react-dom'

class ProfileBox extends Component {
    constructor(props){
        super(props)
        this.state={
            data : this.props.data
        }
    }
    componentWillUnmount(){
      clearInterval(this.inter)  
      clearInterval(this.inter2)  
    }
    componentDidMount(){
        this.inter2 = setInterval(()=>{
            console.log(this.state!==undefined && this.state.data!==undefined)
            this.setState( {data : this.props.data})
    }, 50)
    }
    updatera(){
            ReactDOM.findDOMNode(this).style.marginTop = window.scrollY+'px'
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
                    transform:'translate(-50%,-50%)',
                    wordWrap:'break-word',
                    overflow:'hidden',
                    whiteSpace: 'pre',
                    textOverflow: 'ellipsis'
                    },
            span2 : {
                    position:'absolute',
                    left:'50%',
                    width: '90%',
                    top:'50%',
                    lineHeight: '32px',
                    overflow: 'hidden',
                    textAlign:'right',
                    transform:'translate(-50%,-50%)',
                    },
            profile:{
                        photo:{
                           
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
                            position: 'fixed',
                            fontSize : '16px',
                            transition: '0.3s',
                            marginTop:'50px',
                            marginLeft:'20px',
                            top:'50px'
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
                <style dangerouslySetInnerHTML={{__html:`
                .profile-photo{
                    position: absolute;
                    background-color:#e9ecef;
                    background-size: cover;
                    border-radius: 50%;
                    background-position: center;
                    background-image : url(${(this.state!==undefined && this.state.data!==undefined)?this.state.data.photo:'http://placehold.it/450x320?text=No+image+yet'});
                    width: 200px;
                    border-bottom: 1px solid #00000033;
                    height: 200px;
                    top: 5%;
                    left: 5%;
                }
                `}}/>
                <div className="profile-photo"></div>
                <div style={this.style.profile.likes} className="profile-likes"><span style={this.style.span}>{(this.state.data)?this.state.data.likes:''}</span></div>
                <div style={this.style.profile.name} className="profile-name"><span style={this.style.span}>{(this.state.data)?this.state.data.name:''}</span></div>
                <div style={this.style.profile.online} className="profile-online"><span style={this.style.span}>{(this.state.data)?this.state.data.online:''}</span></div>
                <div style={this.style.profile.views} className="profile-views"><span style={this.style.span}>{(this.state.data)?this.state.data.views:''}</span></div>
                <div style={this.style.profile.status} className="profile-status"><span style={this.style.span2}><i style={{color:'rgb(135, 134, 197)',fontWeight:'900'}}>{(this.state.data)?this.state.data.status:''}</i></span></div>
            </div>
        )
    }
}

export default ProfileBox