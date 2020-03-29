import React, {Component, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

const TegCloud = (props) => {
    let [tegs, setTegs] = useState([])
    useEffect(()=>{
        let int = setInterval(()=>{
            setTegs((global.__mainData)?global.__mainData.items.map(v=>JSON.parse(v.tags)).reduce((t,c)=>t.concat(c)).filter((v,i,a)=>a.indexOf(v)===i):[])
        },50)
        return ()=>clearInterval(int)
    })
    const clicker = (e) => {
        let teg = e.target.innerText
        global.__modalok = <div>
                              <h3 style={{marginBottom:'20px'}}>Items with teg : #<i>{teg}</i></h3>
                              <ul>
                                {global.__mainData.items.filter(v=>JSON.parse(v.tags).some(q=>q==teg)).map(v=><Link  onClick={(e)=>{e.stopPropagation();global.document.querySelectorAll('.activeSearchList').forEach(v=>v.classList.remove('activeSearchList'));e.target.classList.add('activeSearchList')}} to={`/items/${v._id}`}><li><h5>{v.name}</h5></li></Link>)}
                              </ul>
                              
                           </div>
    }
    return (
        <div style={{width:'calc(100% - 6vw)',marginTop:'10px',marginLeft:'3vw'}}>
            <style dangerouslySetInnerHTML={{__html: `
                    .teg { 
                        background: #7ab0b4; 
                        width: auto;
                        border-radius:24px;
                        height: 24px;
                        text-align:center;
                        display:inline-block;
                        padding:4px;
                        box-sizing: content-box;
                        line-height:1.3;
                        margin:2px;
                        transition:0.3s;
                        color:white;
                    }
                    .teg:before{
                        content:'#'
                    }
                    .teg::selection{
                        background-color: transparent;
                    }
                    .teg:hover{
                        cursor:pointer;
                        color:white;
                        box-shadow: 0 0 5px #00000099;
                    }   
                    `}}/>
            {tegs.length>0 && 'Popular tegs : '}{tegs.map(v=><div data-target="#collPageModal" data-toggle="modal" onClick={clicker} className="teg">{v}</div>)}
        </div>
    )
}

export default TegCloud