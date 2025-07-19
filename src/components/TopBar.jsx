import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { TiArrowLeft } from "react-icons/ti";
import { useSelector } from "react-redux";

const TopBar = React.forwardRef(
  ({ showBackIcon, showProfile, title = "" }, ref) => {
    const { profile } = useSelector((store) => store.user);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
      if (profile?.avatar) {
        const baseUrl = import.meta.env.VITE_AWS_S3_AVATAR_BUCKET;
        const url = `${baseUrl}/${profile.avatar}`;
        setImageUrl(url);
      }
    }, [profile]);

    return (
      <div
        ref={ref}
        className="fixed w-full top-0 left-0 z-10 bg-white p-3 text-xl font-bold"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            {showBackIcon && (
              <TiArrowLeft
                onClick={showBackIcon}
                className="w-8 h-8 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150"
              />
            )}
            {title && <p className="text-lg text-black">{title}</p>}
          </div>

          {showProfile && (
            <div
              className="w-8 h-8 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150"
              onClick={showProfile}
            >
              {imageUrl === "" ? (
                <CgProfile className="w-full h-full object-cover" />
              ) : (
                <img
                  src={imageUrl}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default TopBar;
