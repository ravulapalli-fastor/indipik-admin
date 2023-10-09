import { createSlice } from "@reduxjs/toolkit";
import instance from "../../axios/config";

const initialState = {
  UserManagementData: [],
  isLoading: false,
  ErrorMessage: null,
  RoleManagementData:[],
  total_pages:null
};



export function getUserManagementDetails() {
  return async (dispatch) => {
    dispatch(getUserManagementData());
    try {
      let result = await instance.get(`/get/details`);
      dispatch(getUserManagementDataSuccess(result?.data));
      console.log("first ", result?.data);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getUserManagementDataFailure(message));
    }
  };
}

export function getUserManagementRoleDetails() {
  return async (dispatch) => {
    dispatch(getUserManagementData());
    try {
      let result = await instance.get(`/get/role/details`);
      dispatch(getUserManagementRoleSuccess(result?.data));
      console.log("first ", result?.data);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(getUserManagementDataFailure(message));
    }
  };
}


  export const UserManagementSlice=createSlice({
    name:'UserManagement',
    initialState,
    reducers:({
    getUserManagementData: (state) => {
      state.isLoading = true;
      state.ErrorMessage = null;
    },
    getUserManagementDataSuccess: (state, { payload }) => {
      console.log(payload,'payload')
      state.UserManagementData=payload?.data;
      state.isLoading = false;
      state.ErrorMessage = null;
      state.total_pages=payload?.total_pages
    },
    getUserManagementRoleSuccess: (state, { payload }) => {
      console.log(payload,'payload')
      state.RoleManagementData=payload?.data;
      state.isLoading = false;
      state.ErrorMessage = null;
      state.total_pages=payload?.total_pages
    },
    getUserManagementDataFailure: (state, { paylaod }) => {
      state.ErrorMessage = paylaod;
      state.isLoading = false;
    },
    }),
    extraReducers:(builder)=>{
    }
});

const {
  getUserManagementData,
  getUserManagementDataSuccess,
  getUserManagementDataFailure,
  getUserManagementRoleSuccess
} = UserManagementSlice.actions;

export default UserManagementSlice.reducer;
