import React,{Component, useEffect, useState, useLayoutEffect} from 'react'
import { useParams } from "react-router-dom";
import useStateWithCallback from 'use-state-with-callback'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import Modal from './modal'
import ProfileBox from './profilebox'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Types from '../types'
import 'tablesorter'
import  * as $ from 'jquery'
import makeMessage from './peref/mess';
import LANG from '../lang'

const AmazingTable = (props) => {
    let [modalInner, setModal] = useStateWithCallback(<div>{LANG.loading[localStorage.getItem('lang')]}</div>, ()=>{global.__modalok = modalInner})
    let [contStyle, setContStyle] = useState({})
    let [colItems, setCol] = useState([])
    let [delItems, setDelItems] = useState({items:[]})
    let [adds, setAdds] = useState([])
    let [access, setAccess] = useState(false)
    let id = (props.id instanceof Array)?props.id:[props.id]
    const {user,owner} = props
    const changeCheckHandler = (e) =>{
        global.document.querySelectorAll(':not([style*="display: none"]) > td >[data-type="chosenItem"]').forEach(v=>v.checked = e.target.checked)
        updateDeleter()
    }
    const updateDeleter = () => {
        const chosen = Array.prototype.map.call(global.document.querySelectorAll('[data-type="chosenItem"]'),v=>v).filter(v=>{
            return (v.parentNode.parentNode.style.display !== 'none' && v.checked == true) 
        })
        setDelItems({items:chosen.map(v=>v.name)})
    }
    const filtrator = (e)=>{
        const filterKeyb = (that)=>($(that).text().toLowerCase().indexOf(value) > -1)
        const selector = (that)=>(global.document.getElementById('inlineFormCustomSelect').value == $(that)[0].dataset.type || global.document.getElementById('inlineFormCustomSelect').value == 'All types' || global.document.getElementById('inlineFormCustomSelect').value == 'Все типы')
        const tager = (that)=>($(that)[0].dataset.tags > 0 || $('#havetegcheckbox').prop('checked') == false)
        const commenter = (that)=>($(that)[0].dataset.comments > 0 || $('#havecommentscheckbox').prop('checked') == false)
        var value = $('[name="tablecontrol"]').val().toLowerCase()
        $(".tablesorter tr:not(.headerrowtable)").filter(function() {
          $(this).toggle(filterKeyb(this) && selector(this) && tager(this) && commenter(this))
        })
        updateDeleter()
    }
    useLayoutEffect(()=>{
        $('[name="checkAllItems"]').off('change')
        $('[name="checkAllItems"]').on('change', changeCheckHandler)
        $('[data-type="chosenItem"]').off('change')
        $('[data-type="chosenItem"]').on('change', updateDeleter)
        $(".tablesorter").tablesorter();
        if (global.document.querySelector('table.table th:nth-child(1)'))global.document.querySelector('table.table th:nth-child(1)').style.height = window.getComputedStyle(global.document.querySelector('table.table th:nth-child(2)')).height
        if ($('[data-type="chosenItem"]').length==0){
            $('[name=checkAllItems]').css('display','none')
        }
        else{
            $('[name=checkAllItems]').css('display','inline') 
        }
    })
    useEffect(() => {
        const interval = setInterval(() => {
                setContStyle((global.document && global.document.querySelectorAll('.__cont_ainer_').length!==0)?window.getComputedStyle(global.document.querySelector('.__cont_ainer_')):{})
                setCol((global.__mainData)?global.__mainData.collections.filter(k=>id.some(o=>o==k._id)):[])
                setAdds((colItems)?colItems.map(v=>JSON.parse(v.adds)):[])
                setAccess((user.isAdmin===true || user.email===owner.email))
        }, 50);
    
        return () => clearInterval(interval);
      },[user]);

    const makeModal = (e,str,type,data={}) => {
        if (type == 'comments'){
        setModal(
            <div className="modalInnerator">
                <h2>{LANG.comments[localStorage.getItem('lang')]}:</h2>
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
            <div className="modalInnerator">
                <h2>{LANG.taglist[localStorage.getItem('lang')]}:</h2>
                {JSON.parse(str).map(v=>{
                        return (<div><h4 className="tagpre"style={{color:'#49586c'}}>{v}</h4></div>
                            )
                })}
            </div>
            )
        }
        if (type == 'adds'){
        setModal(
            <div className="modalInnerator">
                <h2>{LANG.addlist[localStorage.getItem('lang')]}:</h2>
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
            <div className="modalInnerator">
                <h2>{LANG.fulldesc[localStorage.getItem('lang')]}:</h2>
                <p>{str}</p>
            </div>
            )
        }
        if (type == 'img'){
        setModal(
            <div class="modalInnerator">
                <h2>{LANG.fullurl[localStorage.getItem('lang')]}:</h2>
                <p>{str}</p>
                <img style={{width:'100%'}}src={str} alt="image"/>
            </div>
            )
        }
    }
    const parseBeauty = (str,type,data={},dataItaration=0) => {
        switch (type){
            case 'likes': return <span>{JSON.parse(str).length}</span>
            case 'comments': return <span data-target="#collPageModal" data-toggle="modal" onClick={(e)=>makeModal(e,str,type)} className="linkToUser">{LANG.show[localStorage.getItem('lang')]}</span>
            case 'tags': return <span data-target="#collPageModal" data-toggle="modal" onClick={(e)=>makeModal(e,str,type)} className="linkToUser" >{JSON.parse(str).join(', ')}</span>
            case 'desc': return <span  data-target="#collPageModal" data-toggle="modal" onClick={(e)=>makeModal(e,str,type)} className="linkToUser" >{str}</span>
            case 'adds': return <span data-target="#collPageModal" data-toggle="modal" onClick={(e)=>makeModal(e,str,type,data)} className="linkToUser" >{adds && adds.length!==0 && (adds[dataItaration].length !== 0)?(adds[dataItaration].every(v=>v!==''))?LANG.open[localStorage.getItem('lang')]:'':LANG.open[localStorage.getItem('lang')]}</span>
            case 'img': return <span data-target="#collPageModal" data-toggle="modal" onClick={(e)=>makeModal(e,str,type,data)} className="linkToUser" >{str.split('/').pop()}</span>
            default: return 'field is not defined'
        }
    }
    return colItems.length!==0 && (global.__mainData.items.map(v=>v).filter(f=>(f.collect==colItems[0].name && f.email==colItems[0].email)).length!==0)?(<div>
        <div className="mainAmazingTableCont" style={{minHeight:'400px'}}>
        <div className="filtrator">
            {access && <i onClick={()=>{if(delItems.items.length==0)makeMessage('danger', LANG.stop[localStorage.getItem('lang')],`${LANG.itemnotselect[localStorage.getItem('lang')]}`)}} data-toggle={delItems.items.length!==0?'modal':''} data-target="#itemDeleteModal" className="far deleteIcon fa-trash-alt" style={{marginRight:'15px'}}></i>}
            <input  type="text" onKeyUp={filtrator} className="filterelem form-control" placeholder={LANG.filter[localStorage.getItem('lang')]} name="tablecontrol"/>
            <select onChange={filtrator} class="custom-select mr-sm-2 filterelem" id="inlineFormCustomSelect">
                <option value="All types" selected>{LANG.alltypes[localStorage.getItem('lang')]}</option>
                {Types.map(v=><option value={v}>{LANG[v][localStorage.getItem('lang')]}</option>)}
            </select>
            <div>
                <div class="custom-control custom-checkbox mr-sm-2">
                    <input onChange={filtrator} type="checkbox" class="custom-control-input" id="havetegcheckbox"/>
                    <label class="custom-control-label" for="havetegcheckbox">{LANG['haveTags'][localStorage.getItem('lang')]}</label>
                </div>
                <div class="custom-control custom-checkbox mr-sm-2">
                    <input onChange={filtrator} type="checkbox" class="custom-control-input" id="havecommentscheckbox"/>
                    <label class="custom-control-label" for="havecommentscheckbox">{LANG['haveСomments'][localStorage.getItem('lang')]}</label>
                </div>
            </div>
        </div>
        <hr/>
        <div style={{width:'100%',overflowX:'scroll'}} className="table-responsive">
        <style dangerouslySetInnerHTML={{__html: `
                .darkMode .mainAmazingTableCont{
                    filter:invert(1);
                }
                .modal.fade.show{
                    z-index: 99999;
                }
                .deleteIcon:hover{
                    cursor:pointer;
                    color: #bc4141;
                }
                .deleteIcon{
                    transition:.3s;
                }
                .filterelem{
                    display:inline-block;
                    width:200px;
                    margin-right:15px !important;
                }
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
                    border-left: 1px solid #dee2e6;
                    margin-left: -1px;
                }
                table.table tbody tr:nth-child(odd) th:first-child, table.table tbody tr:nth-child(odd) td:first-child{
                    background: #f2f2f2;
                }
                table.table th:nth-child(2) div:before, table.table td:nth-child(2) div:before,
                table.table th:nth-child(2):before, table.table td:nth-child(2):before{
                    content:'';
                    display:inline-block;
                    width:190px;
                    height:100%;
                }
                .filtrator{
                    display: flex;
                    align-items:center;
                    margin-bottom:10px;
                    margin-top:20px;
                }
                .itemsTable{
                   
                }
                @media all and (max-width:1021px){
                    .formPageUserPage{
                        padding: 30px 20px;
                    }
                    .table.table th:first-child, table.table td:first-child {
                        width: 140px;
                    }
                    table.table th:nth-child(2) div:before, table.table td:nth-child(2) div:before,
                    table.table th:nth-child(2):before, table.table td:nth-child(2):before{
                        width:140px;
                    }
                    .table.table th, table.table td{
                        font-size: 13.5px;
                    }
                }
                @media all and (max-width:769px){
                    .filtrator > *{
                        width:100%;
                    }
                    .filtrator{
                        flex-direction:column;
                    }
                    .table.table th, table.table td{
                        font-size: 12px;
                    }
                    .table.table th:first-child, table.table td:first-child {
                        width: 120px;

                    }
                    table.table th:nth-child(2) div:before, table.table td:nth-child(2) div:before,
                    table.table th:nth-child(2):before, table.table td:nth-child(2):before{
                    width:120px;
                    }
                    .filterelem{
                        margin-right: 0px !important;
                    }
                    i.deleteIcon{
                        text-align: center;
                        margin: 10px;
                    }
                }
            `}}/>
        <table style={{fontSize:`calc(${contStyle} / 10) !important`,width: 'calc(100%)'}} class="tablesorter itemsTable table table-striped">
            <thead> 
                <tr className="headerrowtable">
                <th><input style={{display:(access==true)?'inline':'none',marginRight:'5px'}} type="checkbox"  name='checkAllItems'/>{LANG.title[localStorage.getItem('lang')]} <i style={{fontSize:'.7em',color:'#999'}} class="fas fa-sort"></i></th>
                <th>{LANG.desc[localStorage.getItem('lang')]} <i style={{fontSize:'.7em',color:'#999'}} class="fas fa-sort"></i></th>
                <th>{LANG.imageurl[localStorage.getItem('lang')]} <i style={{fontSize:'.7em',color:'#999'}} class="fas fa-sort"></i></th>
                <th>{LANG.propp[localStorage.getItem('lang')]} <i style={{fontSize:'.7em',color:'#999'}} class="fas fa-sort"></i></th>
                <th>{LANG.likes[localStorage.getItem('lang')].slice(0,-1)} <i style={{fontSize:'.7em',color:'#999'}} class="fas fa-sort"></i></th>
                <th>{LANG.tags[localStorage.getItem('lang')]} <i style={{fontSize:'.7em',color:'#999'}} class="fas fa-sort"></i></th>
                <th>{LANG.comments[localStorage.getItem('lang')]} <i style={{fontSize:'.7em',color:'#999'}} class="fas fa-sort"></i></th>
                </tr>
            </thead>
            <tbody>
                { colItems.length!==0 &&
                colItems.map((colItem,ci)=>{
                   return global.__mainData.items.map(v=>v).filter(f=>(f.collect==colItem.name && f.email==colItem.email)).map((k,i)=>{
                    return  <tr data-comments={k.comments && (JSON.parse(k.comments) instanceof Array)?JSON.parse(k.comments).length:0} data-tags={k.tags && (JSON.parse(k.tags) instanceof Array)?JSON.parse(k.tags).length:0} data-type={k.type}>
                                <td>{access &&<input style={{marginRight:'5px'}} type="checkbox" data-type="chosenItem" name={k._id}/>}<Link className="linkToUser" to={`/items/${k._id}`}>{k.name}</Link></td>
                                <td>{(k.description)?parseBeauty(k.description,'desc'):''}</td>
                                <td>{(k.img)?parseBeauty(k.img,'img'):`${LANG.noimg[localStorage.getItem('lang')]}`}</td>
                                <td>{(k.add)?parseBeauty(k.add,'adds',k,ci):`${LANG.noadds[localStorage.getItem('lang')]}`}</td>
                                <td>{(k.likes)?parseBeauty(k.likes,'likes'):'0'}</td>
                                <td>{(k.tags)?parseBeauty(k.tags,'tags'):`${LANG.notags[localStorage.getItem('lang')]}`}</td>
                                <td>{(k.comments)?(JSON.parse(k.comments).length!==0)?parseBeauty(k.comments,'comments'):LANG.nocomms[localStorage.getItem('lang')]:LANG.nocomms[localStorage.getItem('lang')]}</td>
                            </tr>
                    })
                })
                }
            </tbody>
        </table>
        </div>
        </div>
        <Modal user={user} owner={owner} deleteItems={delItems} title={LANG.delItem[localStorage.getItem('lang')]} target="itemDeleteModal" text={LANG.sure[localStorage.getItem('lang')]}></Modal>
        </div>):<h2 className="contrastHx">{LANG.havenocolls[localStorage.getItem('lang')]}</h2>
}

export default AmazingTable