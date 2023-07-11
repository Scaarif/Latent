import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAgent: false,
  logout: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      if (action.payload?.data) {
        state.isAgent = action.payload.data?.isAgent;
      }
    },

    logout: (state, action) => {
      state.logout = action.payload;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
