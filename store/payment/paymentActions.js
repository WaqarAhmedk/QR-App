const { createAsyncThunk } = require('@reduxjs/toolkit');
const { axiosInstance } = require('api/axios');

export const createPayment = createAsyncThunk(
  'create/payment',
  async ({ isAnnual, selectedPlan, fromHomePage }, { rejectWithValue }) => {
    try {
      const data = {
        annualPurchase: isAnnual,
        selectedPlan: selectedPlan.toUpperCase(),
        fromHomePage: fromHomePage,
      };
      const response = await axiosInstance.post('/plan/create-plan', data);
      window.location.href = response.data;
      return response;
    } catch (err) {
      return rejectWithValue(err?.data?.message);
    }
  }
);

export const updatePayment = createAsyncThunk(
  'update/payment',
  async ({ isAnnual, selectedPlan, fromHomePage }, { rejectWithValue }) => {
    try {
      const data = {
        annualPurchase: isAnnual,
        selectedPlan: selectedPlan.toUpperCase(),
        fromHomePage: fromHomePage,
      };
      const response = await axiosInstance.post('/plan/update-plan', data);
      window.location.href = response.data;
      return response;
    } catch (err) {
      return rejectWithValue(err?.data?.message);
    }
  }
);

export const getSubscriptionInfo = createAsyncThunk(
  'get/payment',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        '/plan/subscription-info',
        data
      );
      return response;
    } catch (err) {
      return rejectWithValue(err?.data?.message);
    }
  }
);
