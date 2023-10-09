import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../axios/config";

const initialState = {
  register: false,
  userData: {},
  registerLoading: false,
  registerErrorMessage: null,
  verification: false,
  verificationLoading: false,
  verificationErrorMessage: null,
};


export function adminRegister(paylaod) {
  return async (dispatch) => {
    dispatch(getregisterData());
    try {
      let result = await instance.post("/register", paylaod);
      result = result.data;
      dispatch(getregisterDataSuccess(true));
      console.log("first register", result);
      toast.success(result?.data?.message || "OTP send Successfully", {toastId:"otpsendId"});
    } catch (error) {
      const message = error.response.data?.message || "Something went wrong";
      dispatch(getregisterDataFailure(message));
    }
  };
}

export function verifyRegisterOtp(paylaod) {
  return async (dispatch) => {
    dispatch(getregisterData());
    try {
      let result = await instance.post("/verify/otp", 
        paylaod,
      );
      console.log("otp verify", result);
      toast.success(result?.data?.message || "OTP verified!", {toastId:"verifyOtpsendId"});
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getregisterDataFailure(message));
    }
  };
}

export function resendRegisterOtp(paylaod) {
  return async (dispatch) => {
    dispatch(getregisterData());
    try {
      let result = await instance.post("/send/email/otp", 
        paylaod,
      );
      console.log("otp resend ", result);
      toast.success(result?.message || "OTP resend successfully!", {toastId:"resendOtpsendId"});
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getregisterDataFailure(message));
    }
  };
}

  export const registerSlice=createSlice({
    name:'adminSignin',
    initialState,
    reducers:({
    getregisterData: (state) => {
      state.register = false;
      state.registerLoading = true;
      state.registerErrorMessage = null;
    },
    getregisterDataSuccess: (state, { payload }) => {
      state.register = true;
      state.registerLoading = false;
      state.registerErrorMessage = null;
    },
    getregisterDataFailure: (state, { paylaod }) => {
      state.register = false;
      state.registerErrorMessage = paylaod;
      state.registerLoading = false;
    },
    }),
    extraReducers:(builder)=>{
    }
});

const {
  getregisterData,
  getregisterDataSuccess,
  getregisterDataFailure,

//   getVerificationData,
//   getVerificationDataSuccess,
//   getVerificationDataFailure,
} = registerSlice.actions;

export default registerSlice.reducer;
