import React from "react";

const TopBar = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-10 bg-white p-4 text-xl font-bold"
      style={{
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)",
      }}
    >
      My App
    </div>
  );
};

export default TopBar;
