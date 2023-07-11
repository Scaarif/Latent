import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAgent: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login:  (state, action) => {
      state.user = action.payload.user;
      state.isAgent = action.payload.user.isAgent;
    },
    logout: (state, action) => {
      state.user = null;
    },
    upgrade: (state, action) => {
      state.isAgent = true;
    },
  },
});

export const { login, logout, upgrade } = userSlice.actions;
export default userSlice.reducer;
