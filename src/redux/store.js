import { combineReducers, configureStore } from "@reduxjs/toolkit";
import signInReducer from './slice/sign_in';
import fileReducer from './slice/file_details';
import keywordReducer from './slice/kewords';
import dashboardReducer from './slice/dashboard';
import registerReducer from './slice/register';
import platformUserReducer from './slice/platform_users';

const rootReducer = combineReducers({
    signInReducer:signInReducer,
    fileReducer:fileReducer,
    keywordReducer:keywordReducer,
    registerReducer,
    dashboardReducer,
    platformUserReducer
});

export const store = configureStore({
    reducer: rootReducer,
});