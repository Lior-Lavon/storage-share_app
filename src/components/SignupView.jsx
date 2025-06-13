import React from "react";
import InputField from "./SharedComponents/InputField";
import PrimaryButton from "./SharedComponents/PrimaryButton";
import AuthCard from "./SharedComponents/AuthCard";

import googlePng from "../assets/google.png";
import { setStatue } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const SignupView = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    console.log("handleSubmit");
    console.log("Password:", password);
    // You can now send this to your backend or process it further
  };

  return (
    <AuthCard>
      <p className="text-center text-base mb-4">Create new account</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
        <InputField
          label="Your email"
          type="email"
          placeholder="email"
          id="email"
          autoComplete="username"
        />

        <InputField
          label="Your password"
          type="password-1"
          placeholder="Password"
          id="password"
          autoComplete="new-password-1"
        />
        <InputField
          label="Confirm password"
          type="password-2"
          placeholder="Confirm password"
          id="password"
          autoComplete="new-password-2"
        />

        <div className="mt-4">
          <PrimaryButton>Sign up</PrimaryButton>
        </div>
      </form>

      <p
        className="text-base mt-6 text-center"
        onClick={() => {
          dispatch(setStatue(0));
        }}
      >
        Already have an account ?
        <a href="#" className="text-violet-600">
          Sign in
        </a>
      </p>
    </AuthCard>
  );
};

export default SignupView;
