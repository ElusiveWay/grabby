import React,{Component,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import * as $ from 'jquery'
import axios from 'axios'
import makeMessage from './peref/mess'

const AdminPage = (props) => {
    const {user, grabby} = props
    let [flag, setFlag] = useState(true)
    useEffect(()=>{
            if (flag==true && grabby && user && user.isAdmin==true){
                setFlag(false)
                $('.txaa')[0].innerText = grabby.textfields[0].ano
                $('#markano')[0].checked = grabby.textfields[0].anomark
                $('#markgui')[0].checked = grabby.textfields[0].guimark
                $('.txag')[0].innerText = grabby.textfields[0].gui
                $('[data-toggle="tooltip"]').tooltip({
                    html:true,
                    template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>'
                })
            }
    })
    const sub = (e) =>{
        e.preventDefault()
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
        }).catch(r=>{
            makeMessage('danger','Oops!','Something went wrong!')
        })
    }
    
    const tableAction = (e) => {
        const action = e.target.innerText.toLowerCase()
        const users = Array.prototype.filter.call(document.querySelectorAll('[data-name=user-check]'),v=>v.checked==true).map(v=>v.name)
        if (users.length === 0){
            makeMessage('danger','Stop!','You did not select any user!')
            return
        } 
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
        }).catch(r=>{
            makeMessage('danger','Oops!','Something went wrong!')
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
                align-items:center;
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
                <h1 className="admin-h1"><i class="fas fa-users-cog"></i> Admin panel</h1>
                <div className="admin-wrapper">
                    <div className="controllPanel">
                        <div className="panelField-wrapper">
                            <h4>Actions:</h4>
                            <button onClick={tableAction} className="btn">Delete</button>
                        </div>
                        <div className="panelField-wrapper">
                            <h4>Toggle flag:</h4>
                            <button onClick={tableAction} className="btn">Admin</button>
                            <button onClick={tableAction} className="btn">Block</button>
                        </div>
                    </div>
                    <div className="tableWrapper">
                    <table className="adminTable table table-striped">
                    <caption style={{captionSide: 'top'}}>Users: </caption>
                    <thead> 
                        <tr>
                            <th style={{width:'25%'}}><input style={{marginRight:'5px'}} onClick={(e)=>$('[data-name=user-check]').prop({'checked':e.target.checked})}type="checkbox" name='checkAllItems'/>Email</th>
                            <th style={{width:'20%'}}>Name</th>
                            <th style={{width:'10%'}}>Admin</th>
                            <th style={{width:'10%'}}>Blocked</th>
                            <th data-toggle="tooltip" title='Collections' style={{width:'10%'}}>Collections</th>
                            <th style={{width:'10%'}}>Items</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { grabby && grabby.users && grabby.users.length!==0 &&
                        grabby.users.map((v,i)=>{
                            const locemail = (v.email.indexOf('@')==-1)?<Link style={{color:'#7a93b4'}} to={`/users/${v._id}`}> {`vk.com/id${v.email}`} </Link>:(v.email.indexOf('start.g00.c0m:')===0)?<span ><Link style={{color:'#a56565'}} to={`/users/${v._id}`}>{v.email.substring(14,v.email.indexOf(':g00.c0m.end'))}</Link></span>:<span ><Link style={{}} to={`/users/${v._id}`}>{v.email}</Link></span>
                            return  <tr>
                                        <td ><input style={{marginRight:'5px'}}  type="checkbox"  data-name="user-check" name={v._id}/>{locemail}</td>
                                        <td title={(v.email.indexOf('@')==-1)?`Vk account : vk.com/id${v.email}`:(v.email.indexOf('start.g00.c0m:')!==-1)?'Google account: '+v.email.substring(14,v.email.indexOf(':g00.c0m.end')):v.email} data-toggle="tooltip">{v.name}</td>
                                        <td> {(v.isAdmin==false)?v.isAdmin.toString():<span style={{color:'#7a93b4'}}>{v.isAdmin.toString()}</span>}</td>
                                        <td> {(v.isBlocked==false)?v.isBlocked.toString():<span style={{color:'#a56565'}}>{v.isBlocked.toString()}</span>}</td>
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
            <h3 style={{color:'gray',marginLeft:'3%',}}>Text field of main page:</h3>
            <div className="textFieldForm-wrapper">
                            <form onSubmit={sub} style={{margin:'30px'}} method='post'>
                            <ul style={{width:'100%'}} class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="btn nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                                    aria-controls="pills-home" aria-selected="true">Anouncement</a>
                                </li>
                                <li class="nav-item">
                                    <a class="btn nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
                                    aria-controls="pills-profile" aria-selected="false">Guide</a>
                                </li>
                                    <div style={{flex:10}}><button  style={{float:'right',color:'white',backgroundColor:'#7ab0b4'}} className="subBtn-admin btn">Submit</button></div>
                                </ul>
                                <div style={{width:'100%'}} class="tab-content pt-2 pl-1" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <textarea className="txaa form-controll"></textarea>
                                    <input style={{transform:'translateY(1px)'}}type="checkbox" id="markano" name="markano"/>
                                    <label style={{color: 'gray'}} for="markano">Use markdown</label>
                                    </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <textarea className="txag form-controll"></textarea>
                                <input style={{transform:'translateY(1px)'}}type="checkbox" id="markgui" name="markgui"/>
                                <label style={{color: 'gray'}} for="markgui">Use markdown</label>
                                </div>
                                </div>
                            </form>
                </div>
        </div>
        : <div style={{flexDirection:'column',height:'90vh',display:'flex',justifyContent:'center',alignItems:'center'}}><h2>You are not Admin!</h2><br/><Link to='/'><button style={{color:'black'}}className="btn">Go home</button></Link></div>
    )
}

export default AdminPage