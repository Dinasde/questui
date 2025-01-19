// src/utils/axios.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // Set the base URL here
});

// Add an interceptor to attach the token in the headers
axiosInstance.interceptors.request.use(
  (request) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    

    request.headers.token = token;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {

    return Promise.reject(error);
  }
);

export default axiosInstance;
