import React, { useState } from "react";

import {
  HomeView,
  MyStorageView,
  ActivityView,
  ChatView,
  CreateListing,
} from "../index";

import { TabBar, TopBar } from "../../components";
import ProfileView from "./ProfileView";
import { useDispatch, useSelector } from "react-redux";
import { showProfile } from "../../features/dashboard/dashboardSlice";
import PreviewListing from "./PreviewListing";

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
  const [activeTab, setActiveTab] = useState("home");

  const { isProfile, isCreateListing, isPreviewListing } = useSelector(
    (store) => store.dashboard
  );

  const handleShowProfile = () => {
    dispatch(showProfile());
  };

  return (
    <div className="w-full items-center">
      <div
        className="flex flex-col h-screen w-full bg-gray-100 overflow-y-hidden"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain", // prevent pull-to-refresh
          touchAction: "none", // stop passive scroll
        }}
      >
        {/* TopBar */}
        <TopBar showProfile={handleShowProfile} title={"StorageShare"} />
        {/* Main content */}
        <div className="flex-1 overflow-y-auto pt-14 pb-16">
          <div className="">{renderTabContent(activeTab)}</div>
        </div>
        {/* Bottom TabBar */}
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <ProfileView isVisible={isProfile} />
      <CreateListing isVisible={isCreateListing} />
      <PreviewListing isVisible={isPreviewListing} />
    </div>
  );
};

export default Dashboard;
