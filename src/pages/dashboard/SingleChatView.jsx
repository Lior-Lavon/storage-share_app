import React, { useEffect, useRef, useState, CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChatItem, ListingBar, TopBar } from "../../components";
import { showSingleChatView } from "../../features/dashboard/dashboardSlice";
import InputField from "../../components/SharedComponents/InputField";
import { BsSend } from "react-icons/bs";
import {
  markChatAsViewed,
  sendChatMessage,
} from "../../features/chat/chatSlice";

const SingleChatView = ({ isVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState("");
  const [chat, setChat] = useState(null);
  const { chatId } = useSelector((store) => store.dashboard.isSingleChatView);
  const { chats } = useSelector((store) => store.chat);

  const topRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      console.log("SingleChatView is now visible");
      dispatch(
        markChatAsViewed({
          chat_id: chatId,
        })
      );
    } else {
      console.log("SingleChatView is now hidden");
    }
  }, [isVisible]);

  useEffect(() => {
    const thisChat = chats?.find((chat) => chat.chat_id === chatId);
    setChat(thisChat);
  }, [chats, chatId]);

  const hideSingleChatView = () => {
    dispatch(showSingleChatView());
  };

  const sendMessage = () => {
    dispatch(
      sendChatMessage({
        chat_id: chatId,
        message: chatMessage,
      })
    );
  };

  return (
    <div
      className={`w-full h-full bg-white z-10 fixed top-0 right-0 transition-transform duration-500 flex flex-col ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "contain", // prevent pull-to-refresh
        touchAction: "none", // stop passive scroll
      }}
    >
      {/* Top Bar (static height) */}
      <TopBar ref={topRef} showBackIcon={hideSingleChatView} title="Chat" />

      <div className="mt-[4.5rem]">
        <ListingBar chat={chat} />
      </div>

      <div className="flex-1 overflow-y-auto bg-white pt-4 flex flex-col gap-4">
        {chat?.messages?.map((item, index) => {
          const type =
            item.sender_id === chat.host_id
              ? "host"
              : item.sender_id === chat.renter_id
              ? "renter"
              : "";

          const avatar =
            type === "host"
              ? chat.host_avatar
              : type === "renter"
              ? chat.renter_avatar
              : "";

          return (
            <ChatItem
              key={index}
              type={type}
              avatarUrl={avatar}
              message={item?.message}
              createdAt={item?.created_at}
            />
          );
        })}
      </div>

      {/* Bottom input field */}
      <div className="w-full px-4 py-2 bg-white relative">
        <InputField
          label=""
          type="text"
          value={chatMessage}
          placeholder="Type your message"
          onChange={(e) => setChatMessage(e.target.value)}
          autoComplete="chat_input_field"
        />
        <div className="absolute right-8 top-1/2 -translate-y-[30%] text-gray-500">
          <BsSend className="w-5 h-5" onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default SingleChatView;
