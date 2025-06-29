import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useViewportHeight from "../utils/useViewportHeight";
import { useDispatch } from "react-redux";
import { clearError, verifyEmailRequest } from "../features/user/userSlice";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  const viewHeight = useViewportHeight();

  const [verifyEmail, setVerifyEmail] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(clearError());
  }, []);

  useEffect(() => {
    dispatch(verifyEmailRequest(token))
      .unwrap()
      .then((res) => {
        // navigate("/landing");
        if (res?.data?.status == "success") {
          setVerifyEmail(1);

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((err) => {
        console.error("reset password failed.:", err);
        setVerifyEmail(2);
        setError(err);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      });
  }, []);

  return (
    <div
      className="w-full flex items-center justify-center bg-white"
      style={{ height: viewHeight }}
    >
      <div>
        {verifyEmail == 0 && (
          <p className="text-base text-black">verifying ..</p>
        )}

        {verifyEmail == 1 && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg text-green-500">Email verified</p>
            <p className="text-xs mt-5">redirecting ... </p>
          </div>
        )}

        {verifyEmail == 2 && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg text-red-500">Email NOT verified</p>
            <p className="text-sm mt-2">{error}</p>
            <p className="text-xs mt-5">redirecting ... </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
