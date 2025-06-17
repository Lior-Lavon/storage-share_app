import React, { useEffect, useRef, useState } from "react";
import { TopBar } from "../../components";
import { showProfile } from "../../features/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const ProfileView = ({ isVisible }) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);
  const topRef = useRef(null);
  const handleHideProfileView = () => {
    dispatch(showProfile());
  };

  useEffect(() => {
    const updateHeight = () => {
      if (topRef.current) {
        const topBottom = topRef.current.getBoundingClientRect().bottom;
        const bottomTop = window.innerHeight;
        setHeight(bottomTop - topBottom);
      }
    };

    updateHeight(); // Call once on mount
  }, []);

  return (
    <div
      className={`w-full h-full z-90 fixed top-0 right-0 transition-transform duration-500 flex flex-col bg-blue-300 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <TopBar
        ref={topRef}
        showBackIcon={handleHideProfileView}
        title={"Profile"}
      />
      <div
        className="w-full mt-[56px] bg-white relative"
        style={{ height: `${height}px` }}
      >
        {/* logout */}
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] text-xl text-[#724EFF] text-center rounded-2xl bg-white py-2 border-[0.5px] border-gray-400"
          onClick={() => {
            dispatch(logoutUser())
              .unwrap()
              .then(() => {
                handleHideProfileView();
              })
              .catch((err) => {
                console.error("Logout failed:", err);
                // navigate("/");
              });
          }}
        >
          Log out
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
