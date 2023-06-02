import React, {ChangeEvent, memo, useCallback} from "react";
import {FilterValue, GoodType} from "../Typisation";
import {Checkbox} from "./Checkbox";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addGoodsAC, changeGoodStatusAC, deleteGoodsAC, updateGoodTitleAC} from "../state/goods-reducer";
import {changeFilterValueAC, deleteShoplistAC, updateShoplistTitleAC} from "../state/shoplist-reducer";
import {Good} from "./Good";
import {AppRootStateType} from "../state/store";

export type ShoppingListPropsType = {
    title: string
    goods: GoodType[]
    filter: FilterValue
    shoplistId: string
}

export const ShoppingList = memo((props: ShoppingListPropsType) => {

    console.log("ShoppingList called")



    const dispatch = useDispatch()



    const updateShoplistTitle = useCallback((newTitle: string) => {
        dispatch(updateShoplistTitleAC(props.shoplistId, newTitle))
    }, [dispatch, props.shoplistId])



    const addGoods = (newTitle: string) => dispatch(addGoodsAC(props.shoplistId, newTitle))
    const changeFilterValue = (filter: FilterValue) => dispatch(changeFilterValueAC(props.shoplistId, filter))
    const deleteTodoList = () => dispatch(deleteShoplistAC(props.shoplistId))




    const mappedGoods = props.goods.map((el, index) => {

        // const changeGoodsStatusOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //     props.changeGoodsStatus(props.shoplistId, el.id, e.currentTarget.checked)
        // }



        // const updateGoodTitleHandler = (newTitle: string) => {
        //     props.updateGoodTitle(props.shoplistId, el.id, newTitle)
        // }

        return (
          <>
              <Good
                  key={el.id}
                  shopListId={props.shoplistId}
                  {...el}
              />
          </>
        )
    })

    const sumOfGoodsInCart = props.goods
        .filter(el => el.inCart === true)
        .reduce((previousValue, current) => previousValue + Number(current.realPrice.slice(1)), 0);



    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} callback={updateShoplistTitle}/>
                <button onClick={deleteTodoList}>X</button>
            </h3>
            <div>
                <AddItemForm callback={addGoods}/>
                {sumOfGoodsInCart
                    ? <div>Sum of items in the cart - <strong>{sumOfGoodsInCart}</strong></div>
                    : <div>Please add item in the cart</div>
                }
            </div>
            <ul>
                {mappedGoods}
            </ul>
            <div>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button
                        variant={props.filter === "All" ? "contained" : "outlined"}
                        onClick={() => changeFilterValue("All")}
                    >All
                    </Button>
                    <Button
                        variant={props.filter === "Not to buy" ? "contained" : "outlined"}
                        onClick={() => changeFilterValue("Not to buy")}
                    >Not to buy
                    </Button>
                    <Button
                        variant={props.filter === "Bought" ? "contained" : "outlined"}
                        onClick={() => changeFilterValue("Bought")}
                    >Bought
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
})
