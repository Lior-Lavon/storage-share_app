import { Route, Routes } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import { Landing, NotFound, ProtectiveRoute } from "./pages/index";
import history from "./utils/history";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pingUser } from "./features/user/userSlice";
import {
  ForgotPasswordView,
  LoginView,
  ResetPassword,
  SignupView,
} from "./components";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pingUser());
  }, []);

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path="/"
          element={<ProtectiveRoute>{/* <Dashboard /> */}</ProtectiveRoute>}
        >
          {/* <Route index element={<StartPage />} /> */}
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<SignupView />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
        <Route path="/forgot_password" element={<ForgotPasswordView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
