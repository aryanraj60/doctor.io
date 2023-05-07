import { createSlice } from "@reduxjs/toolkit";

const loadSlice = createSlice({
  name: "loading",
  initialState: {
    loading: false,
  },
  reducers: {
    enableLoading: (state) => {
      state.loading = true;
    },
    disableLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { enableLoading, disableLoading } = loadSlice.actions;

export default loadSlice;
