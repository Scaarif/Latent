import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAgent: false,
  // cookie: 's%3AMQwSpnvPjPrS-IGcPRLGxK1qio7TP5BT.OqU5frcqVZy4%2FGa4IAotzT8H1eqoGcVqVosKe70ehys',,
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
