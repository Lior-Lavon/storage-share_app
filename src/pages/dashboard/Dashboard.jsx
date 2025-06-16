import React, { useState } from "react";

import { HomeView, MyStorageView, ActivityView, ChatView } from "../index";

import { TabBar, TopBar } from "../../components";

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
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* TopBar */}
      <TopBar />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto pt-16 pb-16 bg-white">
        <div className="p-4">{renderTabContent(activeTab)}</div>
      </div>

      {/* Bottom TabBar */}
      {/* <div
        className="fixed bottom-0 left-0 right-0 z-10 bg-white flex justify-around items-center h-16"
        style={{
          boxShadow:
            "0 -4px 6px -1px rgba(0,0,0,0.05), 0 -2px 4px -2px rgba(0,0,0,0.05)",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center text-sm ${
              activeTab === tab.id ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {tab.icon}
            <span className="text-xs mt-1">{tab.name}</span>
          </button>
        ))}
      </div> */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Dashboard;
