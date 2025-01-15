import { createSlice } from "@reduxjs/toolkit";

const initAuth = {
  user: {},
  isLogined: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initAuth,
  reducers: {
    login: (state, action) => {
      state.isLogined = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLogined = false;
      state.user = {};
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
