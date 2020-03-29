import React from 'react'
import {Link} from 'react-router-dom'

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
                transform: this.props.transform || 'unset',
                borderRadius: '10px',
                backgroundColor:'transparent',
                color: '#000231'
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
                backgroundColor:'#f8f9fa',
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
                backgroundColor:'#f8f9fa',
                justifyContent: 'center',
                alignItems:'center',
                cursor: 'pointer',
                color: 'rgb(135, 134, 197)',
                fontWeight: '600'
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
                backgroundColor:'#f8f9fa',
                justifyContent: 'center',
                alignItems: 'space-around',
                overflow:'hidden',
                color:'transparent'
            },
        },
    }
    
    render(){
        
             return ( 
                 
                <Link style={{color:'black'}} to={`/collections/${this.props.data2}`}><div className="cardOfCollections card mb-3" style={{cursor:'pointer',height:'17.5vw',width: "100%"}}>
                        <style dangerouslySetInnerHTML={{__html: `
                        .cardOfCollections{
                            justifyContent:center;
                            display:flex;
                            transition: .3s;
                            margin-top:20px;
                        }
                        .cardOfCollections:hover{
                            box-shadow: 0 0 15px #3d495a;
                        }
                        .myCollll{
                            display: flex;
                            justify-content: center;
                            height:17.5vw;
                            align-items: center;
                        }
                        @media all and (min-width:768px){
                            .myRoww{
                                flex:1;
                            }
                        }
                        .omegaCard div.card .card-body .card-text{
                            font-size:1.08vw;
                        }
                        `}}/>
                        <img src='' onError={()=>window.scrollTo(0,0)}/>
                        <div className="omegaCard myRoww row no-gutters">
                            {this.props.iterator%2==0 && <div className="col-md-4" style={{display:`${(this.props.data.img=='')?'none':'block'}`,backgroundSize:'cover',backgroundPosition:'center center',backgroundImage: `url(${this.props.data.img})`}}></div>}
                            <div className="myCollll col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{this.props.data.name}</h5>
                                <p className="card-text">{(this.props.data.descript.length > 470)?this.props.data.descript.slice(0,470)+'...':this.props.data.descript}</p>
                                <p className="card-text"><small className="text-muted">{this.props.data.type}</small></p>
                            </div>
                            </div>
                            {this.props.iterator%2==1 && <div className="col-md-4" style={{display:`${(this.props.data.img=='')?'none':'block'}`,backgroundSize:'cover',backgroundPosition:'center center',backgroundImage: `url(${this.props.data.img})`}}></div>}
                        </div>
                    </div>
                    </Link>
                    )
                }
}
export default Collection