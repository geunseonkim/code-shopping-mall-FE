import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";

const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({type: types.LOGIN__WITH_TOKEN_REQUEST})
    const response = await api.get("/user/me")
    if (response.status !== 200) {
      throw new Error(response.error)
    }
    // console.log("rrrr", response)
    dispatch({type: types.LOGIN__WITH_TOKEN_SUCCESS, payload: response.data})
    console.log("rrrr", response)
  } catch (err) {
    dispatch({type: types.LOGIN__WITH_TOKEN_FAIL, payload: err.error})
    dispatch(logout())
  }
};

const loginWithEmail = ({email, password}) => async (dispatch) => {
  try {
    dispatch({type: types.LOGIN_REQUEST})
    const response = await api.post("/auth/login", {email, password})
    if (response.status !== 200) {
      throw new Error (response.error)
    }
    sessionStorage.setItem("token", response.data.token)
    dispatch({type:types.LOGIN_SUCCESS, payload: response.data})
  } catch (err) {
    dispatch({type:types.LOGIN_FAIL, payload: err.error})
  }
};


const logout = () => async (dispatch) => {
  // delete user info
  dispatch({type:types.LOGOUT})
  // delete session token value
  sessionStorage.removeItem("token")
};

const loginWithGoogle = (token) => async (dispatch) => {};

const registerUser =
  ({ email, name, password }, navigate) =>
  async (dispatch) => {
    try{
      dispatch({type:types.REGISTER_USER_REQUEST})
      const response = await api.post("/user", {email, name, password})
      if (response.status !== 200) {
       throw new Error (response.error)
      }
      dispatch({type:types.REGISTER_USER_SUCCESS})
      dispatch(commonUiActions.showToastMessage("회원가입 완료!", "success"))
      navigate("/login")
    }catch(err) {
      dispatch({type:types.REGISTER_USER_FAIL, payload: err.error})
    }
  };

const clearError = () => ({ type: types.CLEAR_ERROR });

export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
  clearError,
};
