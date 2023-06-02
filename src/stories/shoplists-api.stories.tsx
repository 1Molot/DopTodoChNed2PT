import React, {useEffect, useState} from 'react'
import axios from "axios"
import {shopListAPI} from "../api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true
}
export const GetShoplists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        shopListAPI.getShopList()
            .then(data => {
                setState(data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateShoplist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        shopListAPI.createShopList("NEW TITLE!!!!")
            .then(data => {
                setState(data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteShoplist = () => {
    const [state, setState] = useState<any>(null)
    const shopListId = "490c0f53-4d81-4f70-985a-27d85339263f"
    useEffect(() => {
        shopListAPI.deleteShopList(shopListId)
            .then(res => {
                if(res.data.resultCode === 0) {
                    setState(`Shoplist with id ${shopListId} was deleted`)
                }
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateShoplistTitle = () => {
    const [state, setState] = useState<any>(null)
    const shopListId = "50c78747-a458-4fdf-881d-8eacb21c8972"
    useEffect(() => {
       shopListAPI.updateShopList(shopListId, "NEEEEW!!!!")
            .then(res => {
                axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists/', settings)
                    .then(res => {
                        setState(res.data)
                    })
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

