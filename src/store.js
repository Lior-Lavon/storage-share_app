import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import dashboardSlice from "./features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    dashboard: dashboardSlice,
  },
});
