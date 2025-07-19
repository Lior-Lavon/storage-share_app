import React, { useEffect, useRef, useState } from "react";

import {
  HomeView,
  MyStorageView,
  ActivityView,
  ChatView,
  CreateListing,
  PreviewListing,
  SingleChatView,
} from "../index";

import { TabBar, TopBar } from "../../components";
import ProfileView from "./ProfileView";
import { useDispatch, useSelector } from "react-redux";
import { showProfile } from "../../features/dashboard/dashboardSlice";

function renderTabContent(activeTab) {
  switch (activeTab) {
    case "home":
      return <HomeView />;
    case "my_storage":
      return <MyStorageView />;
    case "activity":
      return <ActivityView />;
    case "chat":
      return <ChatView />;
    default:
      return <div>Unknown Tab</div>;
  }
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [activeTab, setActiveTab] = useState("home");
  const [viewHeight, setViewHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (topRef.current && bottomRef.current) {
        const topBottom = topRef.current.getBoundingClientRect().bottom;
        const bottomTop = bottomRef.current.getBoundingClientRect().top;
        const availableHeight = bottomTop - topBottom;
        setViewHeight(availableHeight);
      }
    };

    // Initial run
    updateHeight();

    // Recalculate on window resize
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { isProfile, isCreateListing, isPreviewListing, isSingleChatView } =
    useSelector((store) => store.dashboard);

  const handleShowProfile = () => {
    dispatch(showProfile());
  };

  return (
    <div className="relative w-full items-center">
      <div
        className="flex flex-col h-screen w-full bg-white overflow-y-hidden"
        style={{
          overscrollBehaviorY: "contain", // block pull-to-refresh
          WebkitOverflowScrolling: "touch", // allow momentum scroll on iOS
        }}
      >
        {/* TopBar */}
        <TopBar
          ref={topRef}
          showProfile={handleShowProfile}
          title="StorageShare"
        />

        <div className="scroll-content flex-1 min-h-0 bg-white">
          {renderTabContent(activeTab)}
        </div>

        {/* Bottom TabBar */}
        <TabBar
          ref={bottomRef}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <ProfileView isVisible={isProfile} />
      <CreateListing isVisible={isCreateListing} />
      <PreviewListing isVisible={isPreviewListing} />
      <SingleChatView isVisible={isSingleChatView.visible} />
    </div>
  );
};

export default Dashboard;
