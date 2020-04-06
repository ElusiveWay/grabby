import React,{Component,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import * as $ from 'jquery'
import axios from 'axios'
import makeMessage from './peref/mess'
import LANG from '../lang'
import makeLoad from './peref/makeLoad'
import ReactDOM from 'react-dom'

const AdminPage = (props) => {
    const {user, grabby} = props
    let [flag, setFlag] = useState(true)
    useEffect(()=>{
            if (flag==true && grabby && user && user.isAdmin==true){
                setFlag(false)
                $('.txaa')[0].innerHTML = grabby.textfields[0].ano.replace(/  /g, " &nbsp;")
                $('#markano')[0].checked = grabby.textfields[0].anomark
                $('#markgui')[0].checked = grabby.textfields[0].guimark
                $('.txag')[0].innerHTML = grabby.textfields[0].gui.replace(/  /g, " &nbsp;")
                $('[data-toggle="tooltip"]').tooltip({
                    html:true,
                    template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>'
                })
            }
    })
    const sub = (e) =>{
        e.preventDefault()
        let deletecont = makeLoad()
        axios({
            url:'/adminka',
            method:'post',
            data: {
                action: 'textfield',
                ano:{
                    inner : $('.txaa').val(),
                    mark  : $('#markano').prop('checked')
                },
                gui:{
                    inner : $('.txag').val(),
                    mark  : $('#markgui').prop('checked')}
            }
        }).then(r=>{
            makeMessage()
            ReactDOM.unmountComponentAtNode($(deletecont)[0])
        }).catch(r=>{
            makeMessage('danger',LANG.oops[localStorage.getItem('lang')],LANG.somewrong[localStorage.getItem('lang')])
            ReactDOM.unmountComponentAtNode($(deletecont)[0])
        })
    }
    
    const tableAction = (e) => {
        const action = (e.target.innerText.toLowerCase() === 'админ')?'admin':(e.target.innerText.toLowerCase() === 'заблокировать')?'block':(e.target.innerText.toLowerCase() === 'удалить')?'delete':e.target.innerText.toLowerCase()
        const users = Array.prototype.filter.call(document.querySelectorAll('[data-name=user-check]'),v=>v.checked==true).map(v=>v.name)
        if (users.length === 0){
            makeMessage('danger',`${LANG.stop[localStorage.getItem('lang')]}`,`${LANG.usernotselect[localStorage.getItem('lang')]}`)
            return
        } 
        const deletecont = makeLoad()
        axios({
            url:'/adminka',
            method:'post',
            data: {
                action: action,
                users: users
            }
        }).then(r=>{
            console.log(r)
            $('[data-name=user-check]').prop({'checked':false})
            makeMessage()
            ReactDOM.unmountComponentAtNode($(deletecont)[0])
        }).catch(r=>{
            makeMessage('danger',`${LANG.oops[localStorage.getItem('lang')]}`,`${LANG.somewrong[localStorage.getItem('lang')]}`)
            ReactDOM.unmountComponentAtNode($(deletecont)[0])
        })
    }
    return (
        (user.isAdmin===true)
        ?<div className="adminWrapForTheme"style={{maxWidth:'1100px',margin:'auto',marginTop:'30px'}}>
            <style dangerouslySetInnerHTML={{__html:`
            styles{
                content:'here styles for Admin page';
            }
            .adminTable td,th{
                max-width:1px;
                word-wrap:break-word;
                white-space:pre;
                overflow:hidden;
                text-overflow:ellipsis;
            }
            .admin-wrapper{
                display:flex;
            }
            .adminTable{
                flex:3;
                height: 100%;
                border:1.5px solid #dee2e6;
                margin: 0;
            }
            .controllPanel h4{
                color:gray;
            }
            .controllPanel{
                display:flex;
                flex-direction:column;
                transform: translateY(-20px);
            }
            .textFieldForm-wrapper{
                width:100%;
            }
            .textFieldForm-wrapper form{
                display:flex;
                flex-wrap:wrap;
            }
         
            .panelField-wrapper{
                color:#7a93b4;
                padding:15px;
                margin:10px;
                display:flex;
                flex-direction:column;
                align-items:stretch;
            }
            .btn.nav-link.active{
                background-color:#7a93b4;
            }
            .txaa, .txag{
                clear:both;
                display:block;
                box-sizing: border-box;
                width:100%;
                resize:none;
                overflow-y:scroll;
                height:300px;
            }   
            .tooltip,
            .tooltip-inner {
                color: black;
                background-color: white;
            }
            .tableWrapper{
                width:100%;
                height: 100%;
            }
            .admin-h1{
                background: transparent;
                color: rgb(122, 147, 180);
                margin: 20px 0;
                text-align: center;
            }
            @media screen and (max-width:1001px){
                .adminTable td,
                .adminTable th{
                    max-width:200px;
                }
                .tableWrapper{
                    overflow-x:scroll;
                    overflow-y:visible;
                    height:100%;
                    margin: 0px 30px 30px 0px;
                }
            }
            @media screen and (max-width:550px){
                .subBtn-admin{
                    float:left !important;
                }
                .controllPanel{
                    transform:unset;
                    flex-direction: row;
                    flex-wrap: wrap;
                }
                .admin-wrapper{
                    flex-direction: column;
                }
                .panelField-wrapper{
                    display:block;
                    padding:0;
                    margin:auto;
                }
                .admin-h1{
                    margin: 50px 0;
                }
            }
            `}}/>
                <h1 className="admin-h1"><i class="fas fa-users-cog"></i> {LANG.adminPanel[localStorage.getItem('lang')]}</h1>
                <div className="admin-wrapper">
                    <div className="controllPanel">
                        <div className="panelField-wrapper">
                            <h4>{LANG.actions[localStorage.getItem('lang')]}:</h4>
                            <button onClick={tableAction} className="btn">{LANG.delete[localStorage.getItem('lang')]}</button>
                        </div>
                        <div className="panelField-wrapper">
                            <h4>{LANG.toggleflag[localStorage.getItem('lang')]}:</h4>
                            <button onClick={tableAction} className="btn">{LANG.admin[localStorage.getItem('lang')]}</button>
                            <button onClick={tableAction} className="btn">{LANG.block[localStorage.getItem('lang')]}</button>
                        </div>
                    </div>
                    <div className="tableWrapper">
                    <table className="adminTable table table-striped">
                    <caption style={{captionSide: 'top'}}>{LANG.users[localStorage.getItem('lang')]}: </caption>
                    <thead> 
                        <tr>
                            <th style={{width:'25%'}}><input style={{marginRight:'5px'}} onClick={(e)=>$('[data-name=user-check]').prop({'checked':e.target.checked})}type="checkbox" name='checkAllItems'/>Email</th>
                            <th style={{width:'20%'}}>{LANG.name[localStorage.getItem('lang')]}</th>
                            <th style={{width:'10%'}}>{LANG.admin[localStorage.getItem('lang')]}</th>
                            <th style={{width:'10%'}}>{LANG.blocked[localStorage.getItem('lang')]}</th>
                            <th data-toggle="tooltip" title={LANG.colls[localStorage.getItem('lang')]} style={{width:'10%'}}>{LANG.colls[localStorage.getItem('lang')]}</th>
                            <th style={{width:'10%'}}>{LANG.items[localStorage.getItem('lang')]}</th>
                            <th>{LANG.status[localStorage.getItem('lang')]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        { grabby && grabby.users && grabby.users.length!==0 &&
                        grabby.users.map((v,i)=>{
                            const locemail = (v.email.indexOf('@')==-1)?<Link style={{color:'#7a93b4'}} to={`/users/${v._id}`}> {`vk.com/id${v.email}`} </Link>:(v.email.indexOf('start.g00.c0m:')===0)?<span ><Link style={{color:'#a56565'}} to={`/users/${v._id}`}>{v.email.substring(14,v.email.indexOf(':g00.c0m.end'))}</Link></span>:<span ><Link style={{}} to={`/users/${v._id}`}>{v.email}</Link></span>
                            return  <tr>
                                        <td ><input style={{marginRight:'5px'}}  type="checkbox"  data-name="user-check" name={v._id}/>{locemail}</td>
                                        <td title={(v.email.indexOf('@')==-1)?`Vk account : vk.com/id${v.email}`:(v.email.indexOf('start.g00.c0m:')!==-1)?'Google account: '+v.email.substring(14,v.email.indexOf(':g00.c0m.end')):v.email} data-toggle="tooltip">{v.name}</td>
                                        <td> {(v.isAdmin==false)?LANG[v.isAdmin.toString()][localStorage.getItem('lang')]:<span style={{color:'#7a93b4'}}>{LANG[v.isAdmin.toString()][localStorage.getItem('lang')]}</span>}</td>
                                        <td> {(v.isBlocked==false)?LANG[v.isBlocked.toString()][localStorage.getItem('lang')]:<span style={{color:'#a56565'}}>{LANG[v.isBlocked.toString()][localStorage.getItem('lang')]}</span>}</td>
                                        <td> {(grabby)?grabby.collections.filter(q=>q.email==v.email).length:''}</td>
                                        <td> {(grabby)?grabby.items.filter(q=>q.email==v.email).length:''}</td>
                                        <td data-toggle="tooltip" title={v.status}> {v.status}</td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table>
                </div>
            </div>
            <hr style={{width:'90%',marginLeft:'5%'}}/>
            <h3 style={{color:'gray',marginLeft:'3%',}}>{LANG.textfieldtitle[localStorage.getItem('lang')]}:</h3>
            <div className="textFieldForm-wrapper">
                            <form onSubmit={sub} style={{margin:'30px'}} method='post'>
                            <ul style={{width:'100%'}} class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="btn nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                                    aria-controls="pills-home" aria-selected="true">{LANG.announcement[localStorage.getItem('lang')]}</a>
                                </li>
                                <li class="nav-item">
                                    <a class="btn nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
                                    aria-controls="pills-profile" aria-selected="false">{LANG.guide[localStorage.getItem('lang')]}</a>
                                </li>
                                    <div style={{flex:10}}><button  style={{float:'right',color:'white',backgroundColor:'#7ab0b4'}} className="subBtn-admin btn">{LANG.submit[localStorage.getItem('lang')]}</button></div>
                                </ul>
                                <div style={{width:'100%'}} class="tab-content pt-2 pl-1" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <textarea className="txaa form-controll"></textarea>
                                    <input style={{transform:'translateY(1px)'}}type="checkbox" id="markano" name="markano"/>
                                    <label style={{color: 'gray'}} for="markano">{LANG.usemark[localStorage.getItem('lang')]}</label>
                                    </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <textarea className="txag form-controll"></textarea>
                                <input style={{transform:'translateY(1px)'}}type="checkbox" id="markgui" name="markgui"/>
                                <label style={{color: 'gray'}} for="markgui">{LANG.usemark[localStorage.getItem('lang')]}</label>
                                </div>
                                </div>
                            </form>
                </div>
        </div>
        : <div style={{flexDirection:'column',height:'90vh',display:'flex',justifyContent:'center',alignItems:'center'}}><h2>You are not Admin!</h2><br/><Link to='/'><button style={{color:'black'}}className="btn">Go home</button></Link></div>
    )
}

export default AdminPage