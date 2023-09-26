import axios from "axios";
import { toast } from "react-toastify";
export const BaseUrl = "https://indipik-stage-api.fastor.ai"

const instance = axios.create({
  baseURL: BaseUrl + '/admin',
});

let token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5Mzk3Nzc2NCwiZXhwIjoxNjk2NTY5NzY0fQ.0Ajhh_FvMwi8nH7jXv8bOAd75oG-HBgv2WKBa11Hr64';

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
