import React from "react"
import File from './inputs/file'
import DropboxInput from './inputs/dropboxitemname'
import Text from './inputs/text'
import TextareaPage from './inputs/textarea'
import ProfileBox from './profilebox'
import 'bootstrap'
import {MDBBtn} from 'mdbreact'

class ItemCreator extends React.Component {
profileData = {
    photo : 'https://sun9-66.userapi.com/c834103/v834103431/15289e/g9cHCbfD2Q0.jpg',
    likes : '',
    name : 'Влад Каминский',
    online : 'online',
    views : '213',
    status : 'Меня трудно найти, легко потерять и невозможно забыть'
}
style = {
    submit:{
        zIndex:'0',
        margin:'0px auto 50px',
        display:'block',
        width:'20%'
    },
    profile:{
        photo:{
            position: 'absolute',
            backgroundColor:'tranparent',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '50%',
            height: '50%',
            top: '5%',
            left: '5%',
            backgroundImage : `url(${this.profileData.photo})`
        },
        likes:{
            position: 'absolute',
            backgroundColor:'green',
            width: '35%',
            height: '10%',
            left: '60%',
            top: 'calc(35% + (30% / 3))'
        },
        name:{
            position: 'absolute',
            backgroundColor:'yellow',
            width: '35%',
            height: '10%',
            left: '60%',
            top: '5%'
        },
        views:{
            position: 'absolute',
            backgroundColor:'gray',
            width: '35%',
            height: '10%',
            left: '60%',
            top: 'calc(25% + (20% / 3))'
        },
        online:{
            position: 'absolute',
            backgroundColor:'aqua',
            width: '35%',
            height: '10%',
            left: '60%',
            top: 'calc(15% + (10% / 3))'
        },
        container:{
            float: 'left',
            width:'35%', 
            height: '400px',
            transition:'.2s',
            borderRadius: '15px',
            top:'20px',
            backgroundColor: '#f8fff1',
            boxShadow: '0 0 15px gray',
        },
        status:{
            position: 'absolute',
            backgroundColor:'purple',
            width: '90%',
            height: '35%',
            left: '5%',
            top: '60%'
        }
    },
    section:{
        
    },
    h1:{
        marginBottom:'50px',
        color : '#2bbbad'
    },
    form:{
        width:'57.5%',
        marginLeft: '37.5%',
        marginTop: '20px',
        backgroundColor:'rgb(248, 255, 241)',
        boxShadow: '0 0 15px grey',
        borderRadius: '15px',
        padding: '20px'
    },
    container:{
        width:'100%',
        boxSizing: 'content-box',
        backgroundColor: '#f3fdc1',
        padding: '30px',
        margin: '30px auto',
        boxShadow :  '0 0 15px #aaa'
    },
    file:{
        display: 'inline-block',
        margin: '10px',
        padding: 'unset',
        width: 'calc(50% - 20px)',
        overflow: 'hidden'
    },
    dropboxinp:{
        display: 'inline-block',
        margin: '10px',
        transform: 'translateY(-22px)',
        padding: 'unset',
        width: 'calc(50% - 20px)',
        zIndex:'3'
    },
    comment:{},
    description:{
        width: '100%',
        resize:'none'
    },
}
render(){
    return (
         <div style={this.style.container}>
             <ProfileBox data={this.profileData} style={this.style.profile} />
             <section style={this.style.section} className="addCollectSect">
                <form style={this.style.form}>
                    <h1 style={this.style.h1}>Add new Collection</h1>
                    <Text nm="Name of collection*" />
                    <TextareaPage style={this.style.description} nm="Description*" />
                    <TextareaPage style={this.style.description} nm="Author comment" />
                    <span style={{display:'inline-block',textAlign:'center',width:'50%'}}>Choose collection type</span><span style={{display:'inline-block',textAlign:'center',width:'50%'}}>And add image for collection</span>
                    <DropboxInput disabled arr={['Dogs','Alcohol','Cats','Weapon','Motos']}  named='Collection type' style={this.style.dropboxinp} />
                    <File style={this.style.file} />
                    {/*+3 возможные строки\була\даты\текста*/}
                    <hr style={{margin:'70px 0'}}/>
                    <MDBBtn style={this.style.submit} type="submit">OK</MDBBtn>
                </form>
             </section>
             <section style={this.style.section} className="addItemSect">
                <form style={this.style.form}>
                    <h1 style={this.style.h1}>Add new Item to Collection</h1>
                    <Text nm="Add teg" />   <div name="МАССИВ ТЕГОВ"></div>   
                    <span style={{display:'inline-block',textAlign:'center',width:'50%'}}>Choose collection</span><span style={{display:'inline-block',textAlign:'center',width:'50%'}}>And add image for item</span>
                    <DropboxInput disabled arr={['Dobermans','Dvorniags']} named='Collection' style={this.style.dropboxinp} />
                    <File style={this.style.file} />
                    <hr style={{margin:'70px 0'}}/>
                    <MDBBtn style={this.style.submit} type="submit">OK</MDBBtn>
                </form>
             </section>
            
        </div>

    )
}
}

export default ItemCreator;