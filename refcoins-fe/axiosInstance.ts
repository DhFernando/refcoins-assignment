// axiosInstance.ts
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
   
  (config: InternalAxiosRequestConfig) => {
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL )
    // Do something before the request is sent, like adding authorization tokens
    // const token = localStorage.getItem('token');  
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => { 
    // Do something with response data
    return response;
  },
  (error) => { 
    // Do something with response error
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login) 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
