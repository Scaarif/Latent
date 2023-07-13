
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// making API calls using RTK Query

export const latentAPI = createApi({
  reducerPath: 'latentAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getLoggedInUser: builder.query({ query: () => '/users' }),
    getAgent: builder.query({ query: (agentId) => `/agents/${agentId}` }),
    getAllHouses: builder.query({ query: () => '/houses' }),
    getHouses: builder.query({
      query: (data) => ({
        url: '/houses',
        params: data,
      }),
    }),

    registerUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
    editUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'PUT',
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: '/users',
        method: 'DELETE',
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
    deleteHouse: builder.mutation({
      query: (houseId) => ({
        url: `/houses/${houseId}`,
        method: 'DELETE',
      }),
    }),
    bookAppointment: builder.mutation({
      query: (houseId) => ({
        url: `/appointment/${houseId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetLoggedInUserQuery,
  useGetAgentQuery,
  useGetAllHousesQuery,
  useGetHousesQuery,
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  usePostHouseMutation,
  useBookAppointmentMutation,
  useDeleteHouseMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = latentAPI; // export the entire api slice ... Only one api slice is allowed per server & application
