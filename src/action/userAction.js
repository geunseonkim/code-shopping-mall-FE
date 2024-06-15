import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";

const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN__WITH_TOKEN_REQUEST });
    const response = await api.get("/user/me");
    dispatch({ type: types.LOGIN__WITH_TOKEN_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.LOGIN__WITH_TOKEN_FAIL, payload: err.error });
    dispatch(logout());
  }
};

const loginWithEmail =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.LOGIN_REQUEST });
      const response = await api.post("/auth/login", { email, password });
      sessionStorage.setItem("token", response.data.token);
      dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: types.LOGIN_FAIL, payload: err.error });
    }
  };

const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT });
  sessionStorage.removeItem("token");
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post("/auth/google", { token });
    sessionStorage.setItem("token", response.data.token);
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const registerUser =
  ({ email, name, password }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const response = await api.post("/user", { email, name, password });
      dispatch({ type: types.REGISTER_USER_SUCCESS });
      dispatch(commonUiActions.showToastMessage("회원가입 완료!", "success"));
      navigate("/login");
    } catch (err) {
      dispatch({ type: types.REGISTER_USER_FAIL, payload: err.error });
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
