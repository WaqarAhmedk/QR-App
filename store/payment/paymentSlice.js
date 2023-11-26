import { createSlice, current } from '@reduxjs/toolkit';
import { createFolder, getUserQrFolders } from '../folders/foldersActions';
import {
  createPayment,
  getSubscriptionInfo,
  updatePayment,
} from './paymentActions';

const initialState = {};

const paymentSlice = createSlice({
  name: 'paymentSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubscriptionInfo.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getSubscriptionInfo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPayment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updatePayment.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default paymentSlice.reducer;
