import axios from "axios";
import history from "./history";
// import { logout } from "../features/user/userSlice";
import {
  getSessionFromLocalStorage,
  setSessionInLocalStorage,
} from "./localStorage";
import { logout } from "../features/user/userSlice";
import { closeAllViews } from "../features/dashboard/dashboardSlice";
import { refreshTokenThunk } from "../features/user/userThunk";
import { refreshToken } from "../features/auth/authSlice";

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  crossDomain: true,
});

export const interceptor = (store) => {
  customFetch.interceptors.request.use(
    async (config) => {
      const session = getSessionFromLocalStorage();
      if (session) {
        config.headers["Authorization"] = `Bearer ${session.access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log("!!! error.response.status : ", error.response.status);

      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        const session = getSessionFromLocalStorage();
        const resultAction = await store.dispatch(
          refreshToken({ refresh_token: session.refresh_token })
        );

        if (resultAction.type == "auth/refreshToken/fulfilled") {
          // console.log("refreshTokenThunk.fulfilled");

          const session = getSessionFromLocalStorage();
          customFetch.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${session.access_token}`;

          return customFetch(originalRequest);
        }
        if (resultAction.type == "auth/refreshToken/rejected") {
          // console.log("refreshTokenThunk.rejected");

          originalRequest._retry = false;
          // refresh token expired - logout the user
          store.dispatch(closeAllViews());
          store.dispatch(logout());
          history.push("/");
        }
      }
      return Promise.reject(error);
    }
  );
};

export default customFetch;
