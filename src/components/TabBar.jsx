import React from "react";
import { tabs } from "../data/tabs";

const TabBar = ({ activeTab, setActiveTab }) => {
  return (
    <div
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
    </div>
  );
};

export default TabBar;
