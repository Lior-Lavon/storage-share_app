import React from "react";
import InputField from "./SharedComponents/InputField";
import PrimaryButton from "./SharedComponents/PrimaryButton";
import AuthCard from "./SharedComponents/AuthCard";
import { setStatue } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const ForgotPasswordView = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    console.log("handleSubmit");
    console.log("Password:", password);
    // You can now send this to your backend or process it further
  };

  return (
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

      <p
        className="text-base mt-6 text-center"
        onClick={() => {
          dispatch(setStatue(0));
        }}
      >
        Already have an account{" "}
        <a href="#" className="text-violet-600">
          Sign in
        </a>
      </p>
    </AuthCard>
  );
};

export default ForgotPasswordView;
