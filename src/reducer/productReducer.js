import * as types from "../constants/product.constants";
const initialState = {
  loading: false,
  error: "",
  productList:[]
};

function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case types.PRODUCT_CREATE_REQUEST:
    case types.PRODUCT_GET_REQUEST:
      return {...state, loading: false}
    case types.PRODUCT_CREATE_SUCCESS:
      return {...state, loading: false, error: ""}
    case types.PRODUCT_GET_SUCCESS:
      return {...state, loading: false, error: "", productList: payload}
    case types.CLEAR_ERROR:  // 오류 초기화 액션 처리
      return { ...state, error: "" };
    case types.PRODUCT_CREATE_FAIL:
    case types.PRODUCT_GET_FAIL:
      return {...state, loading: false, error: payload}
    default:
    return state
  }
}

export default productReducer;
