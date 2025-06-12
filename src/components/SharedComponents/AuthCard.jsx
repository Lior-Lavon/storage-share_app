import React from "react";

const AuthCard = ({ children }) => (
  <div className="w-[90%] max-w-[640px] mx-auto bg-white p-6 rounded-lg shadow-md">
    <div className="text-center mb-2">
      <div className="bg-gray-200 px-4 py-2 mb-6 inline-block">
        Logo placeholder
      </div>
      <h2 className="text-2xl font-semibold text-violet-600">
        Welcome to StorageShare
      </h2>
    </div>
    {children}
  </div>
);

export default AuthCard;
