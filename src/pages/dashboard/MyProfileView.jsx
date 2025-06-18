import React, { useEffect, useRef, useState } from "react";

import { TopBar, UserAvatar } from "../../components";
import { showMyProfile } from "../../features/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";

const MyProfileView = ({ isVisible }) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (topRef.current) {
        const topBottom = topRef.current.getBoundingClientRect().bottom;
        const bottomTop = bottomRef.current.getBoundingClientRect().top;
        setHeight(bottomTop - topBottom);
      }
    };

    updateHeight(); // Call once on mount
  }, []);

  const hideMyProfileView = () => {
    dispatch(showMyProfile());
  };

  return (
    <div
      className={`w-full h-full z-90 fixed top-0 right-0 transition-transform duration-500 flex flex-col bg-white ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "contain", // prevent pull-to-refresh
        touchAction: "none", // stop passive scroll
      }}
    >
      <TopBar
        ref={topRef}
        showBackIcon={hideMyProfileView}
        title={"My Profile"}
      />

      <div
        className="w-full mt-[56px] relative bg-white overflow-y-auto"
        style={{ height: `${height}px` }}
      >
        <UserAvatar allowEditing={true} showInfo={false} />
      </div>
      {/* delete account */}
      <div
        ref={bottomRef}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] text-xl text-red-400 text-center rounded-2xl bg-white py-2 border-[0.5px] border-gray-400"
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
        Delete account
      </div>
    </div>
  );
};

export default MyProfileView;
