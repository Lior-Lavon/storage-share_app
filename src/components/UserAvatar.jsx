import React, { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import avatarImg from "../assets/avatar.png";
import { CiEdit } from "react-icons/ci";
import { deleteAvatar } from "../features/user/userSlice";

const UserAvatar = ({
  showModal,
  imageUrl,
  firstname,
  lastname,
  email,
  allowEditing = false,
  showInfo = true,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuVisible]);

  const getImageUrl = () => {
    const baseUrl = import.meta.env.VITE_AWS_S3_BUCKET;
    return `${baseUrl}/${imageUrl}`;
  };

  const handleDeleteAvatar = () => {
    toggleMenu();
    dispatch(deleteAvatar());
  };

  return (
    <div className="w-full">
      {/* user avatar */}
      <div className="w-full flex flex-col items-center mt-10 rounded-full space-y-3">
        <div className="relative">
          {imageUrl != "" ? (
            <img
              src={getImageUrl()}
              alt="User avatar"
              className="w-24 h-24 bg-[#724EFF] rounded-full object-cover"
            />
          ) : (
            <img
              src={avatarImg}
              alt="User avatar"
              className="w-24 h-24 bg-[#724EFF] rounded-full p-4"
            />
          )}

          {allowEditing && (
            <div className="relative">
              <CiEdit
                className="w-8 h-8 absolute bottom-0 right-0 text-white bg-black rounded-xl p-[6px] cursor-pointer"
                onClick={toggleMenu}
              />
              {menuVisible && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                >
                  <ul className="text-sm text-gray-700">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        toggleMenu();
                        showModal();
                      }}
                    >
                      Upload New Photo
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleDeleteAvatar}
                    >
                      Remove Photo
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {showInfo && (
          <p className="text-lg font-bold">{`${
            firstname !== "" ? firstname : "Unknown"
          } ${lastname !== "" ? lastname : "Unknown"}`}</p>
        )}

        {showInfo && <p className="text-base text-gray-400">{email}</p>}
      </div>
    </div>
  );
};

export default UserAvatar;
