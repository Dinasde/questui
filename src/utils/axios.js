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
    console.log("token", token);

    request.headers.token = token;
    console.log("Request", request);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log({ response });
    return response;
  },
  (error) => {
    console.log({ error });
    return Promise.reject(error);
  }
);

export default axiosInstance;
