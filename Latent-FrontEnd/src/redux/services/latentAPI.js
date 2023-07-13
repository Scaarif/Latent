
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// making API calls using RTK Query

export const latentAPI = createApi({
  reducerPath: 'latentAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    // prepareHeaders: (headers, { getState }) => {
    //   const { user } = getState();
    //   if (user.cookie) {
    //     const { cookie } = user.cookie;
    //     if (cookie) {
    //       headers.set('Cookie', cookie);
    //     }
    //   }
    //   return headers;
    // },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getLoggedInUser: builder.query({ query: () => '/users' }),
    getAgent: builder.query({ query: (agentId) => `/agents/${agentId}` }),
    getAllHouses: builder.query({ query: () => '/houses' }),

    registerUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/reset-password',
        method: 'PUT',
        body: data,
      }),
    }),
    postHouse: builder.mutation({
      query: (houseData) => ({
        url: '/houses',
        method: 'POST',
        body: houseData,
      }),
    }),
    editHouse: builder.mutation({
      query: (houseData) => ({
        url: `/houses/${houseData.id}`,
        method: 'POST',
        body: houseData,
      }),
    }),
    getHouses: builder.query({
      query: (data) => ({
        url: '/houses',
        params: data,
      }),
    }),
  }),
});

export const {
  useGetLoggedInUserQuery,
  useGetAgentQuery,
  useGetAllHousesQuery,
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  usePostHouseMutation,
  useGetHousesQuery,
} = latentAPI; // export the entire api slice ... Only one api slice is allowed per server & application
