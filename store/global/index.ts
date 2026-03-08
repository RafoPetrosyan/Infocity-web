import { axiosBaseQuery } from '@/store/customBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { City, Emotion, Category } from './types';

export const globalApi = createApi({
  reducerPath: 'globalApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Cities', 'Emotions', 'Categories'],
  endpoints: (builder) => ({
    // Cities
    getCities: builder.query<City[], void>({
      query: () => ({ url: '/cities' }),
      providesTags: ['Cities'],
    }),

    // Emotions
    getEmotions: builder.query<Emotion[], void>({
      query: () => ({ url: '/emotions' }),
      providesTags: ['Emotions'],
    }),

    // Categories
    getCategories: builder.query<Category[], void>({
      query: () => ({ url: '/categories' }),
      providesTags: ['Categories'],
    }),
  }),
});

export const { useGetCitiesQuery, useGetEmotionsQuery, useGetCategoriesQuery } = globalApi;
