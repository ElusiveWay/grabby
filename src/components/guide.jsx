import React, {Component} from 'react'
import {markdown} from 'markdown'

const Guide = (props) => {
    const {grabby} = props
    return (
        <div className="announBlock" dangerouslySetInnerHTML={{__html : (grabby.textfields[0].guimark === true)?(markdown.toHTML( grabby.textfields[0].gui )):(grabby.textfields[0].gui)}}></div>
    )
}

export default Guide 