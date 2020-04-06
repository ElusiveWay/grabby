import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import * as $ from 'jquery'
import Load from './load'

const makeLoad = (render = true, shift = 0, container = '.load-cont') =>{
        if (render === true)ReactDOM.render( <Load shift={shift} ></Load> , $(container)[0])
        return container
}
export default makeLoad