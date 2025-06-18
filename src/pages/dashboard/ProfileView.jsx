import React, { useEffect, useRef, useState } from "react";
import { TopBar, UserAvatar } from "../../components";
import { showProfile } from "../../features/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

const menu = [
  {
    id: 1,
    title: "My Profile",
    description: "All my personal details",
  },
  {
    id: 2,
    title: "My Financial",
    description: "All my financial details",
  },
  {
    id: 3,
    title: "Settings",
    description: "All my app settings",
  },
];

const ProfileView = ({ isVisible }) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);
  const [clicked, setClicked] = useState(false);
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

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      // Place your actual click handler logic here
      console.log("Clicked:", item.title);
    }, 150); // 150ms delay
  };

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
        <UserAvatar />

        {/* menu */}
        <div className="w-[90%] mx-auto my-8 flex flex-col gap-2 text-left border-b border-gray-300">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(tab.id)}
              className={``}
            >
              <div
                onClick={handleClick}
                className={`w-full flex items-center justify-between border-t border-gray-300 cursor-pointer transition-colors duration-150 ${
                  clicked ? "bg-gray-100" : ""
                }`}
              >
                <div className="w-full text-left my-2 space-y-2">
                  <p className="w-full text-xl">{item.title}</p>
                  <p className="w-full text-sm text-gray-400">
                    {item.description}
                  </p>
                </div>
                <GoArrowRight className="w-6 h-6 text-gray-700" />
              </div>
            </button>
          ))}
        </div>

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
