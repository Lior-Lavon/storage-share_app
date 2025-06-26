import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  viewState: "login",
  isProfile: false,
  isMyProfile: false,
  isSettings: false,
  isCropView: false,
  isCreateListing: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    closeAllViews: (state) => {
      state.isProfile = false;
      state.isMyProfile = false;
      state.isSettings = false;
      state.isCreateListing = false;
      state.isCropView = false;
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
    showCreateListing: (state, { payload }) => {
      if (payload == "ForceClose") {
        state.isCreateListing = false;
      } else {
        state.isCreateListing = !state.isCreateListing;
      }
    },
    showCropImageView: (state, { payload }) => {
      if (payload == "ForceClose") {
        state.isCropView = false;
      } else {
        state.isCropView = !state.isCropView;
      }
    },
  },
  extraReducers: (builder) => {},
});

export const {
  closeAllViews,
  showProfile,
  showMyProfile,
  showSettingsView,
  showCreateListing,
  showCropImageView,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
