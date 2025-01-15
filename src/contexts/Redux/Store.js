import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import loadingReducer from "./LoadingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
});
