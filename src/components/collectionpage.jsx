import React,{Component, useEffect, useState} from 'react'
import { useParams, Redirect } from "react-router-dom";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import ModalOk from './modalok'
import {Link} from 'react-router-dom'
import AmazingTable from './amazingTable';
import Modal from './modal'
import LANG from '../lang'
import {markdown} from 'markdown'

const CollectionPage = (props) => {
    let [colItem, setCol] = useState({})
    let [author, setAuthor] = useState({})
    let [adds, setAdds] = useState([])
    let [toggler, setToggler] = useState(true)
    let [isUser, setUser] = useState(false)
    let [contStyle, setContStyle] = useState({})
    let [modalInner, setModal] = useState(<div>Loading...</div>)
    const {grabby, user} = props
    let width = 80
    let height = 90
    let stoper = 999
    let { id } = useParams();

    let [redirect, setRed] = useState('')
    const CheckRed = (v) => {
        setRed(v)
    }

    useEffect(() => {
        //
        const interval = setInterval(() => {
                setUser(Object.keys(global.__user).length!==0 && global.__user!==undefined)
                setCol((global.__mainData && Object.keys(global.__mainData).length > 0)?global.__mainData.collections.filter(k=>k._id==id)[0]:{})
                setAdds((colItem && typeof colItem.adds === 'string')?JSON.parse(colItem.adds):[])
                setAuthor((colItem  && typeof colItem.author === 'string')?JSON.parse(colItem.author):{})
                setContStyle((global.document && global.document.querySelectorAll('.__cont_ainer_').length!==0)?window.getComputedStyle(global.document.querySelector('.__cont_ainer_')):{})
        }, 50);
    
        return () => clearInterval(interval);
      });

        return (global.__mainData && colItem)?(
        <div className="colPageWrapRed" style={{display:'flex'}}>
            <img src='' onError={()=>window.scrollTo(0,0)}/>
            <style dangerouslySetInnerHTML={{__html: `
                .modal.fade.show{
                    z-index: 99999;
                }
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
                    margin:2vw auto;
                    height: auto;
                }
                .__ima_ge__{
                    display:block;
                    float: left;
                    max-width: 100%;
                    margin: 3vw 3vw 1vw  3vw;
                    width: 40%;
                    height: auto;
                    background-color: #eee;
                }
                .__ti_tle__{
                    float: right;
                    margin-right: 3vw;
                    margin-top: 40px;
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
                .editBtn:hover{
                    background-color: #7ab0b4;
                    color:white;
                }
                .editBtn{
                    cursor:pointer;
                    border-radius:.5em;
                    padding:.25em;
                    transition:.3s;
                }
                .__ima_ge__.dva{
                    display:none;
                }
                @media screen and (max-width: 1021px){
                    .__cont_ainer_{
                        width: 100%;
                        max-width: 1020px;
                        margin:2vw 2vw;

                    }
                }
                @media all and (max-width:769px){
                    .__ti_tle__{
                        float: unset;
                        margin: 40px auto;
                        text-align: center;
                        max-width: 100%;
                    }
                    img.__ima_ge__{
                        display:none;
                    }
                    .__ima_ge__.dva {
                        width: auto;
                        float: unset;
                        clear: both;
                        margin: auto;
                        display:block
                    }
                    .card > a {
                        margin: 0;
                    }
                    .card  .__ico_nqa.v2{
                        width:90%;
                        margin-left:5%;
                        float:unset;
                        max-width: 100%;
                    }
                    .card > .__h_r_{
                        width:70%;
                        float:unset;
                        margin: 34px 15% 20px 15%;
                    }
                }
            `}}/>
            <MDBCard className="__cont_ainer_">
                <img src={colItem.img}className="__ima_ge__"/>
                <h1 className="__ti_tle__">{colItem.name} 
                <span style={{top:'10px',right:'10px',position:'absolute'}}>
                    {author && Object.keys(author).length!==0 && (author._id===user._id || user.isAdmin === true) &&<Link style={{color:'#7e7ab4'}} to={{pathname:`/users/${author._id}/editc`,editcol:id}}><i style={{verticalAlign:'top',fontSize:'.5em',marginLeft:'10px'}}class="editBtn fas fa-tools"></i></Link>}
                    {author && Object.keys(author).length!==0 && (author._id===user._id || user.isAdmin === true) &&<i data-target="#collectDeleteModal" data-toggle='modal' className="far editBtn fa-trash-alt" style={{verticalAlign:'top',fontSize:'.5em',marginLeft:'10px'}}></i>} 
                </span>
            </h1>
                <img src={colItem.img}className="__ima_ge__ dva"/>
                {(colItem.img!=='') && <hr className="__h_r_"/>}
                {author && Object.keys(author).length!==0 && (author._id===user._id || user.isAdmin === true) &&<Link style={{color:'white'}}to={{pathname:`/users/${author._id}/addi`, addcoll: colItem}}><MDBBtn color="" style={{backgroundColor:'rgb(122, 176, 180)',color:'white'}} className="__ico_nqa v2">{LANG.additem[localStorage.getItem('lang')]}</MDBBtn></Link>}
                {colItem && (global.__mainData.items.map(v=>v).filter(f=>(f.collect==colItem.name && f.email==colItem.email)).length!==0) && <MDBBtn color="" style={{backgroundColor:'#7e7ab4',color:'white'}} onClick={()=>global.document.querySelector('.itemsTable').scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})} className="__ico_nqa v2"> {LANG.itemList[localStorage.getItem('lang')]} </MDBBtn>}
                {colItem && typeof colItem.descript === 'string' && <p className="__descr_iption" dangerouslySetInnerHTML={{__html : markdown.toHTML( colItem.descript )}} ></p>}
                {colItem.comment && <p style={{clear:'both'}} className=""><i>{colItem.comment}</i><br/><br/></p>}
                <p style={{clear:'both'}}>{LANG.author[localStorage.getItem('lang')]} <Link to={`/users/${author._id}`}><i className='linkToUser'>{author.name}</i></Link> </p>
                <p className="__ty_pe">{LANG.type[localStorage.getItem('lang')]} {(typeof colItem.type === 'string')?LANG[colItem.type][localStorage.getItem('lang')]:colItem.type}</p>
                {adds && adds.length!==0 &&
                <div>
                    <h3 className="__ads_ads_">{LANG.propps[localStorage.getItem('lang')]}</h3> 
                    <ul>
                        {adds.map(v=>{
                            return <li>{v[Object.keys(v)[0]]}</li>
                        })}
                    </ul>
                </div>}
                <div style={{width:`calc(${contStyle.width} - 6vw)`}}>
                    {Object.keys(author).length!==0 && <AmazingTable owner={author} user={user} id={id}/>}
                </div>
                

                <p style={{visibility:'hidden'}}className="fakeMargin __ads_ads_ listed">FAKE P FOR MARGIN IN THE BOTTOM OF CARD</p>
            </MDBCard> 
            {redirect !== '' && <Redirect to={redirect}/>}
            {author && user && id && <Modal CheckRed={CheckRed} user={user} owner={author} deleteCollections={[id]} title={LANG.delColl[localStorage.getItem('lang')]} target="collectDeleteModal" text={LANG.sure[localStorage.getItem('lang')]}></Modal>}
            </div>
            
        ):(<h1 style={{position:'fixed',left:'50%',top:'50%',transform: 'translate(-50%,-50%)'}}>{LANG.loading[localStorage.getItem('lang')]}</h1>)
}

export default CollectionPage