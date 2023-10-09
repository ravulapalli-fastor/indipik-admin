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
  isAuth:false
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
      
      dispatch(getLoginDataSuccess(result?.data));
      console.log("first login", result);
            localStorage.setItem("adminToken", result?.data?.admin?.token);
            localStorage.setItem("adminData", JSON.stringify(result?.data?.admin));
      // toast.success(result?.data?.message || "OTP send Successfully", {toastId:"otpsendId"});
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getLoginDataFailure(message));
    }
  };
}

export function forgotLoginPassword(paylaod) {
  return async (dispatch) => {
    dispatch(getregisterData());
    try {
      let result = await instance.post("/forgot", 
        paylaod,
      );
      console.log("otp resend ", result);
      toast.success(result?.message || "OTP resend Successfully!", {toastId:"forgotOtpsendId"});
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getregisterDataFailure(message));
    }
  };
}

export function IsAuth(){
  return async (dispatch) => { 
  let auth=localStorage.getItem("adminData")?true:false;
  console.log(auth)
  // dispatch(getIsAuth(auth));
  return auth;
  }
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
      state.userData=payload?.admin;
      state.loginLoading = false;
      state.loginErrorMessage = null;
    },
    getLoginDataFailure: (state, { paylaod }) => {
      state.login = false;
      state.loginErrorMessage = paylaod;
      state.loginLoading = false;
    // },
    // getIsAuth:(state, { paylaod}) => {
    //   console.log("payload successs",payload);
    //   state.login = false;
    //   // state.isAuth=payload;
    //   state.loginErrorMessage = paylaod;
    //   state.loginLoading = false;
    },
    }),
    extraReducers:(builder)=>{
    }
});

const {
  getLoginData,
  getLoginDataSuccess,
  getLoginDataFailure,
  getIsAuth

//   getVerificationData,
//   getVerificationDataSuccess,
//   getVerificationDataFailure,
} = loginSlice.actions;

export default loginSlice.reducer;
