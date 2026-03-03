import { authApi } from '@/store/auth';
import { configureStore } from '@reduxjs/toolkit';

import auth from './auth/reducer';
import { uploadApi } from '@/store/upload';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth,
      [authApi.reducerPath]: authApi.reducer,
      [uploadApi.reducerPath]: uploadApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, uploadApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
