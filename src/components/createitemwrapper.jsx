import React,{Component, useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import ItemCreator from './createitem'

const CreateItemWrapper = (props) => {
    let { id, sub } = useParams();
    id = (props.id!==undefined)?props.id:id
    sub = (props.sub!==undefined)?props.sub:sub
    return (
        <ItemCreator sub={sub} id={id} />
    )
}

export default CreateItemWrapper