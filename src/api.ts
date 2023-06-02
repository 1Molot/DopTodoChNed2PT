import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1/"
})


export const shopListAPI = {
    getShopList() {
        return instance.get<GetShopListType[]>('todo-lists')
            .then(res => {
                return res.data
            })
    },
    createShopList(title: string) {
        return instance.post<ResponseType<{item: GetShopListType}>>("todo-lists", {title})
            .then(res => {
                return res.data.data
            })
    },
    deleteShopList(shopListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${shopListId}`)
    },
    updateShopList(shopListId: string, title: string) {
        return instance.put(`todo-lists/${shopListId}`, {title})
    }
}

type GetShopListType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type ResponseType<T = {}> = {
    resultCode: number
    fieldErrors: []
    messages: string[]
    data: T
}