import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RxAvatar } from "react-icons/rx";

const ChatItem = ({ type = "renter", avatarUrl, message, createdAt: time }) => {
  const [msgTime, setMsgTime] = useState("");
  const avatarBaseUrl = import.meta.env.VITE_AWS_S3_AVATAR_BUCKET;

  const getLastMessageTime = () => {
    const createdAt = new Date(time);
    const now = new Date();

    const isToday = createdAt.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = createdAt.toDateString() === yesterday.toDateString();

    // Format time: 09:41AM or 12:01PM
    const timeStr = createdAt
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(" ", "");

    // Format date: 04/Oct/25
    const dateStr = createdAt
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      })
      .replace(/ /g, "/");

    let dateTime;
    if (isToday) {
      dateTime = timeStr;
    } else if (isYesterday) {
      dateTime = "Yesterday";
    } else {
      dateTime = dateStr;
    }

    return { dateTime };
  };

  useEffect(() => {
    setMsgTime(getLastMessageTime().dateTime);
  }, []);

  return (
    <div className="w-[90%] mx-auto">
      {type == "renter" ? (
        <div className="w-full flex gap-2 items-center">
          {/* <RxAvatar className="w-10 h-10 text-gray-300 bg-orange-500 rounded-full" /> */}

          {avatarUrl === "" ? (
            <CgProfile className="w-10 h-10 object-cover text-gray-300 bg-orange-500 rounded-full" />
          ) : (
            <img
              src={`${avatarBaseUrl}/${avatarUrl}`}
              alt="avatar"
              className="w-10 h-10 object-cover text-gray-300 rounded-full"
            />
          )}

          <div className="w-[70%] space-y-1">
            <div className="bg-[#E7E6EE] rounded-t-2xl rounded-br-2xl p-3 text-sm">
              {message}
            </div>
            <p className="text-xs text-gray-400">{msgTime}</p>
          </div>
        </div>
      ) : (
        <div className="w-full flex gap-2 items-center justify-end">
          <div className="w-[70%] space-y-1">
            <div className="bg-orange-500 rounded-t-2xl rounded-bl-2xl p-3 text-sm text-white">
              {message}
            </div>
            <p className="text-right text-xs text-gray-400">{msgTime}</p>
          </div>
          {/* <RxAvatar className="w-10 h-10 text-gray-300 bg-orange-500 rounded-full" /> */}
          {avatarUrl === "" ? (
            <CgProfile className="w-10 h-10 object-cover text-gray-300 bg-orange-500 rounded-full" />
          ) : (
            <img
              src={`${avatarBaseUrl}/${avatarUrl}`}
              alt="avatar"
              className="w-10 h-10 object-cover text-gray-300 rounded-full"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatItem;
