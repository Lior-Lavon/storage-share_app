import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { refreshTokenThunk } from "../user/userThunk";
import {
  getSessionFromLocalStorage,
  setSessionInLocalStorage,
} from "../../utils/localStorage";

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (body, thunkAPI) => {
    return refreshTokenThunk("/token/renew_access", body, thunkAPI);
  }
);

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(refreshToken.pending, (state) => {
      //   console.log("refreshToken - pending");
      // })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        console.log("refreshToken - fulfilled : ", payload);

        const data = payload.token;
        const access_token = data?.access_token;
        const access_token_expires_at = data?.access_token_expires_at;

        const session = getSessionFromLocalStorage();
        const newSession = {
          ...session,
          access_token,
          access_token_expires_at,
        };
        setSessionInLocalStorage(newSession);
      });
    // .addCase(refreshToken.rejected, (state, { payload }) => {
    //   console.log("refreshToken - rejected : ", payload);
    // });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
