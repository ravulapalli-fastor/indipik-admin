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
      let result = await instance.get(`/get/keywords?page_no=${payload?.page_no}`);
      
      dispatch(getkeywordsDataSuccess(result));
      console.log("first keywords", result);
    //add/keyword   toast.success(result?.message || "OTP send Successfully", {toastId:"otpsendId"});
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getkeywordsDataFailure(message));
    }
  };
}

export function addkeywords(payload) {
    console.log(payload,'reducer payload')
  return async (dispatch) => {
    dispatch(getkeywordsData());
    try {
      let result = await instance.post(`/add/keyword`,payload);
      console.log("add new keywords", result?.data);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getkeywordsDataFailure(message));
    }
  };
}

export function deletekeyword(id) {
  return async (dispatch) => {
    dispatch(getkeywordsData());
    try {
      let result = await instance.put(`/delete/keyword?keyword_id=${Number(id)}`);
      console.log("add delete keywords", result?.data);
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
      state.pages=payload?.data?.data?.total_pages;
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
