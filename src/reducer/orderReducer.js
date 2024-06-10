import { responsive } from "@cloudinary/react";
import * as types from "../constants/order.constants";

const initialState = {
  loading: false,
  error: "",
  orderNum: null,
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, error: "", orderNum: payload };
    case types.CREATE_ORDER_FAIL:
      return { ...state, loading: false, error: payload };
  }
  return state;
}
export default orderReducer;
