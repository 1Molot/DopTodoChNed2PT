import React, {useCallback} from 'react';
import './App.css';
import {ShoppingList} from "./components/ShoppingList";
import { GoodsType, ShoplistsType} from "./Typisation";
import AddItemForm from "./components/AddItemForm";
import {
    addShoplistAC,
} from "./state/shoplist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

function AppWithRedux() {
    const shoplists = useSelector<AppRootStateType, Array<ShoplistsType>>(state => state.shoplists)
    const goods = useSelector<AppRootStateType, GoodsType>(state => state.goods)
    const dispatch = useDispatch()

    const AddShopList = useCallback((shoplistTitle: string) => dispatch(addShoplistAC(shoplistTitle)), [dispatch])

    const mappedShoplists = shoplists.map((el, index) => {

        const goodsForRender = () => {
            return (el.filter === 'Not to buy')
                ? goods[el.id].filter(g => !g.inCart)
                : (el.filter === "Bought")
                    ? goods[el.id].filter(g => g.inCart)
                    : goods[el.id]
        }

        // let filteredGoods: Array<GoodType> = []
        // if (el.filter === 'All') {
        //     filteredGoods = goods[el.id]
        // }
        // if (el.filter === 'Not to buy') {
        //     filteredGoods = goods[el.id].filter(el => el.inCart !== true)
        // }
        // if (el.filter === 'Bought') {
        //     filteredGoods = goods[el.id].filter(el => el.inCart === true)
        // }

        return (
            <ShoppingList
                key={index}
                title={el.title}
                goods={goodsForRender()}
                filter={el.filter}
                shoplistId={el.id}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm callback={AddShopList}/>
            {mappedShoplists}
        </div>
    );
}

export default AppWithRedux;
