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
  isPreviewListing: false,
  isSingleChatView: {
    visible: false,
    chatId: null,
  },
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
      state.isPreviewListing = false;
      state.isCropView = false;
      state.isSingleChatView = {
        visible: false,
        chatId: null,
      };
    },
    showProfile: (state, { payload }) => {
      if (payload == "ForceClose") {
        state.isProfile = false;
        state.isMyProfile = false;
      } else {
        state.isProfile = !state.isProfile;
        if (!state.isProfile) {
          state.isMyProfile = false;
        }
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
    showPreviewListing: (state, { payload }) => {
      if (payload == "ForceClose") {
        state.isPreviewListing = false;
      } else {
        state.isPreviewListing = !state.isPreviewListing;
      }
    },
    showCropImageView: (state, { payload }) => {
      if (payload == "ForceClose") {
        state.isCropView = false;
      } else {
        state.isCropView = !state.isCropView;
      }
    },
    showSingleChatView: (state, { payload }) => {
      if (payload == "ForceClose") {
        state.isSingleChatView = {
          visible: false,
          chatId: null,
        };
      } else {
        state.isSingleChatView.visible = !state.isSingleChatView.visible;
        if (payload != undefined) {
          state.isSingleChatView.chatId = payload;
        }
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
  showPreviewListing,
  showSingleChatView,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
