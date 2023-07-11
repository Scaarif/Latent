import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// making API calls using RTK Query

export const latentAPI = createApi({
  reducerPath: 'latentAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
      headers.set('', '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({ query: (userId) => `/user?id=${userId}` }),
  }),
});

export const {
  useGetUserQuery,
} = latentAPI; // export the entire api slice ... Only one api slice is allowed per server & application
