import React from "react";
import { CgProfile } from "react-icons/cg";
import { TiArrowLeft } from "react-icons/ti";

const TopBar = ({ ref, showBackIcon, showProfile, title = "" }) => {
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 z-10 bg-white p-3 text-xl font-bold"
      style={{
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          {showBackIcon && (
            <TiArrowLeft
              onClick={() => {
                showBackIcon();
              }}
              className="w-8 h-8 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150"
            />
          )}
          {title != "" && <p className="text-lg">{title}</p>}
        </div>

        {showProfile && (
          <CgProfile
            onClick={() => {
              showProfile();
            }}
            className="w-8 h-8 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150"
          />
        )}
      </div>
    </div>
  );
};

export default TopBar;
