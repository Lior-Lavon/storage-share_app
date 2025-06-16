import React, { useState } from "react";
import { Home, Archive, List, Bell } from "lucide-react";

const TABS = [
  { name: "Home", icon: <Home size={20} />, id: "home" },
  { name: "MyStorage", icon: <Archive size={20} />, id: "my_storage" },
  { name: "Activity", icon: <List size={20} />, id: "activity" },
  { name: "Chat", icon: <Bell size={20} />, id: "chat" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* TopBar */}
      <div
        className="fixed top-0 left-0 right-0 z-10 bg-white p-4 text-xl font-bold"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)",
        }}
      >
        My App
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto pt-16 pb-16 bg-white">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Current Tab: {activeTab}</h2>
        </div>
      </div>

      {/* Bottom TabBar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-10 bg-white flex justify-around items-center h-16"
        style={{
          boxShadow:
            "0 -4px 6px -1px rgba(0,0,0,0.05), 0 -2px 4px -2px rgba(0,0,0,0.05)",
        }}
      >
        {TABS.map((tab) => (
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
      </div>
    </div>
  );
};

export default Dashboard;
