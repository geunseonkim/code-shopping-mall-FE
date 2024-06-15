import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import commonUiReducer from "./commonUIReducer";
import orderReducer from "./orderReducer";
import favoriteReducer from "./favoriteReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    ui: commonUiReducer,
    order: orderReducer,
    favorite: favoriteReducer,
  },
});
export default store;
