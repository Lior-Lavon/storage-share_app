import React, { useState } from "react";
import InputField from "./SharedComponents/InputField";
import PrimaryButton from "./SharedComponents/PrimaryButton";
import AuthCard from "./SharedComponents/AuthCard";
import { passwordResetRequest, setStatue } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import useViewportHeight from "../utils/useViewportHeight";
import { useNavigate } from "react-router-dom";

const ForgotPasswordView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errorMsg } = useSelector((store) => store.user);

  const [email, setEmail] = useState("");
  const viewHeight = useViewportHeight();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh

    if (email == "") return;

    dispatch(
      passwordResetRequest({
        email: email,
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

  return (
    <div
      className="w-full flex items-center justify-center bg-white"
      style={{ height: viewHeight }}
    >
      <AuthCard>
        <p className="text-center text-base mb-4">
          Please enter your email to recover your password
        </p>

        {/* <p className="text-center text-base mb-4">Set up a new password</p> */}
        {errorMsg != null && (
          <p className="w-full text-center text-red-400">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
          <InputField
            label="Your email"
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />

          <div className="mt-8">
            <PrimaryButton type="submit">Send</PrimaryButton>
          </div>
        </form>

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

export default ForgotPasswordView;
