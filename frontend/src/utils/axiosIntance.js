import axios from "axios";
import { API_BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Inceptor

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response Interceptor

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response ) {
        if (error.response.status === 401) {
            window.location.href = "/login";
        }else if (error.response.status === 500) {
           console.error("Internal Server Error:", error.response.data);
        }else if(error.code === 'ECONNABORTED') {
            console.error("Request timed out. Please try again later.");
        }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;