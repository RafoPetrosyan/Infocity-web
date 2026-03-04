import { createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '@/lib/httpClient';
import type { User } from './types';

export const fetchCurrentUser = createAsyncThunk<User>(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await httpClient.get<User>('/users/current-user');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
