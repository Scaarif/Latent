import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/userSlice';
import { latentAPI } from './services/latentAPI';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [latentAPI.reducerPath]: latentAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(latentAPI.middleware),
});
