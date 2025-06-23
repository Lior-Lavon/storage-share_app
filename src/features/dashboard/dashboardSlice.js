import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  viewState: "login",
  isProfile: false,
  isMyProfile: false,
  isSettings: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    closeAllViews: (state) => {
      state.isProfile = false;
      state.isMyProfile = false;
      state.isSettings = false;
    },
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
    showSettingsView: (state, { payload }) => {
      if (payload == "ForceClose") {
        state.isSettings = false;
      } else {
        state.isSettings = !state.isSettings;
      }
    },
  },
  extraReducers: (builder) => {},
});

export const { closeAllViews, showProfile, showMyProfile, showSettingsView } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
