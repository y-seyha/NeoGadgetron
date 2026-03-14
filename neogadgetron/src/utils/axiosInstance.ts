import axios from "axios";
import { API_BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor (if you want to add tokens later)
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: attach Authorization header if token exists
    // const token = localStorage.getItem("token");
    // if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response, // just return response for now
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized! You might need to login again.");
      // Optionally: redirect to login page
      // window.location.href = "/login";
    } else if (status === 403) {
      console.warn(
        "Forbidden! You don't have permission to access this resource.",
      );
    } else if (status && status >= 500) {
      console.warn("Server error! Please try again later.");
    } else if (!status) {
      console.warn("Network or unknown error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
