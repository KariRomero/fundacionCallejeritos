import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    logInGoogle: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    getCurrentUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    logOutGoogle: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { logInGoogle, getCurrentUser, logOutGoogle } = authSlice.actions;
export default authSlice.reducer;