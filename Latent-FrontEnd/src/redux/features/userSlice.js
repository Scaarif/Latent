import { createSlice } from '@reduxjs/toolkit';

// const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isAgent: true,
  },
  reducers: {
    setUser: (state, action) => {
      // console.log('payload: ', action.payload);
      state.user = action.payload;
      // console.log('state.user: ', state.user);
      if (action.payload?.isAgent) {
        state.isAgent = action.payload?.isAgent;
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
