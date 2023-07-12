import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAgent: false,
  cookie: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload?.data) {
        state.isAgent = action.payload.data?.isAgent;
      }
    },

    setCookie: (state, action) => {
      state.cookie = action.payload;
    },
  },
});

export const { setUser, setCookie } = userSlice.actions;

export default userSlice.reducer;
