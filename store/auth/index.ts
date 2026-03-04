import { axiosBaseQuery } from '@/store/customBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { RegisterRequest, RegisterResponse } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: `/register`,
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
