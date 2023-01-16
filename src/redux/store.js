import { configureStore, combineReducers } from "@reduxjs/toolkit";
// state yönetimi için redux kullandım.
import authReducer from "./slice/authSlice"

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = configureStore({
    reducer: rootReducer,
})

export default store;
