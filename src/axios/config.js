import axios from "axios";
import { toast } from "react-toastify";
export const BaseUrl = "https://indipik-stage-api.fastor.ai"

const instance = axios.create({
  baseURL: BaseUrl + '/admin',
});

let token =  '';
if (typeof window !== 'undefined') {
  // localStorage is defined
  token=localStorage.getItem("adminToken");
}
// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5NTk5MTg1OSwiZXhwIjoxNjk4NTgzODU5fQ.P2ghsRSDHt5_NvsoAJhUnpmylfoCLv2PJQ2iFtX9U5Y';

// Request Interceptor  localStorage.getItem("adminToken") ||
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response.data?.message || "Something went wrong";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default instance;
