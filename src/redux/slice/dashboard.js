import { createSlice } from "@reduxjs/toolkit";
import instance from "../../axios/config";

const initialState = {
  DashboardData: [],
  isLoading: false,
  ErrorMessage: null,
};



export function getDashboardDetails() {
  return async (dispatch) => {
    dispatch(getDashboardData());
    try {
      let result = await instance.get(`/get/details`);
      dispatch(getDashboardDataSuccess(result?.data));
      console.log("first ", result?.data);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getDashboardDataFailure(message));
    }
  };
}


  export const DashboardSlice=createSlice({
    name:'dashboard',
    initialState,
    reducers:({
    getDashboardData: (state) => {
      state.isLoading = true;
      state.ErrorMessage = null;
    },
    getDashboardDataSuccess: (state, { payload }) => {
      console.log(payload,'payload')
      state.DashboardData=payload?.data;
      state.isLoading = false;
      state.ErrorMessage = null;
    },
    getDashboardDataFailure: (state, { paylaod }) => {
      state.ErrorMessage = paylaod;
      state.isLoading = false;
    },
    }),
    extraReducers:(builder)=>{
    }
});

const {
  getDashboardData,
  getDashboardDataSuccess,
  getDashboardDataFailure,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
