import React, { useState } from "react";
import { ForgotPasswordView, LoginView, SignupView } from "../../components";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { status } = useSelector((store) => store.user);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {status == 0 && <LoginView />}
      {status == 1 && <SignupView />}
      {status == 2 && <ForgotPasswordView />}
    </div>
  );
};

export default Dashboard;
