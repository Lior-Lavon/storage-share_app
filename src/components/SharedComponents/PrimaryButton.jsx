import React from "react";

const PrimaryButton = ({ children, onClick, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
  >
    {children}
  </button>
);

export default PrimaryButton;
