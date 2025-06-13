import React from "react";
import InputField from "./SharedComponents/InputField";
import PrimaryButton from "./SharedComponents/PrimaryButton";
import AuthCard from "./SharedComponents/AuthCard";
import { setStatue } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import useViewportHeight from "../utils/useViewportHeight";

const ForgotPasswordView = () => {
  const dispatch = useDispatch();
  const viewHeight = useViewportHeight();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    console.log("handleSubmit");
    console.log("Password:", password);
    // You can now send this to your backend or process it further
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
          <InputField label="Your email" type="email" placeholder="email" />
        </form>

        <div className="mt-8">
          <PrimaryButton>Send</PrimaryButton>
        </div>

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
