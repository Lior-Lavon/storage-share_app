import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useViewportHeight from "../utils/useViewportHeight";
import AuthCard from "./SharedComponents/AuthCard";
import InputField from "./SharedComponents/InputField";
import PrimaryButton from "./SharedComponents/PrimaryButton";
import {
  resetPassword,
  validateResetPassword,
} from "../features/user/userSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  const { errorMsg } = useSelector((store) => store.user);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const viewHeight = useViewportHeight();

  useEffect(() => {
    // call the /users/validate_reset_password
    dispatch(validateResetPassword(token))
      .unwrap()
      .then((res) => {
        // navigate("/landing");
        if (res?.data?.status == "success") {
          setUserId(res?.data?.user_id);
          setUserEmail(res?.data?.email);
          console.log("success - ", res);
        } else {
          console.log("failed - ", res);
        }
      })
      .catch((err) => {
        console.error("reset password failed:", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password1 == "" || password2 == "") return;
    if (password1 != password2) return;

    dispatch(
      resetPassword({
        id: userId,
        email: userEmail,
        password: password1,
      })
    )
      .unwrap()
      .then((res) => {
        // navigate("/landing");
        if (res?.data?.status == "success") {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("reset password failed:", err);
      });
  };

  return (
    <div
      className="w-full flex items-center justify-center bg-white"
      style={{ height: viewHeight }}
    >
      <AuthCard>
        <p className="text-center text-base mb-4">Set up a new password</p>
        {errorMsg != null && (
          <p className="w-full text-center text-red-400">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 mb-4">
            <InputField
              label="New password"
              type="password"
              value={password1}
              placeholder="Password"
              onChange={(e) => setPassword1(e.target.value)}
              autoComplete="password"
              disabled={userId == null}
            />
            <InputField
              label="Confirm new password"
              type="password"
              value={password2}
              placeholder="Password"
              onChange={(e) => setPassword2(e.target.value)}
              autoComplete="password"
              disabled={userId == null}
            />
          </div>
          <div className="mt-8">
            <PrimaryButton type="submit" disabled={userId == null}>
              Set new password
            </PrimaryButton>
          </div>
        </form>

        <div className="mt-6 text-base text-center space-y-5 ">
          <div className="flex gap-2 items-center justify-center">
            <p>Don't get email ? </p>
            <a href="/register" className="text-violet-600">
              Try again
            </a>
          </div>
        </div>
      </AuthCard>
    </div>
  );
};

export default ResetPassword;
