import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useViewportHeight from "../../utils/useViewportHeight";
import { logoutUser } from "../../features/user/userSlice";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";

const HomeView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewHeight = useViewportHeight();

  const { profile } = useSelector((store) => store.user);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    dispatch(logoutUser());
  };

  return (
    <div
      className="w-full flex items-center justify-center bg-white"
      style={{ height: viewHeight }}
    >
      {/* <div className="w-[90%]">
        {profile == null ? (
          <div className="flex flex-col space-y-2">
            <PrimaryButton onClick={() => navigate("/login")}>
              Sign in
            </PrimaryButton>

            <PrimaryButton onClick={() => navigate("/delete_user")}>
              Delete user
            </PrimaryButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <PrimaryButton type="submit">Sign out</PrimaryButton>
          </form>
        )}
      </div> */}
    </div>
  );
};

export default HomeView;
