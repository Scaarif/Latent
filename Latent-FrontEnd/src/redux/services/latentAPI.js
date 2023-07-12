
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { store } from '../store';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCookie } from '../features/userSlice';

// making API calls using RTK Query

export const latentAPI = createApi({
  reducerPath: 'latentAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const { user } = getState();
      if (user.cookie) {
        const { cookie } = user.cookie;
        if (cookie) {
          headers.set('Cookie', cookie);
        }
      }
      return headers;
    },
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
    login: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
      async onQueryStarted(request, { dispatch }) {
        console.log({ request });
        try {
          const response = await axios.post(request.baseQuery.baseUrl + request.endpoint.url, request.body);

          // Extract the Set-Cookie header
          const cookieHeader = response.headers['set-cookie'];
          console.log({ cookieHeader });
          if (cookieHeader) {
            const connectSid = cookieHeader.split(';')[0].split('=')[1];
            dispatch(setCookie(connectSid));
          }

          // Process the response
          const result = response.data;

          return { data: result };
        } catch (error) {
          console.error('Error:', error.message);
          return { error };
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
} = latentAPI; // export the entire api slice ... Only one api slice is allowed per server & application

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // import { store } from '../store';
// import { useDispatch } from 'react-redux';
// import { setCookie } from '../features/userSlice';

// // making API calls using RTK Query

// export const latentAPI = createApi({
//   reducerPath: 'latentAPI',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api/v1',
//     prepareHeaders: (headers, { getState }) => {
//       const { user } = getState();
//       if (user.cookie) {
//         const { cookie } = user.cookie;
//         if (cookie) {
//           headers.set('Cookie', cookie);
//         }
//       }
//       return headers;
//     },
//   }),
//   fetchFn: async (...args) => {
//     const res = await fetch(...args);
//     console.log(res.headers);
//     const cookieHeader = res.headers.get('Set-Cookie');
//     console.log({ cookieHeader });
//     if (cookieHeader) {
//       const connectSid = cookieHeader.split(';')[0].split('=')[1];
//       useDispatch(setCookie(connectSid));
//     }
//     return res;
//   },
//   transformResponse: (res) => {
//     console.log('headers: ', res.headers);
//     return res.json();
//   },
//   endpoints: (builder) => ({
//     getUser: builder.query({ query: (userId) => `/user?id=${userId}` }),
//     registerUser: builder.mutation({
//       query: (user) => ({
//         url: '/users',
//         method: 'POST',
//         body: user,
//       }),
//     }),
//     login: builder.mutation({
//       query: (user) => ({
//         url: '/login',
//         method: 'POST',
//         body: user,
//       }),
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: '/logout',
//         method: 'POST',
//       }),
//     }),
//   }),
// });

// export const {
//   useGetUserQuery,
//   useRegisterUserMutation,
//   useLoginMutation,
//   useLogoutMutation,
// } = latentAPI; // export the entire api slice ... Only one api slice is allowed per server & application
