import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
// import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    // user: userReducer,
  },
});
