import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import authSlice from "./features/auth/authSlice";
import dashboardSlice from "./features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    dashboard: dashboardSlice,
  },
});
