const { createAsyncThunk } = require('@reduxjs/toolkit');
const { axiosInstance } = require('api/axios');
import { toast } from 'react-toastify';

export const saveQrCode = createAsyncThunk(
  'saveQrCode',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/qr`, payload);

      return response;
    } catch (err) {
      console.log(err.status);
      if (err.status === 402) {
        window.location.href = '/plan-expired';
        toast.info(err?.data?.error, {
          toastId: 'Qr code creation',
        });
      } else {
        toast.error('There is a problem', {
          toastId: 'Qr code creation',
        });
      }

      return rejectWithValue(err?.data?.message);
    }
  }
);

export const setAnalytics = createAsyncThunk(
  'setAnalytics',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/analytics`, payload);
      return response;
    } catch (err) {
      toast.error('There is a problem!', {
        toastId: 'There is a problem while adding analytics',
      });
      return rejectWithValue(err?.data?.message);
    }
  }
);

export const getQrCode = createAsyncThunk(
  'get/Qr/code',
  async (qrId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/qr/${qrId}`);

      return response;
    } catch (err) {
      toast.error('There is a problem!', {
        toastId: 'There is a problem while fetching qr',
      });
      return rejectWithValue(err?.data?.message);
    }
  }
);

export const uploadFileGCP = createAsyncThunk(
  'upload/file/gcp',
  async (file, { rejectWithValue }) => {
    const form = new FormData();

    for (let i = 0; i < file.length; i++) {
      form.append('files', file[i]);
    }

    try {
      const response = await axiosInstance.post(`/resource`, form);
      return response;
    } catch (err) {
      toast.error('err while uploading file', {
        toastId: 'There is a problem while fetching qr',
      });
      return rejectWithValue(err?.data?.message);
    }
  }
);

export const updateTheQrCode = createAsyncThunk(
  'updateQrCode',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/qr/${id}`, {
        ...payload,
      });

      return response;
    } catch (err) {
      toast.error('There is a problem!', {
        toastId: 'Qr Code Creation Failed',
      });
      return rejectWithValue(err?.data?.message);
    }
  }
);
export const getTemplates = createAsyncThunk(
  'get-Templates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/template/`);

      return response;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);
