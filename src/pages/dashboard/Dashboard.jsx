import React, { useEffect, useState } from "react";
import { ForgotPasswordView, LoginView, SignupView } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import useViewportHeight from "../../utils/useViewportHeight";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/user/userSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewHeight = useViewportHeight();

  const { profile } = useSelector((store) => store.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div
      className="w-full flex items-center justify-center bg-white"
      style={{ height: viewHeight }}
    >
      <div className="w-[90%]">
        {profile == null ? (
          <PrimaryButton onClick={() => navigate("/login")}>
            Sign in
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => handleLogout()}>Sign out</PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
