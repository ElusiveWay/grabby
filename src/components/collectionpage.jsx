import React,{Component, useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

import {Link} from 'react-router-dom'

const CollectionPage = () => {
    let [colItem, setCol] = useState({})
    let [author, setAuthor] = useState({})
    let [adds, setAdds] = useState([])
    let [toggler, setToggler] = useState(true)
    let [isUser, setUser] = useState(false)
    let width = 80
    let height = 90
    let stoper = 999
    let { id } = useParams();

    const parseBeauty = (str,type) => {

    }
    useEffect(() => {
        //
        const interval = setInterval(() => {
                setUser(Object.keys(global.__user).length!==0 && global.__user!==undefined)
                setCol((global.__mainData)?global.__mainData.collections.filter(k=>k._id==id)[0]:{})
                setAdds((colItem)?JSON.parse(colItem.adds):[])
                setAuthor((colItem)?JSON.parse(colItem.author):{})
        }, 50);
    
        return () => clearInterval(interval);
      });

        return (global.__mainData && colItem)?(
        <div style={{display:'flex'}}>
            <img src='' onError={()=>window.scrollTo(0,0)}/>
            <style dangerouslySetInnerHTML={{__html: `
                .__cont_ainer_ > *{
                    margin:0 3vw;
                }
                .__cont_ainer_{
                    position: relative;
                    display: ${(colItem._id)?'table':'none'};
                    width: ${width}vw;
                    float:left;
                    max-width: 1020px;
                    left: 50%;
                    margin:2vw 0;
                    transform: translateX(-50%);
                    height: auto;
                }
                .__ima_ge__{
                    display:block;
                    float: left;
                    margin: 3vw 3vw 1vw  3vw;
                    width: 40%;
                    height: auto;
                    background-color: #eee;
                }
                .__ti_tle__{
                    float: right;
                    margin-right: 3vw;
                    margin-top: 3vw;
                    max-width: calc(45% - 5vw);
                    word-wrap: break-word;
                    height:auto;
                    display: block;
                    color: #7e7ab4;
                    width: auto;
                }
                .__ico_nqa:hover{
                    color: white;
                }
                .__ico_nqa{
                    background-color: #7e7ab4;
                    padding: 0.84rem 1rem;
                    float: right;
                    display:inline-block;
                    color: white;
                    width: calc(35% - 3vw);
                    margin-right: 3vw;
                    margin-top: 1vw;
                    clear:right;
                }
                .card > .__h_r_{
                    float:right;
                    display:inline-block;
                    width:35%;
                    margin: 2vw 3vw 2vw 1vw;
                }
                .__descr_iption{
                    text-align:justify;
                    margin: 3vw 3vw 1vw;
                    padding-top: 3vw;
                    text-indent:3vw;
                    clear: right;
                }
                .__ty_pe{
                    margin-bottom:1vw;
                }
                .__ads_ads_{
                    clear:both;
                    margin-top:0.5vw;
                    margin-bottom:0.5vw;
                }
                .listed:before{
                    content:"•  ";
                    font-size:24px;
                }
                .linkToUser:hover{
                    color: #b47a93;
                }
                .linkToUser{
                    color:black;
                    transition:.2s;
                }
                table.table th, table.table td{
                    font-size:.9vw;
                    max-width:5vw;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:pre;
                }
            `}}/>
            <MDBCard className="__cont_ainer_">
                <img src={colItem.img}className="__ima_ge__"/>
                <h1 className="__ti_tle__">{colItem.name}</h1>
                <hr className="__h_r_"/>
                {colItem && <Link to={`/collections/${colItem._id}`}><MDBBtn color="" style={{backgroundColor:'#7e7ab4',color:'white'}} onClick={()=>global.document.querySelector('.itemsTable').scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})} className="__ico_nqa v2">Item list</MDBBtn></Link>}
                <p className="__descr_iption">{colItem.descript}</p>
                {colItem.comment && <p className="">{colItem.comment}</p>}
                <p>Author: <Link to={`/users/${author._id}`}><i className='linkToUser'>{author.name}</i></Link> </p>
                <p className="__ty_pe">Type: {colItem.type}</p>
                {adds && 
                <div>
                    <h3 className="__ads_ads_">Properties:</h3> 
                    <ul>
                        {adds.map(v=>{
                            return <li>{v[Object.keys(v)[0]]}</li>
                        })}
                    </ul>
                </div>}
                <table style={{width: 'calc(100% - 6vw)'}} class="itemsTable table table-striped">
                    <thead>
                        <tr>
                        <th><input type="checkbox" name='checkAllItems'/></th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image url</th>
                        <th>Properties</th>
                        <th>Likes</th>
                        <th>Tags</th>
                        <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        global.__mainData.items.map(v=>v).filter(f=>(f.collect==colItem.name && f.email==colItem.email)).map((k,i)=>{
                        return  <tr>
                                    {/*parseBeauty(str,'add')*/}
                                    {global.__user._id==JSON.parse(k.author)._id && <td><input type="checkbox" name={`itemCheck${i}`}/></td>}
                                    <Link to={`/items/${k._id}`}><td style={{maxWidth:'200px'}} className="linkToUser">{k.name}</td></Link>
                                    <td>{(k.description)?k.description:''}</td>
                                    <td>{(k.img)?k.img:''}</td>
                                    <td>{(k.add)?k.add:'[]'}</td>
                                    <td>{(k.likes)?k.likes:'[]'}</td>
                                    <td>{(k.tags)?k.tags:'[]'}</td>
                                    <td>{(k.comments)?k.comments:'[]'}</td>
                                </tr>
                        })
                        }
                    </tbody>
                </table>
                <p style={{visibility:'hidden'}}className="fakeMargin __ads_ads_ listed">FAKE P FOR MARGIN IN THE BOTTOM OF CARD</p>
            </MDBCard> 
            </div>
            
        ):(<h1 style={{position:'fixed',left:'50%',top:'50%',transform: 'translate(-50%,-50%)'}}>Loading...</h1>)
}

export default CollectionPage