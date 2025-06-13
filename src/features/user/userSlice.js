import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
  uploadAvatarThunk,
  refreshTokenThunk,
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
  status: 2,
  profile: getUserFromLocalStorage(),
  session: getSessionFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/users", user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/users/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    const reqBody = createRequestBody(user);
    return updateUserThunk("/users", reqBody, thunkAPI);
  }
);

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (avatar, thunkAPI) => {
    return uploadAvatarThunk("/users/avatar", avatar, thunkAPI);
  }
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (body, thunkAPI) => {
    return refreshTokenThunk("/token/renew_access", body, thunkAPI);
  }
);

const createRequestBody = (user) => {
  const {
    role,
    firstname,
    lastname,
    gender,
    dob,
    nationality,
    description,
    smoker,
    member_of_student_association,
    pet,
    education,
    country,
    city,
    status,
    languages,
    socials,
  } = user;

  const retObj = {
    id: user.id,
  };

  retObj.role = role;
  // title: "ms",
  if (firstname !== "not_set") {
    retObj.firstname = firstname;
  }
  if (lastname !== "not_set") {
    retObj.lastname = lastname;
  }
  if (gender !== "not_set") {
    retObj.gender = gender;
    if (gender === "male") {
      retObj.title = "mr";
    } else {
      retObj.title = "ms";
    }
  }
  if (dob !== "0001-01-01T00:00:00Z") {
    retObj.dob = dob;
  }
  if (nationality > 1) {
    retObj.nationality = nationality;
  }
  // console.log(avatar);
  if (description !== "") {
    retObj.description = description;
  }
  retObj.smoker = smoker;
  retObj.member_of_student_association = member_of_student_association;
  retObj.pet = pet;
  if (education !== undefined) {
    retObj.education = education;
  }
  if (country > 1) {
    retObj.country = country;
  }
  if (city !== "") {
    retObj.city = city;
  }
  if (status !== undefined) {
    retObj.status = status;
  }
  retObj.languages = languages;
  retObj.socials = socials;
  return retObj;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      toast.success("Logout successful");
      clearUserFromLocalStorage();
      clearSessionFromLocalStorage();

      state.profile = null;
      state.session = null;
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
        // console.log("registerUser - pending");
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        // console.log("registerUser - fulfilled");
        state.isLoading = false;
        state.viewState = "login";

        toast.success("Registered successful");
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        // console.log("registerUser - rejected");
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        // console.log("loginUser - pending");
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
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
        setSessionInLocalStorage(session);

        // console.log("loginUser - fulfilled");
        const { firstname } = user;
        if (firstname !== "not_set") {
          toast.success(`Welcome back ${firstname}`);
        } else {
          toast.success(`Welcome back`);
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        // console.log("loginUser - rejected");
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        // console.log("updateUser - pending");
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        // console.log("updateUser - fulfilled");
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
        // console.log("uploadAvatar - pending");
      })
      .addCase(uploadAvatar.fulfilled, (state, { payload }) => {
        // console.log("uploadAvatar - fulfilled");
        state.isLoading = false;
        const { user } = payload;
        state.profile = { ...state.profile, avatar: user.avatar };
        setUserInLocalStorage(user);
      })
      .addCase(uploadAvatar.rejected, (state) => {
        state.isLoading = false;
        console.log("uploadAvatar - rejected");
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        // console.log("uploadAvatar - fulfilled");
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
      });
  },
});

export const { setViewState, logout, updateUserProfile, setStatue } =
  userSlice.actions;
export default userSlice.reducer;
