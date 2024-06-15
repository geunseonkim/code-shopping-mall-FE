import api from "../utils/api";
import * as types from "../constants/favorite.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getFavorite = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_FAVORITE_REQUEST });
    const response = await api.get("/favorite");
    dispatch({ type: types.GET_FAVORITE_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.GET_FAVORITE_FAIL, payload: err.error });
  }
};

const addFavorite = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_FAVORITE_REQUEST });
    const response = await api.put(`/favorite/${id}`);
    dispatch({ type: types.ADD_FAVORITE_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage("상품을 찜했습니다!", "success"));
    dispatch(getFavorite());
  } catch (err) {
    dispatch({ type: types.ADD_FAVORITE_FAIL, payload: err.error });

    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const deleteFavorite = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_FAVORITE_REQUEST });
    const response = await api.delete(`/favorite/${id}`);
    dispatch({ type: types.DELETE_FAVORITE_SUCCESS, payload: response.data });
    dispatch(
      commonUiActions.showToastMessage(
        "상품의 찜하기를 취소했습니다!",
        "success"
      )
    );
    dispatch(getFavorite());
  } catch (err) {
    dispatch({ type: types.DELETE_FAVORITE_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

export const favoriteAction = {
  getFavorite,
  addFavorite,
  deleteFavorite,
};
