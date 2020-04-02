import React from 'react'
import {Link} from 'react-router-dom'

class Collection extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        
             return ( 
                 
                <Link style={{color:'black'}} to={`/collections/${this.props.data2}`}><div className="cardOfCollections card mb-3" style={{cursor:'pointer',height:'100%',width: "100%"}}>
                        <style dangerouslySetInnerHTML={{__html: `
                        .cardOfCollections.card{
                            margin:0 !important;
                        }
                        .cardOfCollections{
                            justifyContent:center;
                            display:flex;
                            transition: .3s;
                            margin:0;
                        }
                        .cardOfCollections:hover{
                            box-shadow: 0 0 15px #3d495a;
                        }
                        .card .card-body.newrevis{
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            box-sizing: border-box;
                            transform: scale(0.95);
                            background-color: #fff8;
                            z-index: 1;
                            border: 2px solid white;
                        }
                        .card .card-body p.card-text{
                            color:black;
                        }
                        .myCollll2{
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
                        `}}/>
                        <img src='' onError={()=>window.scrollTo(0,0)}/>
                        <div className="omegaCard myRoww row no-gutters">
                            <div  style={{position:'absolute',top:'0',left:'0',width:'100%',height:'100%',backgroundSize:'cover',filter:'blur(5px)',backgroundPosition:'center center',backgroundImage: `url(${this.props.data.img})`}}></div>
                            <div className="card-body newrevis">
                                <h5 className="card-title">{this.props.data.name}</h5>
                                <p className="card-text">{(this.props.data.descript.length > 470)?this.props.data.descript.slice(0,470)+'...':this.props.data.descript}</p>
                                <p className="card-text"><small className="text-muted">{this.props.data.type}</small></p>
                            </div>
                        </div>
                    </div>
                    </Link>
                    )
                }
}
export default Collection