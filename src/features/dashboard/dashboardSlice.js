import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  viewState: "login",
  isProfile: false,
  isMyProfile: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    showProfile: (state, { payload }) => {
      if (payload == "ForceClose") {
        state.isProfile = false;
      } else {
        state.isProfile = !state.isProfile;
      }
    },
    showMyProfile: (state, { payload }) => {
      if (payload == "ForceClose") {
        state.isMyProfile = false;
      } else {
        state.isMyProfile = !state.isMyProfile;
      }
    },
  },
  extraReducers: (builder) => {},
});

export const { showProfile, showMyProfile } = dashboardSlice.actions;
export default dashboardSlice.reducer;
