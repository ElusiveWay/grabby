import React,{Component, useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import useStateWithCallback from 'use-state-with-callback'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import ModalOk from './modalok'
import ProfileBox from './profilebox'
import {Link} from 'react-router-dom'

const AmazingTable = (props) => {
    let [modalInner, setModal] = useStateWithCallback(<div>Loading...</div>, ()=>{global.__modalok = modalInner})
    let [contStyle, setContStyle] = useState({})
    let [colItems, setCol] = useState([])
    let [adds, setAdds] = useState([])
    let id = (props.id instanceof Array)?props.id:[props.id]
    useEffect(() => {
        //
        const interval = setInterval(() => {
                setContStyle((global.document && global.document.querySelectorAll('.__cont_ainer_').length!==0)?window.getComputedStyle(global.document.querySelector('.__cont_ainer_')):{})
                setCol((global.__mainData)?global.__mainData.collections.filter(k=>id.some(o=>o==k._id)):[])
                setAdds((colItems)?colItems.map(v=>JSON.parse(v.adds)):[])
        }, 50);
    
        return () => clearInterval(interval);
      });

    const makeModal = (e,str,type,data={}) => {
        if (type == 'comments'){
        setModal(
            <div class="modalInnerator">
                <h2>Comments:</h2>
                {JSON.parse(str).map(v=>{
                        return (<div><h4 style={{color:'#49586c'}}>{v.likerName}:</h4>
                                    <p>{v.tex}</p>
                                </div>
                            )
                })}
            </div>
            )
        }
        if (type == 'tags'){
        setModal(
            <div class="modalInnerator">
                <h2>Full list of tags:</h2>
                {JSON.parse(str).map(v=>{
                        return (<div><h4 className="tagpre"style={{color:'#49586c'}}>{v}</h4></div>
                            )
                })}
            </div>
            )
        }
        if (type == 'adds'){
        setModal(
            <div class="modalInnerator">
                <h2>List of additional properties:</h2>
                {JSON.parse(str).map((v,i)=>{
                        let coll = global.__mainData.collections.filter(f=>(f.name==data.collect && f.email == data.email))[0]
                        return (<div><h4 style={{color:'#49586c'}}>{JSON.parse(coll.adds)[i][Object.keys(JSON.parse(coll.adds)[i])[0]]+' = '+v.value}</h4></div>
                            )
                })}
            </div>
            )
        }
        if (type == 'desc'){
        setModal(
            <div class="modalInnerator">
                <h2>Full description:</h2>
                <p>{str}</p>
            </div>
            )
        }
        if (type == 'img'){
        setModal(
            <div class="modalInnerator">
                <h2>Full url:</h2>
                <p>{str}</p>
                <img style={{width:'100%'}}src={str} alt="image"/>
            </div>
            )
        }
    }
    const parseBeauty = (str,type,data={},dataItaration=0) => {
        switch (type){
            case 'likes': return <span>{JSON.parse(str).length}</span>
            case 'comments': return <span data-target="#collPageModal" data-toggle="modal" onClick={(e)=>makeModal(e,str,type)} className="linkToUser">Click to show</span>
            case 'tags': return <span data-target="#collPageModal" data-toggle="modal" onClick={(e)=>makeModal(e,str,type)} className="linkToUser" >{JSON.parse(str).join(', ')}</span>
            case 'desc': return <span  data-target="#collPageModal" data-toggle="modal" onClick={(e)=>makeModal(e,str,type)} className="linkToUser" >{str}</span>
            case 'adds': return <span data-target="#collPageModal" data-toggle="modal" onClick={(e)=>makeModal(e,str,type,data)} className="linkToUser" >{adds.length!==0 && (adds[dataItaration].length !== 0)?(adds[dataItaration].every(v=>v!==''))?'Click to open':'':''}</span>
            case 'img': return <span data-target="#collPageModal" data-toggle="modal" onClick={(e)=>makeModal(e,str,type,data)} className="linkToUser" >{str.split('/').pop()}</span>
            default: return 'field is not defined'
        }
    }
    return colItems.length!==0 && (global.__mainData.items.map(v=>v).filter(f=>(f.collect==colItems[0].name && f.email==colItems[0].email)).length!==0)?(<div>
        <div style={{width:'100%',overflowX:'scroll'}} className="table-responsive">
        <style dangerouslySetInnerHTML={{__html: `
                .tagpre:before{
                    content:'#';
                }
                .modalInnerator{
                    word-wrap:break-word;
                }
                .__ima_ge__{
                    display:block;
                    float: left;
                    margin: 3vw 3vw 1vw  3vw;
                    width: 40%;
                    height: auto;
                    background-color: #eee;
                }
                .linkToUser:hover{
                    color: #b47a93 !important;
                }
                .linkToUser{
                    color:black;
                    transition:.2s;
                    cursor:pointer;
                }
                table.table th, table.table td{
                    font-size:15px;
                    overflow: hidden;
                    max-width:500px;
                    text-overflow:ellipsis;
                    white-space:pre;
                }
                table.table th:first-child, table.table td:first-child{
                    position:absolute !important;
                    border-right:1px solid #dee2e6;
                    background: ${props.color || 'white'};
                    width:190px;
                }
                table.table tbody tr:nth-child(odd) th:first-child, table.table tbody tr:nth-child(odd) td:first-child{
                    background: #f2f2f2;
                }
                table.table th:nth-child(2):before, table.table td:nth-child(2):before{
                    content:'';
                    display:inline-block;
                    width:190px;
                    height:100%;
                }
            `}}/>
        <table style={{fontSize:`calc(${contStyle} / 10) !important`,width: 'calc(100%)'}} class="itemsTable table table-striped">
            <thead> 
                <tr>
                <th>{ global.__user.email==colItems[0].email && <input style={{marginRight:'5px'}} type="checkbox" name='checkAllItems'/> }Title</th>
                <th>Description</th>
                <th>Image url</th>
                <th>Properties</th>
                <th>Likes</th>
                <th>Tags</th>
                <th>Comments</th>
                </tr>
            </thead>
            <tbody>
                { colItems.length!==0 &&
                colItems.map((colItem,ci)=>{
                   return global.__mainData.items.map(v=>v).filter(f=>(f.collect==colItem.name && f.email==colItem.email)).map((k,i)=>{
                    return  <tr>
                                <td>{global.__user.email==colItem.email && <input style={{marginRight:'5px'}} type="checkbox" name={`itemCheck${i}`}/>}<Link className="linkToUser" to={`/items/${k._id}`}>{k.name}</Link></td>
                                <td>{(k.description)?parseBeauty(k.description,'desc'):''}</td>
                                <td>{(k.img)?parseBeauty(k.img,'img'):'No image'}</td>
                                <td>{(k.add)?parseBeauty(k.add,'adds',k,ci):'No additional fields'}</td>
                                <td>{(k.likes)?parseBeauty(k.likes,'likes'):'0'}</td>
                                <td>{(k.tags)?parseBeauty(k.tags,'tags'):'No tags'}</td>
                                <td>{(k.comments)?(JSON.parse(k.comments).length!==0)?parseBeauty(k.comments,'comments'):'No comments':'No comments'}</td>
                            </tr>
                    })
                })
                }
            </tbody>
        </table>
        </div>
        </div>):<h2>Collection(s) have no elements!</h2>
}

export default AmazingTable