const { createAsyncThunk } = require('@reduxjs/toolkit');
const { axiosInstance } = require('api/axios');
import axios from 'axios';
import { toast } from 'react-toastify';

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload, { rejectWithValue }) => {
    console.log('resetPassword', payload);
    const newData = {
      email: payload.email,
      password: payload.password,
      resetToken: payload.token,
    };
    try {
      const response = await axiosInstance.post(
        '/auth/reset-password',
        newData
      );
      toast.success('Your Password Reset Successfully!', {
        toastId: 'password reset',
      });
      return response;
    } catch (err) {
      toast.error(err?.data?.message, {
        toastId: 'reset password',
      });
      return rejectWithValue(err?.data?.message);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/register', payload);
      // localStorage.setItem("token", response?.token?.accessToken);
      // localStorage.setItem("refreshToken", response?.token?.refreshToken);
      toast.success('Verification Email sent !');
      return response;
    } catch (err) {
      err.data.errors.map((error, index) => {
        return toast.error(error.messages[index], {
          toastId: 'account creation',
        });
      });

      return rejectWithValue(err?.data?.message);
    }
  }
);

export const logingoogle = createAsyncThunk(
  '/auth/google',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/auth/google?url=${payload}`);
      console.log('response', response);
      if (window) {
        window.open(response, '_self');
      }
    } catch (err) {
      toast.error('Email Or Password Incorrect', {
        toastId: 'reset password',
      });
      return rejectWithValue(err?.data?.message);
    }
  }
);
export const logingoogleSuccess = createAsyncThunk(
  '/auth/google/loginsuces',
  async ({ code, url }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/auth/google/success?code=${code}&url=${url}`
      );

      localStorage.setItem('token', response?.token?.accessToken);
      localStorage.setItem('refreshToken', response?.token?.refreshToken);
      localStorage.setItem('token', response?.token?.accessToken);
      const userObject = {
        email: response?.user?.email,
        userId: response?.user?.id,
        role: response?.user?.role,
      };
      localStorage.setItem('user', JSON.stringify(userObject));
      return response;
    } catch (err) {
      toast.error(err.message, {
        toastId: 'google login eror',
      });
      return rejectWithValue(err?.data?.message);
    }
  }
);
export const login = createAsyncThunk(
  '/auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', payload);
      console.log('lOGIN rESPONSED', response);

      if (response === undefined) {
        toast.error('Email Or Password Incorrect', {
          toastId: 'reset password',
        });
        return;
      }
      localStorage.setItem('token', response?.token?.accessToken);
      const userObject = {
        email: response?.user?.email,
        userId: response?.user?.id,
        role: response?.user?.role,
      };

      localStorage.setItem('user', JSON.stringify(userObject));
      return response;
    } catch (err) {
      console.log('eer in login', err);
      if (err.status === 401) {
        toast.error(err.message, {
          toastId: 'reset password',
        });
      }
      if (err.status === 500) {
        toast.error(err.data.message, {
          toastId: 'reset password',
        });
      }
      return rejectWithValue(err?.status);
    }
  }
);
export const validateToken = createAsyncThunk(
  'validate-token',
  async (data, { rejectWithValue }) => {
    try {
      const { token, email } = data;
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
      const response = await axiosInstance.post('/auth/validateToken', {
        email: email,
      });

      // localStorage.setItem("token", response?.accessToken);
      return response;
    } catch (err) {
      return rejectWithValue(err?.data?.message);
    }
  }
);

export const verifyToken = createAsyncThunk(
  'verify-user-blacklist',
  async (token, { rejectWithValue }) => {
    try {
      if (token) {
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token}`;
      }
      const response = await axiosInstance.post('/auth/verify-user-blacklist');
      return response;
    } catch (err) {
      return rejectWithValue(err?.data?.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      localStorage.removeItem('userInfo');

      return response;
    } catch (err) {
      return rejectWithValue(err?.data?.message);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  'forgetpassword/sendEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/send-password-reset', {
        email,
      });
      toast.success('Check your email We send You a link!', {
        toastId: 'reset password',
      });
      return response;
    } catch (err) {
      console.log('forget password error err', err);
      toast.error(err?.data?.message, {
        toastId: 'reset password',
      });
      return rejectWithValue(err?.data?.message);
    }
  }
);

export const createQrCode = createAsyncThunk(
  'Qr/CreateQr',
  async (payload, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.post(
      //   '/create/payload',
      //   { email }
      // )
      // toast.success('Check your email We send You a link!', {
      //   toastId: 'reset password'
      // })
      // return response
    } catch (err) {
      toast.error(err?.data?.message, {
        toastId: 'reset password',
      });
      return rejectWithValue(err?.data?.message);
    }
  }
);
export const sendVerificationEmail = createAsyncThunk(
  'send-verification-email',
  async (email, { rejectWithValue }) => {
    try {
      console.log('sendVerificationEmail email: ' + email);
      const response = await axiosInstance.post('/auth/verificationEmail', {
        email: email,
      });
      console.log('validateToken', response);
      toast.success('email verification sent successfully');
      return response;
    } catch (err) {
      return rejectWithValue(err?.data?.message);
    }
  }
);
