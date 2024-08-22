import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    logInGoogle: (state, action) => {
      // console.log("logInGoogle action payload:", action.payload);
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    getCurrentUser: (state, action) => {
      // console.log("getCurrentUser action payload:", action.payload);
      state.user = action.payload;
      state.isLoggedIn = !!action.payload; // Verifica si el payload tiene datos del usuario para actualizar isLoggedIn
    },
    logOutGoogle: (state) => {
      // console.log("Logging out...");
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { logInGoogle, getCurrentUser, logOutGoogle } = authSlice.actions;
export default authSlice.reducer;