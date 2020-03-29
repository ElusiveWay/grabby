import React,{Component, useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import ModalOk from './modalok'
import {Link} from 'react-router-dom'
import AmazingTable from './amazingTable';

const CollectionPage = () => {
    let [colItem, setCol] = useState({})
    let [author, setAuthor] = useState({})
    let [adds, setAdds] = useState([])
    let [toggler, setToggler] = useState(true)
    let [isUser, setUser] = useState(false)
    let [contStyle, setContStyle] = useState({})
    let [modalInner, setModal] = useState(<div>Loading...</div>)
    let width = 80
    let height = 90
    let stoper = 999
    let { id } = useParams();

    

    useEffect(() => {
        //
        const interval = setInterval(() => {
                setUser(Object.keys(global.__user).length!==0 && global.__user!==undefined)
                setCol((global.__mainData)?global.__mainData.collections.filter(k=>k._id==id)[0]:{})
                setAdds((colItem)?JSON.parse(colItem.adds):[])
                setAuthor((colItem)?JSON.parse(colItem.author):{})
                setContStyle((global.document && global.document.querySelectorAll('.__cont_ainer_').length!==0)?window.getComputedStyle(global.document.querySelector('.__cont_ainer_')):{})
        }, 50);
    
        return () => clearInterval(interval);
      });

        return (global.__mainData && colItem)?(
        <div style={{display:'flex'}}>
            <img src='' onError={()=>window.scrollTo(0,0)}/>
            <style dangerouslySetInnerHTML={{__html: `
                .tagpre:before{
                    content:'#';
                }
                .modalInnerator{
                    word-wrap:break-word;
                }
                .__cont_ainer_ > *{
                    margin:0 3vw;
                }
                .__cont_ainer_{
                    overflow:hidden;
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
                    position:fixed !important;
                    border-right:1px solid #dee2e6;
                    background: white;
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
            <MDBCard className="__cont_ainer_">
                <img src={colItem.img}className="__ima_ge__"/>
                <h1 className="__ti_tle__">{colItem.name}</h1>
                {(colItem.img!=='') && <hr className="__h_r_"/>}
                {colItem && (global.__mainData.items.map(v=>v).filter(f=>(f.collect==colItem.name && f.email==colItem.email)).length!==0) && <Link to={`/collections/${colItem._id}`}><MDBBtn color="" style={{backgroundColor:'#7e7ab4',color:'white'}} onClick={()=>global.document.querySelector('.itemsTable').scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})} className="__ico_nqa v2">Item list</MDBBtn></Link>}
                <p className="__descr_iption">{colItem.descript}</p>
                {colItem.comment && <p className="">{colItem.comment}</p>}
                <p>Author: <Link to={`/users/${author._id}`}><i className='linkToUser'>{author.name}</i></Link> </p>
                <p className="__ty_pe">Type: {colItem.type}</p>
                {adds && adds.length!==0 &&
                <div>
                    <h3 className="__ads_ads_">Properties:</h3> 
                    <ul>
                        {adds.map(v=>{
                            return <li>{v[Object.keys(v)[0]]}</li>
                        })}
                    </ul>
                </div>}
                <div style={{width:`calc(${contStyle.width} - 6vw)`}}>
                    <AmazingTable id={id}/>
                </div>
                

                <p style={{visibility:'hidden'}}className="fakeMargin __ads_ads_ listed">FAKE P FOR MARGIN IN THE BOTTOM OF CARD</p>
            </MDBCard> 
            
            
            </div>
            
        ):(<h1 style={{position:'fixed',left:'50%',top:'50%',transform: 'translate(-50%,-50%)'}}>Loading...</h1>)
}

export default CollectionPage