
import axios from "axios";
import { API_BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // needed for cookies/sessions
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: add interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // handle global errors like 401 unauthorized
    if (error.response?.status === 401) {
      console.error("Unauthorized! You might need to login again.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
