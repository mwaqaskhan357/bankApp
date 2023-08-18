import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Replace with your API's base URL
});

// Add a request interceptor to include the token in the headers
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default request;
