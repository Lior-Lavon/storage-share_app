import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listChats } from "../../features/chat/chatSlice";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";
import ChatList from "./ChatList";
import { showSingleChatView } from "../../features/dashboard/dashboardSlice";

const ChatView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { chats } = useSelector((store) => store.chat);
  const wrapperRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(null);

  useEffect(() => {
    // load chat list
    dispatch(listChats());
  }, []);

  useEffect(() => {
    console.log("ChatView - chats : ", chats);
  }, [chats]);

  useEffect(() => {
    const updateTabBarTop = () => {
      const tabBar = document.querySelector(".tab-bar");
      const wrapper = wrapperRef.current;

      if (tabBar && wrapper) {
        const tabBarTop = tabBar.getBoundingClientRect().top;

        const wrapperTop = wrapper.getBoundingClientRect().top;
        const availableHeight = tabBarTop - wrapperTop;

        setContentHeight(availableHeight);
      }
    };

    setTimeout(() => {
      updateTabBarTop();
    }, 1);

    window.addEventListener("resize", updateTabBarTop);
    return () => window.removeEventListener("resize", updateTabBarTop);
  }, []);

  const showChat = (chat) => {
    // console.log("chat : ", chat);
    dispatch(showSingleChatView(chat?.chat_id));
  };

  return (
    <div
      ref={wrapperRef}
      id="chat-view-root"
      className="w-full mt-14 flex flex-col flex-1 bg-white"
      style={{
        height: `${contentHeight}px`,
      }}
    >
      <div className="chat-list w-full flex-1 overflow-hidden flex flex-col justify-center items-center">
        <ChatList chats={chats} showChat={showChat} />
      </div>
    </div>
  );
};

export default ChatView;
