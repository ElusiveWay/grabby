import React, {Component} from 'react'
import {markdown} from 'markdown'

const Anno = (props) => {
    const {grabby} = props
    return (
        <div className="announBlock" dangerouslySetInnerHTML={{__html : (grabby.textfields[0].anomark === true)?(markdown.toHTML( grabby.textfields[0].ano )):(grabby.textfields[0].ano)}}>
        </div>
    )
}

export default Anno 