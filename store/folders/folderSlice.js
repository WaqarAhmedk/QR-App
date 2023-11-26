import { createSlice, current } from '@reduxjs/toolkit';
import { createFolder, getUserQrFolders } from '../folders/foldersActions';

const initialState = {
  folders: [],
  selectedFolder: {},
};

const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserQrFolders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserQrFolders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserQrFolders.fulfilled, (state, action) => {
        state.loading = false;
        const stateFolders = current(state);
        const folders = action?.payload?.qrFolders;
        if (folders?.length > 0) {
          state.loading = false;
          const uniqueFolders = folders.filter((newFolder) => {
            return !state.folders.some(
              (existingFolder) => existingFolder.id === newFolder.id
            );
          });
          state.folders = [...stateFolders.folders, ...uniqueFolders];
        }
      })
      .addCase(createFolder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFolder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.folders.push(action.payload);
      });
  },
});

export default folderSlice.reducer;
