import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../axios/config";

const initialState = {
  keywords: false,
  KeywordData: [],
  keywordsLoading: false,
  keywordsErrorMessage: null,
  pages:null
};



export function getkeywords(payload) {
    console.log(payload,'reducer payload')
  return async (dispatch) => {
    dispatch(getkeywordsData());
    try {
      let result = await instance.get(`/get/keywords?page_no=1`);
      
      dispatch(getkeywordsDataSuccess(result));
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
      state.KeywordData=payload?.data?.data?.results;
      state.keywordsLoading = false;
      state.keywordsErrorMessage = null;
      state.pages=payload?.data?.total_pages;
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
