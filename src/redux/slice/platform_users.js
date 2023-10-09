import { createSlice } from "@reduxjs/toolkit";
import instance from "../../axios/config";

const initialState = {
  PlatformUsersData: [],
  isLoading: false,
  ErrorMessage: null,
  total_pages:null
};



export function getPlatformUsersDetails(isContributor) {
  return async (dispatch) => {
    dispatch(getPlatformUsersData());
    try {
        let url=isContributor?`/get/platform/users?is_contributor=true`:
        `/get/platform/users`
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
