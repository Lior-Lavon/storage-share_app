import React, { useState } from "react";
import InputField from "./SharedComponents/InputField";
import PrimaryButton from "./SharedComponents/PrimaryButton";
import AuthCard from "./SharedComponents/AuthCard";
import { registerUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import useViewportHeight from "../utils/useViewportHeight";
import { useNavigate } from "react-router-dom";
import GoogleRegisterButton from "./GoogleRegisterButton";

const SignupView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMsg } = useSelector((store) => store.user);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const viewHeight = useViewportHeight();

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password != repeatPassword) {
      setError("password does not match");
      return;
    }
    // validate email
    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }

    dispatch(
      registerUser({
        email: email,
        password: password,
        role: "renter", // renter, host, admin
      })
    )
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleGoogle = () => {
    console.log("handleGoogle");
  };

  return (
    <div
      className="w-full flex items-center justify-center bg-white"
      style={{ height: viewHeight }}
    >
      <AuthCard>
        <p className="text-center text-base mb-4">Create new account</p>
        {errorMsg != null && (
          <p className="w-full text-center text-red-400">{errorMsg}</p>
        )}
        {error != null && (
          <p className="w-full text-center text-red-400">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
          <InputField
            label="Your email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            autoComplete="username"
          />

          <InputField
            label="Your password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            autoComplete="new-password-1"
          />
          <InputField
            label="Confirm password"
            type="password"
            placeholder="Confirm password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            id="password"
            autoComplete="new-password-2"
          />

          <div className="mt-4">
            <PrimaryButton type="submit">Sign up</PrimaryButton>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gray-400" />
              </div>
              <div className="relative z-10 bg-white px-6 text-center text-xs mx-auto w-fit text-gray-400">
                Or
              </div>
            </div>
            {/* <button className="w-full py-2 border rounded-lg flex items-center justify-center gap-2">
              <img src={googlePng} alt="Google" className="w-5 h-5" />
              Log in with Google
            </button> */}
          </div>
        </form>

        <GoogleRegisterButton />

        <div className="text-base mt-6 flex gap-2 items-center justify-center">
          <p>Already have an account ? </p>
          <a href="/login" className="text-violet-600">
            Sign in
          </a>
        </div>
      </AuthCard>
    </div>
  );
};

export default SignupView;
