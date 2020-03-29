import React, {Component} from 'react'

const Guide = (props) => {
    const {grabby} = props
    return (
        <div className="announBlock" dangerouslySetInnerHTML={{__html : grabby.textfields[0].gui}}></div>
    )
}

export default Guide 