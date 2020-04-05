import React,{Component, useState, useEffect} from 'react'
import Anno from './announcements'
import Guide from './guide'
import LANG from '../lang'

const TextField = (props) => {
    const {grabby,lang} = props
    useEffect(()=>{
        let raf = () => {
            try{
                if(document.getElementsByClassName('textField').length && document.getElementsByClassName('mycarysel').length){
                    if(global.document.body.offsetWidth > 769){
                        document.getElementsByClassName('textField')[0].style.height = `calc(${window.getComputedStyle(document.getElementsByClassName('mycarysel')[0]).height})`
                        document.getElementsByClassName('textField-wrapper')[0].style.overflowY = 'scroll'
                    }
                    else{
                        document.getElementsByClassName('textField')[0].style.height = `auto`
                        document.getElementsByClassName('textField-wrapper')[0].style.overflowY = 'visible'
                    }
                }
            }catch(e){}
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    })
    return (
        <div style={{overflowY:'scroll', height: '100%'}} className="textField-wrapper">
            <style dangerouslySetInnerHTML={{__html:`
            .darkMode .textField img{
                filter:invert(1);
            }
            .darkMode .textField{
                filter:invert(1);
            }
            .bg-control-textfield{
                width:100%;
                height:100%;
                top:0;
                left:0;
                position:absolute;
                filter: blur(10px) grayscale(50%);
            }
            .nav-tabs a.nav-link{
                border-top-left-radius: unset;
                border-top-right-radius: unset;
            }
            .nav.nav-tabs{
                border-bottom:unset;
            }
            .nav-link{
                color: rgb(122, 147, 180);
            }
            .textField-wrapper .nav-link.active{
                outline: 1px solid #ddd;
                border-color: transparent !important;
                color:black !important;
            }
            .mycarysel{
                min-height:250px;
            }
            .textField-wrapper img{
                max-width:50%;
            }
            @media screen and (max-width: 769px){
                .textField-wrapper h1,
                .textField-wrapper h2,
                .textField-wrapper h3,
                .textField-wrapper h4,
                .textField-wrapper h5,
                .textField-wrapper h6{
                    text-align:center
                }
                .textField-wrapper img{
                    width: auto;
                    max-width:70%;
                    clear: both;
                    float:unset !important;
                    display: block;
                    margin: auto;
                }
            }
            `}}/>
            <ul style={{marginTop:'1%',marginLeft:'3%'}}className="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#announcements" role="tab" aria-controls="home"
                    aria-selected="true">{LANG.announcement[lang]}</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#chat" role="tab" aria-controls="profile"
                    aria-selected="false">{LANG.guide[lang]}</a>
                </li>
            </ul>
            <hr style={{width:'90%',padding:'0px'}}/>
            <div className="tab-content" id="myTabContent">
                    <div style={{padding:'0 3%'}}className="tab-pane fade show active" id="announcements" role="tabpanel" aria-labelledby="home-tab">
                       <Anno grabby={grabby}></Anno>
                    </div>
                    <div style={{padding:'0 3%'}} className="tab-pane fade" id="chat" role="tabpanel" aria-labelledby="profile-tab">
                        <Guide grabby={grabby}/>
                    </div>
            </div>
        </div>
    )
}

export default TextField