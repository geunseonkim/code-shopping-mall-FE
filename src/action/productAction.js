import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  try{
    dispatch({type:types.PRODUCT_GET_REQUEST})
    const response = await api.get("/product", {
      params: {...query}
    })
    // console.log("rrrqqq", response)
    if (response.status !== 200) {
      throw new Error (response.error)
    }
    dispatch({type: types.PRODUCT_GET_SUCCESS, payload: response.data})
    // console.log("response", response.data.data)
  } catch (err) {
    dispatch({type:types.PRODUCT_GET_FAIL, payload:err.error})
  }
};

const getProductDetail = (id) => async (dispatch) => {
  try{
    dispatch({type:types.GET_PRODUCT_DETAIL_REQUEST})
    const response = await api.get(`/product/${id}`)
    console.log("rere", response)
    if (response.status !== 200) {
      throw new Error (response.error)
    }
    dispatch({type: types.GET_PRODUCT_DETAIL_SUCCESS, payload: response.data.data})
  } catch (err) {
    dispatch({type: types.GET_PRODUCT_DETAIL_FAIL, payload: err.error})
  }
};

const createProduct = (formData) => async (dispatch) => {
  try{
    dispatch({type:types.PRODUCT_CREATE_REQUEST})
    const response = await api.post("/product", formData)
    if(response.status !== 200) {
      throw new Error(response.error)
    }
    dispatch({type:types.PRODUCT_CREATE_SUCCESS})
    dispatch(commonUiActions.showToastMessage("create product complete!", "success"))

  } catch (err) {
    dispatch({type:types.PRODUCT_CREATE_FAIL, payload:err.error})
    dispatch(commonUiActions.showToastMessage(err.error, "error"))
  }
};
const deleteProduct = (id) => async (dispatch) => {};

const editProduct = (formData, id) => async (dispatch) => {};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
