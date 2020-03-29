import React,{Component, useState,useEffect} from 'react'
import Collection from './CollectionElement'
import {Link} from 'react-router-dom'

const Carusel = () => {
    let [isLoaded, setLoaded] = useState(false)
    let [colls, setColls] = useState([])

    useEffect(()=>{
        let interval = setInterval(()=>{
            if (global.__mainData){
                setColls(global.__mainData.collections.map(v=>v).sort((a,b)=>{
                     if (global.__mainData.items.map(q=>q).filter(q=>(q.collect == a.name && q.email == a.email)).length > global.__mainData.items.map(q=>q).filter(q=>(q.collect == b.name && q.email == b.email)).length) return -1
                     if (global.__mainData.items.map(q=>q).filter(q=>(q.collect == a.name && q.email == a.email)).length < global.__mainData.items.map(q=>q).filter(q=>(q.collect == b.name && q.email == b.email)).length) return 1
                      return 0
                }))
            }
            if (isLoaded !== true && global.__mainData){
                setLoaded(true)
            }
        },50)
    return () => clearInterval(interval);
    })
    return (colls.length>0 &&
        <div style={{backgroundColor:'white',boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)'}}  id="carouselExampleIndicators" className="mycarysel carousel slide" data-ride="carousel">
            <style dangerouslySetInnerHTML={{__html: `
                        .mainCollCarus .cardOfCollections.card.mb-3 {
                            margin-bottom:0 !important;
                        }
                        .mainCollCarus *{
                            color: black !important;
                        }
                        .mainCollCarus .myRoww div:not(.myCollll){
                            transform: scale(0.9);
                        }
                        .mainCollCarus .card{
                            box-shadow:unset;
                        }
                        .mainCollCarus .card:hover{
                            box-shadow:unset;
                        }
                        .mainCollCarus .myRoww .card-body .card-text{
                            font-size: 1vw !important;
                        }
                        `}}/>
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div style={{color:'#000',textAlign:'center',fontSize:'10px',transform:'translateX(0px) scale(0.95)',float:'right',width:'100%'}}>
                        <h2 style={{color:'black',position:'relative',marginTop:'20px',float:'left'}}>Top 1 collection: {colls[0].name}</h2>
                        <h3 style={{position:'relative',marginTop:'20px',clear:'right',float:'right'}}>Items : {global.__mainData.items.map(v=>v).filter(v=>(v.collect == colls[0].name && v.email == colls[0].email)).length}</h3>
                        <h4 style={{top:'5px',position:'relative',clear:'left',float:'left'}}>Author: <Link style={{color:'#000'}} to={`/users/${JSON.parse(colls[0].author)._id}`}>{JSON.parse(colls[0].author).name}</Link> </h4>
                        <h3 style={{position:'relative',clear:'right',float:'right'}}>Likes : {global.__mainData.items.map(v=>v).filter(v=>(v.collect == colls[0].name && v.email == colls[0].email)).reduce((t,c,i)=>(c.likes)?t+=JSON.parse(c.likes).length:t,0)} </h3>
                        <hr style={{position:'relative',top:'15px',clear:'both'}}/>
                    </div>
                    <div className="caruselElem">
                        <div className="mainCollCarus" style={{transformOrigin:'center top',fontSize:'10px',transform:'translateX(0px) scale(1)',float:'right',width:'100%'}}>{isLoaded && <Collection data2={colls[0]._id} iterator={1} data={colls[0]} />}</div>
                    </div>
                </div>
                {colls.length > 1 && <div className="carousel-item">
                    <div style={{color:'#000',textAlign:'center',fontSize:'10px',transform:'translateX(0px) scale(0.95)',float:'right',width:'100%'}}>
                        <h2 style={{position:'relative',marginTop:'20px',float:'left'}}>Top 2 collection: {colls[1].name}</h2>
                        <h3 style={{position:'relative',marginTop:'20px',clear:'right',float:'right'}}>Items : {global.__mainData.items.map(v=>v).filter(v=>(v.collect == colls[1].name && v.email == colls[1].email)).length}</h3>
                        <h4 style={{top:'5px',position:'relative',clear:'left',float:'left'}}>Author: <Link style={{color:'#000'}} to={`/users/${JSON.parse(colls[1].author)._id}`}>{JSON.parse(colls[1].author).name}</Link> </h4>
                        <h3 style={{position:'relative',clear:'right',float:'right'}}>Likes : {global.__mainData.items.map(v=>v).filter(v=>(v.collect == colls[1].name && v.email == colls[1].email)).reduce((t,c,i)=>(c.likes)?t+=JSON.parse(c.likes).length:t,0)} </h3>
                        <hr style={{position:'relative',top:'15px',clear:'both'}}/>
                    </div>
                    <div className="caruselElem">
                        <div className="mainCollCarus" style={{transformOrigin:'center top',fontSize:'10px',transform:'translateX(0px) scale(1)',float:'right',width:'100%'}}>{isLoaded && <Collection data2={colls[1]._id} iterator={1} data={colls[1]} />}</div>
                    </div>
                </div>}
                {colls.length > 2 && <div className="carousel-item">
                    <div style={{color:'#000',textAlign:'center',fontSize:'10px',transform:'translateX(0px) scale(0.95)',float:'right',width:'100%'}}>
                        <h2 style={{position:'relative',marginTop:'20px',float:'left'}}>Top 3 collection: {colls[2].name}</h2>
                        <h3 style={{position:'relative',marginTop:'20px',clear:'right',float:'right'}}>Items : {global.__mainData.items.map(v=>v).filter(v=>(v.collect == colls[2].name && v.email == colls[2].email)).length}</h3>
                        <h4 style={{top:'5px',position:'relative',clear:'left',float:'left'}}>Author: <Link style={{color:'#000'}} to={`/users/${JSON.parse(colls[2].author)._id}`}>{JSON.parse(colls[2].author).name}</Link> </h4>
                        <h3 style={{position:'relative',clear:'right',float:'right'}}>Likes : {global.__mainData.items.map(v=>v).filter(v=>(v.collect == colls[2].name && v.email == colls[2].email)).reduce((t,c,i)=>(c.likes)?t+=JSON.parse(c.likes).length:t,0)} </h3>
                        <hr style={{position:'relative',top:'15px',clear:'both'}}/>
                    </div>
                    <div className="caruselElem">
                        <div className="mainCollCarus" style={{transformOrigin:'center top',fontSize:'10px',transform:'translateX(0px) scale(1)',float:'right',width:'100%'}}>{isLoaded && <Collection data2={colls[2]._id} iterator={1} data={colls[2]} />}</div>
                    </div>
                </div>}
            </div>
            <a style={{transform: 'rotate(180deg)translateX(80%)'}}className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-next-icon" aria-hidden="true"><i style={{color:'black'}}className="fas fa-angle-right"></i></span>
                <span className="sr-only">Next</span>
            </a>
            <a style={{transform: 'translateX(80%)'}}className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"><i style={{color:'black'}}className="fas fa-angle-right"></i></span>
                <span className="sr-only">Next</span>
            </a>
            </div>
    )
}

export default Carusel