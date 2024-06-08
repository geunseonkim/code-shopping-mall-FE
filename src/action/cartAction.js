import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";
const addToCart = ({ id, size }) => async (dispatch) => {
  try {
    dispatch({type:types.ADD_TO_CART_REQUEST})
    const response = await api.post("/cart", {productId: id, size, qty: 1})
    console.log("addToCart", response)
    if(response.status !== 200) {
      throw new Error (response.error)
    }
    dispatch({type: types.ADD_TO_CART_SUCCESS, payload: response.data.cartItemQty }) // 수정됨!
    dispatch(commonUiActions.showToastMessage("add the product in your cart", "success"))
  } catch (err) {
    dispatch({type:types.ADD_TO_CART_FAIL, payload: err.error})
    dispatch(commonUiActions.showToastMessage(err.error, "error"))
  }

  };

const getCartList = () => async (dispatch) => {
  try{
    dispatch({type: types.GET_CART_LIST_REQUEST})
    const response = await api.get("/cart")
    console.log("getCartList", response)
    if(response.status !== 200) {
      throw new Error (response.err)
    }
    dispatch({type:types.GET_CART_LIST_SUCCESS, payload: response.data.data})
  } catch (err) {
    dispatch({type:types.GET_CART_LIST_FAIL, payload: err.error})
  }
};

const deleteCartItem = (id) => async (dispatch) => {};

const updateQty = (id, value) => async (dispatch) => {};
const getCartQty = () => async (dispatch) => {};
export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
