import React,{Component} from 'react'
import Message from './message'
import ReactDOM from 'react-dom'
import * as $ from 'jquery'

const makeMessage = (color='success',title='Nice!',text='Action complited') =>{
        let id = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
        $('.message-cont').append('<div id='+id+'></div>')
        ReactDOM.render(<Message text1={title} text2={text} color={color} id={id}/>, $('#'+id)[0])
}
export default makeMessage