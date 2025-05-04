// axiosConfig.js

import axios from 'axios';

// Create an instance of Axios with default settings
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8083/api', // Update to match your base URL
});

// Add a request interceptor to add the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // If token is found, attach it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
