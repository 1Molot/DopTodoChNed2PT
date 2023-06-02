import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {Checkbox} from "./Checkbox";
import {GoodType} from "../Typisation";
import {useDispatch} from "react-redux";
import {changeGoodStatusAC, deleteGoodsAC, updateGoodTitleAC} from "../state/goods-reducer";

type GoodPropsType = GoodType & {
    shopListId: string
}

export const Good  = memo(({id,inCart,title,expectedPrice,realPrice, shopListId}: GoodPropsType) => {

    const dispatch = useDispatch()

    const expectedPriceToNumber = Number(expectedPrice.replace('$', '')) // '$5'(какое-то значнение expectedPrice ('$5' - просто пример, у нас там значения, которые сидят в массиве)) -> '5'(результат после replace) -> 5(конечный результат после Number)
    const realPriceToNumber = +realPrice.slice(1) /// '$5'(какое-то значнение realPrice ('$5' - просто пример, у нас там значения, которые сидят в массиве)) -> '5'(результат после splice(1)) -> 5(конечный результат унарного плюса - +)
    const styleForPrice = expectedPriceToNumber >= realPriceToNumber ? 'goodPrice' : 'badPrice';

    const updateGoodTitle = useCallback((goodId: string, newTitle: string) => {
        dispatch(updateGoodTitleAC(shopListId, goodId, newTitle))
    }, [dispatch, shopListId])
    const changeGoodsStatus = (goodId: string, e: ChangeEvent<HTMLInputElement>) => dispatch(changeGoodStatusAC(shopListId, goodId, e.currentTarget.checked))
    const deleteGoods = (goodID: string) => dispatch(deleteGoodsAC(shopListId, goodID))

    return (
        <li key={id} className={inCart ? 'inCart' : ''}>
            <div>
                <button onClick={() => deleteGoods(id)}>x</button>
                <EditableSpan oldTitle={title} callback={(newTitle) => updateGoodTitle(id, newTitle)}/>
            </div>
            <div className={styleForPrice}>expected price: {expectedPrice}</div>
            <div className={styleForPrice}>real price: {realPrice}</div>
            <span>in cart: </span>
            <Checkbox checked={inCart} onChange={(e) => changeGoodsStatus(id, e)}/>
            {/*<input type={'checkbox'} checked={el.inCart} onChange={changeGoodsStatusOnChangeHandler}/>*/}
        </li>
    );
});

