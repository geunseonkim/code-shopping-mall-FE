import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    const response = await api.post("/order", payload);
    dispatch({
      type: types.CREATE_ORDER_SUCCESS,
      payload: response.data.orderNum,
    });
    console.log("payload", response);
    dispatch(cartActions.getCartQty());
    navigate("/payment/success");
  } catch (err) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_REQUEST });
    const response = await api.get("/order/me");
    dispatch({ type: types.GET_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_FAIL, error: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};
const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_LIST_REQUEST });
    const response = await api.get("/order", {
      params: { ...query },
    });
    dispatch({
      type: types.GET_ORDER_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_LIST_FAIL, error: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};

const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST });
    const response = await api.put(`/order/${id}`, { status });
    dispatch({
      type: types.UPDATE_ORDER_SUCCESS,
      payload: response.data,
    });
    dispatch(
      commonUiActions.showToastMessage("success order update", "success")
    );
    dispatch(getOrderList({ page: 1 }));
  } catch (error) {
    dispatch({ type: types.UPDATE_ORDER_FAIL, error: error });
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
