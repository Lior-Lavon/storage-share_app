import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
  uploadAvatarThunk,
  refreshTokenThunk,
  pingThunk,
  logoutUserThunk,
  validateResetPasswordThunk,
  resetPasswordThunk,
  verifyEmailThunk,
  hardDeleteUserThunk,
  softDeleteUserThunk,
  deleteAvatarThunk,
  updateSettingsThunk,
  getSettingsThunk,
} from "./userThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  setUserInLocalStorage,
  setSessionInLocalStorage,
  getUserFromLocalStorage,
  getSessionFromLocalStorage,
  clearUserFromLocalStorage,
  clearSessionFromLocalStorage,
} from "../../utils/localStorage";
import { useQueryClient } from "@tanstack/react-query";

const initialState = {
  isLoading: false,
  viewState: "login",
  status: 0,
  errorMsg: null,
  profile: getUserFromLocalStorage(),
  session: getSessionFromLocalStorage(),
};

export const pingUser = createAsyncThunk("user/pingUser", async (thunkAPI) => {
  return pingThunk("/ping", thunkAPI);
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body, thunkAPI) => {
    return registerUserThunk("/users", body, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body, thunkAPI) => {
    return loginUserThunk("/users/login", body, thunkAPI);
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (thunkAPI) => {
    return logoutUserThunk("/users/logout", thunkAPI);
  }
);

export const passwordResetRequest = createAsyncThunk(
  "user/passwordResetRequest",
  async (body, thunkAPI) => {
    return loginUserThunk("/users/reset_password_request", body, thunkAPI);
  }
);

export const validateResetPassword = createAsyncThunk(
  "user/validateResetPassword",
  async (token, thunkAPI) => {
    const url = `/users/validate_reset_password/${token}`;
    return validateResetPasswordThunk(url, thunkAPI);
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (body, thunkAPI) => {
    return resetPasswordThunk("/users/reset_password", body, thunkAPI);
  }
);

export const hardDeleteUser = createAsyncThunk(
  "user/hardDeleteUser",
  async (body, thunkAPI) => {
    return hardDeleteUserThunk("/users/hard_user_delete", body, thunkAPI);
  }
);

export const softDeleteUser = createAsyncThunk(
  "user/softDeleteUser",
  async (body, thunkAPI) => {
    console.log("body : ", body);

    return softDeleteUserThunk("/users", body, thunkAPI);
  }
);

export const verifyEmailRequest = createAsyncThunk(
  "user/verifyEmail",
  async (token, thunkAPI) => {
    const url = `/users/verify_email/${token}`;
    return verifyEmailThunk(url, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (body, thunkAPI) => {
    return updateUserThunk("/users", body, thunkAPI);
  }
);

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (body, thunkAPI) => {
    return uploadAvatarThunk("/users/avatar", body, thunkAPI);
  }
);

export const deleteAvatar = createAsyncThunk(
  "user/deleteAvatar",
  async (thunkAPI) => {
    return deleteAvatarThunk("/users/avatar", thunkAPI);
  }
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (body, thunkAPI) => {
    return refreshTokenThunk("/token/renew_access", body, thunkAPI);
  }
);

export const updateSettings = createAsyncThunk(
  "user/updateSettings",
  async (body, thunkAPI) => {
    return updateSettingsThunk("/users/settings", body, thunkAPI);
  }
);

export const getUserSettings = createAsyncThunk(
  "user/getUserSettings",
  async (thunkAPI) => {
    return getSettingsThunk("/users/settings", thunkAPI);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("logout called");

      clearUserFromLocalStorage();
      clearSessionFromLocalStorage();

      state.profile = null;
      state.session = null;
    },
    clearError: (state) => {
      state.errorMsg = null;
    },
    setViewState: (state, { payload }) => {
      state.viewState = payload;
    },
    setStatue: (state, { payload }) => {
      state.status = payload;
    },
    updateUserProfile: (state, { payload }) => {
      state.profile = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        console.log("registerUser - pending");
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        console.log("registerUser - fulfilled");
        state.isLoading = false;
        state.viewState = "login";

        toast.success("Registered successful");
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("registerUser - rejected : ", payload);
        state.errorMsg = payload.replace(/_/g, " ");
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        console.log("loginUser - pending");
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        console.log("loginUser - fulfilled : ", payload);
        state.isLoading = false;
        const {
          user,
          session_id,
          access_token,
          access_token_expires_at,
          refresh_token,
          refresh_token_expires_at,
        } = payload;
        state.refreshToken = false;
        state.profile = user;
        setUserInLocalStorage(user);

        const session = {
          session_id,
          access_token,
          access_token_expires_at,
          refresh_token,
          refresh_token_expires_at,
        };
        state.session = session;
        console.log("session : ", session);

        setSessionInLocalStorage(session);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("loginUser - rejected : ", payload);
        state.errorMsg = payload.replace(/_/g, " ");
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        console.log("logoutUser - pending");
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        console.log("logoutUser - fulfilled : ", payload);
        state.isLoading = false;

        toast.success("Logout successful");
        clearUserFromLocalStorage();
        clearSessionFromLocalStorage();

        state.profile = null;
        state.session = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("logoutUser - rejected ", payload);
        state.errorMsg = payload.replace(/_/g, " ");
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        console.log("updateUser - pending");
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        console.log("updateUser - fulfilled");
        state.isLoading = false;
        const { user } = payload;
        state.profile = user;
        setUserInLocalStorage(user);
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        console.log("updateUser - rejected");
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true;
        console.log("uploadAvatar - pending");
      })
      .addCase(uploadAvatar.fulfilled, (state, { payload }) => {
        console.log("uploadAvatar - fulfilled");
        state.isLoading = false;
        const { user } = payload;
        state.profile = { ...state.profile, avatar: user.avatar };
        setUserInLocalStorage(user);
      })
      .addCase(uploadAvatar.rejected, (state) => {
        state.isLoading = false;
        console.log("uploadAvatar - rejected");
      })

      .addCase(deleteAvatar.pending, (state) => {
        state.isLoading = true;
        // console.log("deleteAvatar - pending");
      })
      .addCase(deleteAvatar.fulfilled, (state, { payload }) => {
        // console.log("deleteAvatar - fulfilled");
        state.isLoading = false;
        const { user } = payload;
        state.profile = { ...state.profile, avatar: user.avatar };
        setUserInLocalStorage(user);
      })
      .addCase(deleteAvatar.rejected, (state) => {
        state.isLoading = false;
        console.log("deleteAvatar - rejected");
      })

      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        console.log("uploadAvatar - fulfilled : ", payload);
        // update the token
        const { token } = payload;

        const access_token = token.access_token;
        const access_token_expires_at = token.access_token_expires_at;

        // update local store
        state.session.access_token = token.access_token;
        state.session.access_token_expires_at = token.access_token_expires_at;

        // update the state and the local storage
        const session = getSessionFromLocalStorage();
        const newSession = {
          ...session,
          access_token,
          access_token_expires_at,
        };
        setSessionInLocalStorage(newSession);
      })
      .addCase(passwordResetRequest.pending, (state) => {
        state.isLoading = true;
        console.log("passwordResetRequest - pending");
      })
      .addCase(passwordResetRequest.fulfilled, (state, { payload }) => {
        console.log("passwordResetRequest - fulfilled : ", payload);
        state.isLoading = false;
      })
      .addCase(passwordResetRequest.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
        console.log("passwordResetRequest - rejected ", payload);
      })
      .addCase(validateResetPassword.pending, (state) => {
        state.isLoading = true;
        console.log("validateResetPassword - pending");
      })
      .addCase(validateResetPassword.fulfilled, (state, { payload }) => {
        console.log("validateResetPassword - fulfilled : ");
        state.isLoading = false;
      })
      .addCase(validateResetPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
        console.log("validateResetPassword - rejected ");
      })

      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        console.log("resetPassword - pending");
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        console.log("resetPassword - fulfilled : ");
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
        console.log("resetPassword - rejected ");
      })

      .addCase(hardDeleteUser.pending, (state) => {
        state.isLoading = true;
        console.log("hardDeleteUser - pending");
      })
      .addCase(hardDeleteUser.fulfilled, (state, { payload }) => {
        console.log("hardDeleteUser - fulfilled : ");
        state.isLoading = false;
      })
      .addCase(hardDeleteUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
        console.log("hardDeleteUser - rejected ");
      })

      .addCase(softDeleteUser.pending, (state) => {
        state.isLoading = true;
        console.log("softDeleteUser - pending");
      })
      .addCase(softDeleteUser.fulfilled, (state, { payload }) => {
        console.log("softDeleteUser - fulfilled : ");
        state.isLoading = false;

        toast.success("softDeleteUser successful");
        clearUserFromLocalStorage();
        clearSessionFromLocalStorage();

        state.profile = null;
        state.session = null;
      })
      .addCase(softDeleteUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
        console.log("softDeleteUser - rejected ");
      })

      .addCase(verifyEmailRequest.pending, (state) => {
        state.isLoading = true;
        console.log("verifyEmail - pending");
      })
      .addCase(verifyEmailRequest.fulfilled, (state, { payload }) => {
        console.log("verifyEmail - fulfilled : ");
        state.isLoading = false;
      })
      .addCase(verifyEmailRequest.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
        console.log("verifyEmail - rejected ");
      })

      .addCase(pingUser.pending, (state) => {
        // console.log("pingUser - pending");
      })
      .addCase(pingUser.fulfilled, (state, { payload }) => {
        // console.log("pingUser - fulfilled - ", payload);
      })
      .addCase(pingUser.rejected, (state) => {
        console.log("pingUser - rejected");
      })

      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
        console.log("updateSettings - pending");
      })
      .addCase(updateSettings.fulfilled, (state, { payload }) => {
        console.log("updateSettings - fulfilled : ", payload);
        state.isLoading = false;

        state.profile = {
          ...state.profile,
          settings: {
            receive_email: payload.receive_email,
            receive_notification: payload.receive_notification,
          },
        };
      })
      .addCase(updateSettings.rejected, (state, { payload }) => {
        state.isLoading = false;
        // state.errorMsg = payload;
        console.log("updateSettings - rejected : ", payload);
      })

      .addCase(getUserSettings.pending, (state) => {
        state.isLoading = true;
        console.log("getUserSettings - pending");
      })
      .addCase(getUserSettings.fulfilled, (state, { payload }) => {
        console.log("getUserSettings - fulfilled : ", payload);
        state.isLoading = false;

        state.profile = {
          ...state.profile,
          settings: {
            receive_email: payload.receive_email,
            receive_notification: payload.receive_notification,
          },
        };
      })
      .addCase(getUserSettings.rejected, (state, { payload }) => {
        state.isLoading = false;
        // state.errorMsg = payload;
        console.log("getUserSettings - rejected : ", payload);
      });
  },
});

export const {
  setViewState,
  updateUserProfile,
  setStatue,
  clearError,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
