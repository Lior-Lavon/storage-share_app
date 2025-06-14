import React, { useState } from "react";
import InputField from "./SharedComponents/InputField";
import PrimaryButton from "./SharedComponents/PrimaryButton";
import AuthCard from "./SharedComponents/AuthCard";
import {
  deleteUser,
  passwordResetRequest,
  setStatue,
} from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import useViewportHeight from "../utils/useViewportHeight";
import { useNavigate } from "react-router-dom";

const HardDeleteUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const viewHeight = useViewportHeight();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh

    if (email == "") return;

    dispatch(
      deleteUser({
        email: email,
      })
    )
      .unwrap()
      .then(() => {
        // navigate("/login");
        setMessage("user deleted");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
  };

  return (
    <div
      className="w-full flex items-center justify-center bg-white"
      style={{ height: viewHeight }}
    >
      <AuthCard>
        <p className="text-center text-base mb-4">
          Please enter email to delete
        </p>

        {message != null && (
          <div className="mt-4">
            <p className="w-full text-center text-lg text-green-500">
              {message}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
          <InputField
            label="Email"
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />

          <div className="mt-8">
            <PrimaryButton type="submit">Delete</PrimaryButton>
          </div>
        </form>
      </AuthCard>
    </div>
  );
};

export default HardDeleteUser;
