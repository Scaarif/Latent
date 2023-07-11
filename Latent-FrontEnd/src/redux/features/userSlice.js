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
    logout: (state, action) => {},
    upgrade: (state, action) => {},
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
