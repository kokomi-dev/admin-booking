import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    removeLoading: (state) => {
      state.isLoading = false;
    },
  },
});
export const { setLoading, removeLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
