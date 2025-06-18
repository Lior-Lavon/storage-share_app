import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import avatarImg from "../assets/avatar.png";

const UserAvatar = () => {
  const { profile } = useSelector((store) => store.user);

  const { firstname, lastname, email } = profile;

  return (
    <div className="w-full">
      {/* user avatar */}
      <div className="w-full flex flex-col items-center mt-10 rounded-full space-y-3">
        {/* <CgProfile className="w-24 h-24 bg-[#724EFF] rounded-full" /> */}
        <img
          src={avatarImg}
          alt="Description of image"
          className="w-24 h-24 bg-[#724EFF] rounded-full p-4"
        />
        <p className="text-lg font-bold">{`${
          firstname != "" ? firstname : "Unknown"
        } ${lastname != "" ? lastname : "Unknown"}`}</p>
        <p className="text-base text-gray-400">{email}</p>
      </div>
    </div>
  );
};

export default UserAvatar;
