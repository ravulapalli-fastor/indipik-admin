import { createSlice } from "@reduxjs/toolkit";
import instance from "../../axios/config";

const initialState = {
  PlatformUsersData: [],
  isLoading: false,
  ErrorMessage: null,
  total_pages:null
};



export function getPlatformUsersDetails(payload) {
  return async (dispatch) => {
    dispatch(getPlatformUsersData());
    try {
        let url=payload?.isContributor?`/get/platform/users?is_contributor=true&page_no=${payload.page_no}`:
        `/get/platform/users?page_no=${payload.page_no}`
      let result = await instance.get(url);
      dispatch(getPlatformUsersDataSuccess(result?.data));
      console.log("first ", result?.data);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getPlatformUsersDataFailure(message));
    }
  };
}


  export const PlatformUsersSlice=createSlice({
    name:'PlatformUsers',
    initialState,
    reducers:({
    getPlatformUsersData: (state) => {
      state.isLoading = true;
      state.ErrorMessage = null;
    },
    getPlatformUsersDataSuccess: (state, { payload }) => {
      console.log(payload,'payload')
      state.PlatformUsersData=payload?.data?.results;
      state.isLoading = false;
      state.ErrorMessage = null;
      state.total_pages=payload?.data?.total_pages;
    },
    getPlatformUsersDataFailure: (state, { paylaod }) => {
      state.ErrorMessage = paylaod;
      state.isLoading = false;
    },
    }),
    extraReducers:(builder)=>{
    }
});

const {
  getPlatformUsersData,
  getPlatformUsersDataSuccess,
  getPlatformUsersDataFailure,
} = PlatformUsersSlice.actions;

export default PlatformUsersSlice.reducer;
