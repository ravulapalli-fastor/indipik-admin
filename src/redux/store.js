import { combineReducers, configureStore } from "@reduxjs/toolkit";
import signInReducer from './slice/sign_in';
import fileReducer from './slice/file_details';
import keywordReducer from './slice/kewords';

const rootReducer = combineReducers({
    signInReducer:signInReducer,
    fileReducer:fileReducer,
    keywordReducer:keywordReducer
});

export const store = configureStore({
    reducer: rootReducer,
});