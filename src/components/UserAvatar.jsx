import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import avatarImg from "../assets/avatar.png";
import { CiEdit } from "react-icons/ci";

const UserAvatar = ({ allowEditing = false, showInfo = true }) => {
  const { profile } = useSelector((store) => store.user);

  const { firstname, lastname, email } = profile;

  return (
    <div className="w-full">
      {/* user avatar */}
      <div className="w-full flex flex-col items-center mt-10 rounded-full space-y-3">
        {/* <CgProfile className="w-24 h-24 bg-[#724EFF] rounded-full" /> */}
        <div className="relative">
          <img
            src={avatarImg}
            alt="Description of image"
            className="w-24 h-24 bg-[#724EFF] rounded-full p-4"
          />
          {allowEditing && (
            <CiEdit className="w-8 h-8 absolute  bottom-0 right-0 text-white bg-black rounded-xl p-[6px] cursor-pointer" />
          )}
        </div>

        {showInfo && (
          <p className="text-lg font-bold">{`${
            firstname != "" ? firstname : "Unknown"
          } ${lastname != "" ? lastname : "Unknown"}`}</p>
        )}

        {showInfo && <p className="text-base text-gray-400">{email}</p>}
      </div>
    </div>
  );
};

export default UserAvatar;
