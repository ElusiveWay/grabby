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
    return (
        <div style={{backgroundColor:'white',boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)'}}  id="carouselExampleIndicators" className="mycarysel carousel slide" data-ride="carousel">
            <style dangerouslySetInnerHTML={{__html: `
                        .darkMode .mycarysel{
                            filter: invert(1) grayscale(1);
                        }
                        .mainCollCarus{
                            font-size:1rem;
                            height:14rem;
                        }
                        .bg-control.third{
                            background-image:url(${colls.length>2?colls[2].img:''});
                        }
                        .bg-control.second{
                            background-image:url(${colls.length>1?colls[1].img:''});
                        }
                        .bg-control.first{
                            background-image:url(${colls.length>0?colls[0].img:''});
                        }
                        .bg-control{
                            z-index:0;
                            position:absolute;
                            width:100%;
                            height:100%;
                            top:0;
                            left:0;
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            filter: blur(5px);
                        }
                        .ash2-cont{
                            display:flex;
                            float:right;
                            flex-direction:column;
                            align-items: end;
                        }
                        .ash-cont{
                            display:flex;
                            float:left;
                            text-align:left;
                            flex-direction:column;
                            align-items: start;
                        }
                        .ash{
                            display: flex;
                            height: 10em;
                            justify-content: space-between;
                            align-items: center;
                        }
                        @media screen and (max-width: 1020px){
                            .ash{
                                height: 14em;
                            }
                        }
                        @media screen and (max-width: 769px){
                            .ash-cont,
                            .ash2-cont{
                                align-items: center;
                                text-align:center;
                            }
                            .ash{
                                flex-direction:column;
                                height: 16.5em;
                                overflow: hidden;
                            }
                        }
                        `}}/>
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
            {colls.length === 0 && <div className="carousel-item active">
                                        <div style={{width:'100%',height:'350px'}}>
                                            <h2 style={{textAlign:'center',position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}>There are no collections on the site</h2>
                                        </div>
                                </div>}
            {colls.length > 0 && <div className="carousel-item active">
                    <div className="bg-control first"></div>
                    <div style={{backgroundColor:'#fff8',border:'2px solid white',padding:'5px',overflow:'hidden',paddingBottom:'1rem',color:'#000',textAlign:'center',fontSize:'10px',transform:'translateX(0px) scale(0.95)',float:'right',width:'100%'}}>
                        <div className="ash">
                            <div className="ash-cont">
                                <Link to={`/collections/${colls[0]._id}`}><h2 style={{color:'black',position:'relative',marginTop:'20px',float:'left'}}>Top 1 collection: {colls[0].name}</h2></Link>
                                <h4 style={{top:'5px',position:'relative',clear:'left',float:'left'}}>Author: <Link style={{color:'#000'}} to={`/users/${JSON.parse(colls[0].author)._id}`}>{JSON.parse(colls[0].author).name}</Link> </h4>
                            </div>
                            <div className="ash2-cont">
                                <h4 style={{position:'relative',marginTop:'20px',clear:'right',float:'right'}}>Items : {global.__mainData.items.map(v=>v).filter(v=>(v.collect == colls[0].name && v.email == colls[0].email)).length}</h4>
                                <h4 style={{position:'relative',clear:'right',float:'right'}}>Likes : {global.__mainData.items.map(v=>v).filter(v=>(v.collect == colls[0].name && v.email == colls[0].email)).reduce((t,c,i)=>(c.likes)?t+=JSON.parse(c.likes).length:t,0)} </h4>
                            </div>
                        </div>
                        <hr style={{position:'relative',top:'5px',bottom:'5px',clear:'both'}}/>
                        <div className="mainCollCarus" >{colls[0].descript.substring(0,900)+'...'}</div>
                    </div>
                </div>}
                {colls.length > 1 && <div className="carousel-item">
                    <div className="bg-control second"></div>
                    <div style={{backgroundColor:'#fff8',border:'2px solid white',padding:'5px',overflow:'hidden',paddingBottom:'1rem',color:'#000',textAlign:'center',fontSize:'10px',transform:'translateX(0px) scale(0.95)',float:'right',width:'100%'}}>
                        <div className="ash">
                            <div className="ash-cont">
                                <Link to={`/collections/${colls[1]._id}`}><h2 style={{color:'black',position:'relative',marginTop:'20px',float:'left'}}>Top 2 collection: {colls[1].name}</h2></Link>
                                <h4 style={{top:'5px',position:'relative',clear:'left',float:'left'}}>Author: <Link style={{color:'#000'}} to={`/users/${JSON.parse(colls[1].author)._id}`}>{JSON.parse(colls[1].author).name}</Link> </h4>
                            </div>
                            <div className="ash2-cont">
                                <h4 style={{position:'relative',marginTop:'20px',clear:'right',float:'right'}}>Items : {global.__mainData.items.map(v=>v).filter(v=>(v.collect == colls[1].name && v.email == colls[1].email)).length}</h4>
                                <h4 style={{position:'relative',clear:'right',float:'right'}}>Likes : {global.__mainData.items.map(v=>v).filter(v=>(v.collect == colls[1].name && v.email == colls[1].email)).reduce((t,c,i)=>(c.likes)?t+=JSON.parse(c.likes).length:t,0)} </h4>
                            </div>
                        </div>
                        <hr style={{position:'relative',top:'5px',bottom:'5px',clear:'both'}}/>
                        <div className="mainCollCarus" >{colls[1].descript.substring(0,900)+'...'}</div>
                    </div>
                </div>}
                {colls.length > 2 && <div className="carousel-item">
                    <div className="bg-control third"></div>
                    <div style={{backgroundColor:'#fff8',border:'2px solid white',padding:'5px',overflow:'hidden',paddingBottom:'1rem',color:'#000',textAlign:'center',fontSize:'10px',transform:'translateX(0px) scale(0.95)',float:'right',width:'100%'}}>
                        <div className="ash">
                            <div className="ash-cont">
                                <Link to={`/collections/${colls[2]._id}`}><h2 style={{color:'black',position:'relative',marginTop:'20px',float:'left'}}>Top 3 collection: {colls[2].name}</h2></Link>
                                <h4 style={{top:'5px',position:'relative',clear:'left',float:'left'}}>Author: <Link style={{color:'#000'}} to={`/users/${JSON.parse(colls[2].author)._id}`}>{JSON.parse(colls[2].author).name}</Link> </h4>
                            </div>
                            <div className="ash2-cont">
                                <h4 style={{position:'relative',marginTop:'20px',clear:'right',float:'right'}}>Items : {global.__mainData.items.map(v=>v).filter(v=>(v.collect == colls[2].name && v.email == colls[2].email)).length}</h4>
                                <h4 style={{position:'relative',clear:'right',float:'right'}}>Likes : {global.__mainData.items.map(v=>v).filter(v=>(v.collect == colls[2].name && v.email == colls[2].email)).reduce((t,c,i)=>(c.likes)?t+=JSON.parse(c.likes).length:t,0)} </h4>
                            </div>
                        </div>
                        <hr style={{position:'relative',top:'5px',bottom:'5px',clear:'both'}}/>
                        <div className="mainCollCarus" >{colls[2].descript.substring(0,900)+'...'}</div>
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