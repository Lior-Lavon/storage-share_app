import React, { useEffect, useRef, useState } from "react";
import { CiImageOn, CiSearch } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import { StringCapitalize } from "../../utils/StringCapital";
import InputField from "../../components/SharedComponents/InputField";
import { Spinner } from "../../components";

const ChatList = ({ chats, showChat }) => {
  const { profile } = useSelector((store) => store.user);
  const { isLoading } = useSelector((store) => store.chat);
  const [searchText, setSearchText] = useState("");

  const avatarBaseUrl = import.meta.env.VITE_AWS_S3_AVATAR_BUCKET;
  const listingBaseUrl = import.meta.env.VITE_AWS_S3_LISTING_BUCKET;

  const getLastMessageInfo = (messages) => {
    if (!messages || messages.length === 0) return { x: null, y: null };

    const lastMessage = messages[messages.length - 1];
    const updatedAt = new Date(lastMessage.created_at);
    const now = new Date();

    const isToday = updatedAt.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = updatedAt.toDateString() === yesterday.toDateString();

    // Format time: 09:41AM or 12:01PM
    const timeStr = updatedAt
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(" ", "");

    // Format date: 04/Oct/25
    const dateStr = updatedAt
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

    const lastMessageText = lastMessage.message;

    return { dateTime, lastMessageText };
  };

  function hasSeenLastMessage(chat, currentUserId) {
    const messages = chat.messages || [];
    if (messages.length === 0) return true;

    const isHost = chat.host_id === currentUserId;
    const isRenter = chat.renter_id === currentUserId;

    if (!isHost && !isRenter) {
      console.warn("Current user is not a participant in this chat.");
      return false;
    }

    // Find the last message sent by the *other* user
    const otherUserId = isHost ? chat.renter_id : chat.host_id;
    const lastMessageFromOther = [...messages]
      .reverse()
      .find((msg) => msg.sender_id === otherUserId);

    if (!lastMessageFromOther) {
      // If the other user hasn't sent a message yet, then user has nothing to miss
      return true;
    }

    const lastViewed = new Date(
      isHost ? chat.host_last_viewed : chat.renter_last_viewed
    );
    const lastMessageTime = new Date(lastMessageFromOther.created_at);

    return lastViewed >= lastMessageTime;
  }

  const sendMessage = () => {};

  return (
    <div className="w-full h-full bg-white p-4">
      <p className="text-xl font-bold">Chats:</p>

      {/* Bottom input field */}
      <div className="w-full py-2 bg-white relative">
        <InputField
          label=""
          type="text"
          value={searchText}
          placeholder="Search message"
          onChange={(e) => setSearchText(e.target.value)}
          autoComplete="chat_input_field"
        />
        <div className="absolute right-4 top-1/2 -translate-y-[34%] text-gray-500">
          <CiSearch className="w-5 h-5" onClick={sendMessage} />
        </div>
      </div>

      {chats.map((propItem, index) => {
        // console.log("propItem : ", propItem);

        const { dateTime, lastMessageText } = getLastMessageInfo(
          propItem?.messages || []
        );

        const viewed = hasSeenLastMessage(propItem, profile.id);

        return (
          <div
            key={index}
            className="flex items-center justify-between my-4 pb-4 border-b border-gray-200"
            onClick={() => {
              showChat(propItem);
            }}
          >
            <div className="flex items-center gap-6 ">
              {propItem?.host_id == profile.id ? (
                <div className="relative w-10 h-10">
                  {/* Orange circle with user icon */}
                  <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm relative z-10">
                    {propItem?.renter_avatar == "" ? (
                      <RxAvatar className="w-6 h-6 text-gray-300" />
                    ) : (
                      <img
                        className="rounded-full"
                        src={`${avatarBaseUrl}/${propItem?.renter_avatar}`}
                      />
                    )}
                  </div>

                  {/* Gray pill button */}
                  <div className="absolute -bottom-2 -right-3 w-7 h-7 bg-gray-300 rounded-[8px] flex items-center justify-center text-[10px] text-gray-700 z-5">
                    {propItem?.listing_image == "" ? (
                      <CiImageOn className="w-4 h-4 text-white" />
                    ) : (
                      <img
                        className="rounded-full object-cover"
                        src={`${listingBaseUrl}/${propItem?.listing_image}`}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative w-10 h-10">
                  {/* Orange circle with user icon */}
                  <div className="w-9 h-9 rounded-[8px] bg-gray-300 flex items-center justify-center text-white text-sm relative z-5">
                    {propItem?.listing_image == "" ? (
                      <CiImageOn className="w-6 h-6 text-white" />
                    ) : (
                      <img
                        className="rounded-full object-cover"
                        src={`${listingBaseUrl}/${propItem?.listing_image}`}
                      />
                    )}
                  </div>

                  {/* Gray pill button */}
                  <div className="absolute -bottom-2 -right-3 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-[10px] text-gray-700 z-10">
                    {propItem?.host_avatar == "" ? (
                      <RxAvatar className="w-4 h-4 text-gray-300" />
                    ) : (
                      <img
                        className="rounded-full"
                        src={`${avatarBaseUrl}/${propItem?.host_avatar}`}
                      />
                    )}
                  </div>
                </div>
              )}
              <div>
                <p className="text-black text-sm">
                  {StringCapitalize(propItem?.listing_title)}
                </p>
                {propItem?.host_id == profile.id ? (
                  <p className="text-black text-sm">
                    {StringCapitalize(propItem?.renter_name)}
                  </p>
                ) : (
                  <p className="text-black text-xs">
                    {StringCapitalize(propItem?.host_name)}
                  </p>
                )}

                <p className="text-gray-400 text-xs">
                  {StringCapitalize(lastMessageText)}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 text-xs text-gray-500">
              <span>{dateTime}</span>
              <div
                className={`w-3 h-3 ${
                  viewed ? "bg-gray-500" : "bg-orange-500"
                } rounded-full`}
              ></div>
            </div>
          </div>
        );
      })}

      {isLoading && (
        <div className="w-full h-full bg-transparent absolute z-90 top-0 left-0 flex items-center justify-center">
          <div className="w-6 h-6 flex items-center justify-center">
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatList;
