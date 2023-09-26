import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../axios/config";

const initialState = {
  fileDetails: false,
  fileData: [],
  fileDetailsLoading: false,
  fileDetailsErrorMessage: null,
  total_pages:null
};



export function getFileDetails(payload) {
    console.log(payload,'reducer payload')
  return async (dispatch) => {
    dispatch(getfileDetailsData());
    try {
      let result = await instance.get(`/get/file/details?type=${payload.type}&page_no=${payload.page_no}`);
      
      dispatch(getfileDetailsDataSuccess(result));
      console.log("first fileDetails", result);
    //   toast.success(result?.message || "OTP send Successfully", {toastId:"otpsendId"});
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getfileDetailsDataFailure(message));
    }
  };
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
      state.fileData=payload?.data?.data?.results;
      state.fileDetailsLoading = false;
      state.fileDetailsErrorMessage = null;
      state.total_pages=payload?.data?.data?.total_pages
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
} = fileDetailsSlice.actions;

export default fileDetailsSlice.reducer;
