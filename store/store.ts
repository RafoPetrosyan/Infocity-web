import { authApi } from '@/store/auth';
import { globalApi } from '@/store/global';
import { configureStore } from '@reduxjs/toolkit';

import auth from './auth/reducer';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth,
      [authApi.reducerPath]: authApi.reducer,
      [globalApi.reducerPath]: globalApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, globalApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
