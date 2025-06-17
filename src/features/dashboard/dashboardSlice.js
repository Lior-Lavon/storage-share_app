import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  viewState: "login",
  isProfile: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    showProfile: (state) => {
      state.isProfile = !state.isProfile;
    },
  },
  extraReducers: (builder) => {},
});

export const { showProfile } = dashboardSlice.actions;
export default dashboardSlice.reducer;
