import React from "react";

const NotSupported = () => {
  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-[500px]">
        <div className="bg-gray-100 py-10 shadow-lg rounded-2xl text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-500">
            Device Not Supported
          </h1>
          <p className="text-gray-600">
            Sorry, this app is not <br></br>supported on this resolution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotSupported;
