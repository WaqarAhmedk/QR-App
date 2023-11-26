const { createAsyncThunk } = require('@reduxjs/toolkit');
const { axiosInstance } = require('api/axios');

export const getUserQrFolders = createAsyncThunk(
  'user-qr-folders',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/folder/user/${userId}`);
      // const addGeneralFolderIfNeeded = (folders) => {
      //   const hasGeneralFolder = folders.some(
      //     (folder) => folder.name === 'General'
      //   );
      //   if (!hasGeneralFolder) {
      //     folders.push({
      //       name: 'General',
      //       id: 'General',
      //     });
      //   }
      // };

      // if (response.qrFolders.length === 0) {
      //   response.qrFolders.push({
      //     name: 'General',
      //     id: 'General',
      //   });
      // } else {
      //   addGeneralFolderIfNeeded(response.qrFolders);
      // }
      return response || [];
    } catch (err) {
      return rejectWithValue(err?.data?.message);
    }
  }
);

export const createFolder = createAsyncThunk(
  'create-qr-folders',
  async ({ name, userId }, { rejectWithValue }) => {
    try {
      let data = {
        owner: userId,
        name: name,
      };
      const res = await axiosInstance.post(`/folder`, data);
      return res;
    } catch (err) {
      return rejectWithValue(err?.data?.message);
    }
  }
);
