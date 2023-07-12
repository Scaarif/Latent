
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
    getUser: builder.query({ query: (userId) => `/user?id=${userId}` }),
    getLoggedInUser: builder.query({ query: () => '/users' }),
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
  }),
});

export const {
  useGetUserQuery,
  useGetLoggedInUserQuery,
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
