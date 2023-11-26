const { createSlice } = require("@reduxjs/toolkit");

import {
  login,
  verifyToken,
  signup,
  forgetPassword,
  logingoogleSuccess,
  validateToken,
} from "./authActions";

const initialState = {
  loading: false,
  error: "",
  forgetPasswordError: "",
  user: {},
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user = {};
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action?.payload?.user) {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyToken.rejected, (state) => {
        // state.loading = false;
        // state.user = {};
        // state.token = '';
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.user;
        // state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logingoogleSuccess.pending, (state) => {
        state.loading = true;
      })
      .addCase(logingoogleSuccess.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(logingoogleSuccess.rejected, (state) => {
        state.loading = false;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(forgetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(validateToken.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearUserData } = authSlice.actions;
export default authSlice.reducer;
