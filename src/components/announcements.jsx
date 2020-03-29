import React, {Component} from 'react'

const Anno = (props) => {
    const {grabby} = props
    return (
        <div className="announBlock" dangerouslySetInnerHTML={{__html : grabby.textfields[0].ano}}>
        </div>
    )
}

export default Anno 