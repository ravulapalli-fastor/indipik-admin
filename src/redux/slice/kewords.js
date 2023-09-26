import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../axios/config";

const initialState = {
  keywords: false,
  KeywordData: {},
  keywordsLoading: false,
  keywordsErrorMessage: null,
  verification: false,
  verificationLoading: false,
  verificationErrorMessage: null,
};



export function getkeywords(payload) {
    console.log(payload,'reducer payload')
  return async (dispatch) => {
    dispatch(getkeywordsData());
    try {
      let result = await instance.get(`/get/keywords?type=IMAGE&page_no=1`);
      
      dispatch(getkeywordsDataSuccess(true));
      console.log("first keywords", result);
    //   toast.success(result?.message || "OTP send Successfully", {toastId:"otpsendId"});
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getkeywordsDataFailure(message));
    }
  };
}


  export const keywordsSlice=createSlice({
    name:'keywords',
    initialState,
    reducers:({
    getkeywordsData: (state) => {
      state.keywords = false;
      state.keywordsLoading = true;
      state.keywordsErrorMessage = null;
    },
    getkeywordsDataSuccess: (state, { payload }) => {
      state.keywords = true;
      state.KeywordData=payload;
      state.keywordsLoading = false;
      state.keywordsErrorMessage = null;
    },
    getkeywordsDataFailure: (state, { paylaod }) => {
      state.keywords = false;
      state.keywordsErrorMessage = paylaod;
      state.keywordsLoading = false;
    },
    }),
    extraReducers:(builder)=>{
    }
});

const {
  getkeywordsData,
  getkeywordsDataSuccess,
  getkeywordsDataFailure,
} = keywordsSlice.actions;

export default keywordsSlice.reducer;
