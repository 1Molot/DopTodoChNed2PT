
export type FilterValue = "All" | "Not to buy" | "Bought"

export type ShoplistsType = {
    id: string
    title: string
    filter: FilterValue
}

export type GoodsType = {
    [shoplistId: string]: GoodType[]
}

export type GoodType = {
    id: string
    title: string
    expectedPrice: string
    realPrice: string
    inCart: boolean
}