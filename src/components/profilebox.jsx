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


  
    render(){
        return (
            <div className="prof_ile__contain" >
                <style dangerouslySetInnerHTML={{__html:`
                .profile-photo{
                    margin:  0 auto;
                    background-color:#e9ecef;
                    background-size: cover;
                    border-radius: 50%;
                    background-position: center;
                    background-image : url(${(this.state!==undefined && this.state.data!==undefined)?this.state.data.photo:'http://placehold.it/450x320?text=No+image+yet'});
                    width: 200px;
                    border-bottom: 1px solid #00000033;
                    height: 200px;
                }
                .prof_ile__contain{
                    float: left;
                    width:300px;
                    color: black;
                    position: fixed;
                    font-size : 16px;
                    transition: 0.3s;
                    margin-top:50px;
                    top:50px;
                    display:flex;
                    flex-wrap:wrap;
                    align-items: stretch;
                    justify-content:space-between;
                }
                .profile-textElem{
                    margin-bottom: 1em;
                    border-bottom: 1px solid #00000033;
                }
                .profile-textTable{
                    margin:auto;
                    max-width:250px;
                    min-width:150px;
                    width: 90%;
                    padding:0 1em;
                    flex:1;
                    text-align: center;
                    justify-content: center;
                    height: 200px;
                    display:flex;
                    flex-direction:column;
                    
                }
                .profile-span{
                    left:50%;
                    width: 90%;
                    top:50%;
                    line-height: 32px;
                    overflow: hidden;
                    text-align:right;
                    transform:translate(-50%,-50%);
                    word-wrap:break-word;
                    overflow:hidden;
                    white-space: pre;
                    text-overflow: ellipsis;
                }
                .profile-status{
                    width:100%;
                    text-align: center;
                    color:rgb(135, 134, 197);
                    font-weight:900;
                    max-width: 250px;
                    margin:auto;
                }
                `}}/>
                <div className="profile-photo"></div>
                <div className="profile-textTable">
                    <div className="profile-textElem profile-name"><span>{(this.state.data)?this.state.data.name:''}</span></div>
                    <div className="profile-textElem profile-likes"><span >{(this.state.data)?this.state.data.likes:''}</span></div>
                    <div className="profile-textElem profile-online"><span >{(this.state.data)?this.state.data.online:''}</span></div>
                    <div className="profile-textElem profile-views"><span >{(this.state.data)?this.state.data.views:''}</span></div>
                </div>
                <div  className="profile-status"><i>{(this.state.data)?this.state.data.status:''}</i></div>
            </div>
        )
    }
}

export default ProfileBox