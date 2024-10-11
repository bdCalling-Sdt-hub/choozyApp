import axios from 'axios';
import {getStorageToken} from '../../utils/utils';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.11.160:7000/api/',
  timeout: 10000,
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  config => {
    const token = getStorageToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the token in the headers
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
