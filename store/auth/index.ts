import { axiosBaseQuery } from '@/store/customBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  RegisterRequest,
  RegisterResponse,
  ResendEmailCodeRequest,
  ResendEmailCodeResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from './types';

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
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: '/users/sign-up',
        method: 'POST',
        data,
      }),
    }),
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (data) => ({
        url: '/users/verify-email',
        method: 'POST',
        data,
      }),
    }),
    resendEmailCode: builder.mutation<ResendEmailCodeResponse, ResendEmailCodeRequest>({
      query: (data) => ({
        url: '/users/resend-email-code',
        method: 'POST',
        data,
      }),
    }),
    updateProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: (data) => ({
        url: '/users/update-profile',
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
  useResendEmailCodeMutation,
  useUpdateProfileMutation,
} = authApi;
