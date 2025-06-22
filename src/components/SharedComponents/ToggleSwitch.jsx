import React from "react";

const ToggleSwitch = ({ checked, onChange, className = "" }) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
        checked ? "bg-indigo-900" : "bg-gray-300"
      } ${className}`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          checked ? "translate-x-8" : ""
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
