import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import barCodeSlice from './barCode/barCodeSlice';
import coupanSlice from './coupan/coupanSlice';
import authSlice from './auth/authSlice';
import folderSlice from './folders/folderSlice';
import paymentSlice from './payment/paymentSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

export const store = configureStore({
  reducer: {
    barCode: barCodeSlice,
    coupan: coupanSlice,
    auth: persistedAuthReducer,
    qrFolders: folderSlice,
    payment: paymentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
