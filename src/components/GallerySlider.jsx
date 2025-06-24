import React from "react";
import { CiImageOn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import PrimaryButton from "./SharedComponents/PrimaryButton";

const GallerySlider = () => {
  return (
    <div className="w-full h-[180px] border border-dotted border-gray-400 rounded-2xl p-4 flex items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <div className="relative">
          <CiImageOn className="text-gray-400 w-14 h-14" />
          <FiPlus className="bg-white text-gray-400 absolute top-0 right-0" />
        </div>
        <div className="w-[90%] text-sm text-center text-violet-600 py-2 px-8 border-1 border-gray-300 rounded-xl">
          Upload Images
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;
