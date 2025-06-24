import React, { useState } from "react";

const TypeSwitch = ({ initialType = "storage", onSwitch }) => {
  const [activeType, setActiveType] = useState(initialType);

  const handleSwitch = (type) => {
    if (type !== activeType) {
      setActiveType(type);
      onSwitch?.(type);
    }
  };

  return (
    <div className="relative flex w-full rounded-xl bg-[#F1F0F9] p-1 shadow-inner">
      {/* Sliding Background */}
      <div
        className={`absolute top-1 bottom-1 left-1 rounded-lg bg-white transition-all duration-300 ease-in-out`}
        style={{
          width: "calc(50% - 2px)",
          // left: activeType === "storage" ? "4px" : "calc(50% + 4px)",
          left: activeType === "storage" ? "4px" : "calc(50% - 2px)",
        }}
      />

      {/* Buttons */}
      <button
        className={`relative z-10 w-1/2 text-base font-semibold py-1 transition-colors duration-300 ${
          activeType === "storage" ? "text-[#6D28D9]" : "text-black"
        }`}
        onClick={() => handleSwitch("storage")}
      >
        My Storage
      </button>
      <button
        className={`relative z-10 w-1/2 text-base font-semibold py-1 transition-colors duration-300 ${
          activeType === "listing" ? "text-[#6D28D9]" : "text-black"
        }`}
        onClick={() => handleSwitch("listing")}
      >
        My Listing
      </button>
    </div>
  );
};

export default TypeSwitch;
