import axios from 'axios';
import { toast } from 'react-toastify';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_QR_API,
});

// export const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3001/v1',
// });

// export const axiosInstance = axios.create({
//   baseURL: process.env.API_URL,
// });

axiosInstance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');
    if (window.location.href.includes('/create-qr')) {
      const urlParams = new URLSearchParams(window.location.search);
      token = urlParams.get('token');
    }
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
      config.headers.Accept = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/signin'
      return;
    }
    return Promise.reject(error.response);
  }
);
