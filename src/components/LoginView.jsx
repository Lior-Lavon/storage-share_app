import React, { useState } from "react";
import InputField from "./SharedComponents/InputField";
import PrimaryButton from "./SharedComponents/PrimaryButton";
import AuthCard from "./SharedComponents/AuthCard";

import googlePng from "../assets/google.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import useViewportHeight from "../utils/useViewportHeight";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errorMsg } = useSelector((store) => store.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const viewHeight = useViewportHeight();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh

    dispatch(
      loginUser({
        email: email,
        password: password,
        remember_me: "false",
      })
    )
      .unwrap()
      .then(() => {
        navigate("/landing");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div
      className="w-full flex items-center justify-center bg-white"
      style={{ height: viewHeight }}
    >
      <AuthCard>
        <p className="text-center text-base mb-4">
          Log in or create new account
        </p>
        {errorMsg != null && (
          <p className="w-full text-center text-red-400">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 mb-4">
            <InputField
              label="Your email"
              type="email"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
            <InputField
              label="Your password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="mt-8">
            <PrimaryButton type="submit">Log in</PrimaryButton>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gray-400" />
              </div>
              <div className="relative z-10 bg-white px-6 text-center text-xs mx-auto w-fit text-gray-400">
                Or
              </div>
            </div>
            <button className="w-full py-2 border rounded-lg flex items-center justify-center gap-2">
              <img src={googlePng} alt="Google" className="w-5 h-5" />
              Log in with Google
            </button>
          </div>
        </form>
        <div className="mt-6 text-base text-center space-y-5 ">
          <div className="flex gap-2 items-center justify-center">
            <p>Don’t have an account ? </p>
            <a href="/register" className="text-violet-600">
              Sign up
            </a>
          </div>

          <div className="flex gap-2 items-center justify-center">
            <p>Forgot your password ? </p>
            <a href="/forgot_password" className="text-violet-600">
              Click here
            </a>
          </div>
        </div>
      </AuthCard>
    </div>
  );
};

export default LoginView;
