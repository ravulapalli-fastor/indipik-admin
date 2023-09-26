import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../axios/config";

const initialState = {
  login: false,
  userData: {},
  loginLoading: false,
  loginErrorMessage: null,
  verification: false,
  verificationLoading: false,
  verificationErrorMessage: null,
};



export function adminRegister(paylaod) {
  return async (dispatch) => {
    dispatch(getLoginData());
    try {
      let result = await instance.post("/register", paylaod);
      result = result.data;
      
      dispatch(getLoginDataSuccess(true));
      console.log("first login", result);
      toast.success(result?.message || "OTP send Successfully", {toastId:"otpsendId"});
    } catch (error) {
      const message = error.response.data?.message || "Something went wrong";
      dispatch(getLoginDataFailure(message));
    }
  };
}

export function adminLogin(paylaod) {
  return async (dispatch) => {
    dispatch(getLoginData());
    try {
      let result = await instance.post("/login", 
        paylaod,
      );
      
      dispatch(getLoginDataSuccess(true));
      console.log("first login", result);
            localStorage.setItem("adminToken", result?.admin?.token);
            localStorage.setItem("adminData", JSON.stringify(result?.admin));
      toast.success(result?.message || "OTP send Successfully", {toastId:"otpsendId"});
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getLoginDataFailure(message));
    }
  };
}


  export const loginSlice=createSlice({
    name:'adminSignin',
    initialState,
    reducers:({
    getLoginData: (state) => {
      state.login = false;
      state.loginLoading = true;
      state.loginErrorMessage = null;
    },
    getLoginDataSuccess: (state, { payload }) => {
      state.login = true;
      state.loginLoading = false;
      state.loginErrorMessage = null;
    },
    getLoginDataFailure: (state, { paylaod }) => {
      state.login = false;
      state.loginErrorMessage = paylaod;
      state.loginLoading = false;
    },
    }),
    extraReducers:(builder)=>{
    }
});

const {
  getLoginData,
  getLoginDataSuccess,
  getLoginDataFailure,

//   getVerificationData,
//   getVerificationDataSuccess,
//   getVerificationDataFailure,
} = loginSlice.actions;

export default loginSlice.reducer;
