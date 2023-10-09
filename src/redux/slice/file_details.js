import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../axios/config";

const initialState = {
  fileDetails: false,
  fileData: [],
  fileDetailsLoading: false,
  fileDetailsErrorMessage: null,
  total_pages:null,
  singleFileDetails:null
};



export function getFileDetails(payload) {
    console.log(payload,'reducer payload')
  return async (dispatch) => {
    dispatch(getfileDetailsData());
    try {
      let url =payload?.filterSelected ? 
      `/get/file/details?type=${payload.type}&status=${payload.filterSelected}&page_no=${payload.page_no}`
      :`/get/file/details?type=${payload.type}&page_no=${payload.page_no}`
      let result = await instance.get(url);
      dispatch(getfileDetailsDataSuccess({
        data:result?.data?.data?.results,
        total_pages:result?.data?.data?.total_pages
      }));
      console.log("first fileDetails", result);
    //   toast.success(result?.message || "OTP send Successfully", {toastId:"otpsendId"});
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getfileDetailsDataFailure(message));
    }
  };
}

export function getInReviewFileDetails(payload) {
    console.log(payload,'reducer payload')
  return async (dispatch) => {
    dispatch(getfileDetailsData());
    try {
      let result = await instance.get(`/inreview/files?type=${payload.type}&page_no=${payload.page_no}`);
      dispatch(getfileDetailsDataSuccess({
        data:result?.data?.message,
        total_pages:result?.data?.total_pages||1
      }));
      console.log("first inreview fileDetails", result);
    //   toast.success(result?.message || "OTP send Successfully", {toastId:"otpsendId"});
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getfileDetailsDataFailure(message));
    }
  };
}

export const getSingleFileDetails=(payload)=>{
  return async (dispatch)=>{
    dispatch(getfileDetailsData());
    console.log(payload,"payload single file")
    try{
      let result = await instance.get(`/single/file/details?type=${payload.type}&status=${payload.status}&media_id=${payload.media_id}`);
      console.log(result,"file single data");
      dispatch(getSingleFileDetailsSuccess(result?.data))
    }catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getfileDetailsDataFailure(message));
    }
  }
}

export const fileApprove=(payload)=>{
  return async (dispatch)=>{
    dispatch(getfileDetailsData());
    try{
      let result = await instance.post('/approve/file',payload);
      console.log(result,"file approve data")
    }catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getfileDetailsDataFailure(message));
    }
  }
}

export const fileRemove=(payload)=>{
  return async (dispatch)=>{
    dispatch(getfileDetailsData());
    try{
      let result = await instance.put('/file/remove',payload);
      console.log(result,"file approve data")
    }catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getfileDetailsDataFailure(message));
    }
  }
}

  export const fileDetailsSlice=createSlice({
    name:'fileDetails',
    initialState,
    reducers:({
    getfileDetailsData: (state) => {
      state.fileDetails = false;
      state.fileDetailsLoading = true;
      state.fileDetailsErrorMessage = null;
    },
    getfileDetailsDataSuccess: (state, { payload }) => {
      state.fileDetails = true;
      state.fileData=payload?.data;
      state.fileDetailsLoading = false;
      state.fileDetailsErrorMessage = null;
      state.total_pages=payload?.total_pages
    },
    getSingleFileDetailsSuccess: (state, { payload }) => {
      state.fileDetails = true;
      state.singleFileDetails=payload?.message;
      state.fileDetailsLoading = false;
      state.fileDetailsErrorMessage = null;
      state.total_pages=payload?.total_pages
    },
    getfileDetailsDataFailure: (state, { paylaod }) => {
      state.fileDetails = false;
      state.fileDetailsErrorMessage = paylaod;
      state.fileDetailsLoading = false;
    },
    }),
    extraReducers:(builder)=>{
    }
});

const {
  getfileDetailsData,
  getfileDetailsDataSuccess,
  getfileDetailsDataFailure,
  getSingleFileDetailsSuccess
} = fileDetailsSlice.actions;

export default fileDetailsSlice.reducer;
