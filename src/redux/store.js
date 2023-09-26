import { combineReducers, configureStore } from "@reduxjs/toolkit";
import signInReducer from './slice/sign_in';
import fileReducer from './slice/file_details'

const rootReducer = combineReducers({
    signInReducer:signInReducer,
    fileReducer:fileReducer
});

export const store = configureStore({
    reducer: rootReducer,
});