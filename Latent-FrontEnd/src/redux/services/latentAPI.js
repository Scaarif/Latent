import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// making API calls using RTK Query

export const latentAPI = createApi({
  reducerPath: 'latentAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    // prepareHeaders: (headers) => {
    //   headers.set('', '');
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({ query: (userId) => `/user?id=${userId}` }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterUserMutation,
} = latentAPI; // export the entire api slice ... Only one api slice is allowed per server & application
