import React, { useState } from "react";

import { HomeView, MyStorageView, ActivityView, ChatView } from "../index";

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
  const [activeTab, setActiveTab] = useState("home");

  const { isProfile } = useSelector((store) => store.dashboard);

  const handleShowProfile = () => {
    dispatch(showProfile());
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* TopBar */}
      <TopBar showProfile={handleShowProfile} title={"StorageShare"} />
      {/* Main content */}
      <div className="flex-1 overflow-y-auto pt-16 pb-16 bg-white">
        <div className="p-4">{renderTabContent(activeTab)}</div>
      </div>
      {/* Bottom TabBar */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* show property view */}
      <ProfileView isVisible={isProfile} closeProfileView={handleShowProfile} />
    </div>
  );
};

export default Dashboard;
