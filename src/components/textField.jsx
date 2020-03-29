import React,{Component, useState, useEffect} from 'react'
import Anno from './announcements'
import Guide from './guide'

const TextField = (props) => {
    const {grabby} = props
    useEffect(()=>{
        let raf = () => {
            try{if(document.getElementsByClassName('textField').length && document.getElementsByClassName('mycarysel').length)document.getElementsByClassName('textField')[0].style.height = `calc(${window.getComputedStyle(document.getElementsByClassName('mycarysel')[0]).height})`}catch(e){}
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    })
    return (
        <div style={{overflowY:'scroll', height: '100%'}} className="textField-wrapper">
            <style dangerouslySetInnerHTML={{__html:`
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
            
            `}}/>
            <ul style={{marginTop:'1%',marginLeft:'3%'}}className="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#announcements" role="tab" aria-controls="home"
                    aria-selected="true">Announcement</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#chat" role="tab" aria-controls="profile"
                    aria-selected="false">Guide</a>
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