import React, { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import PrimaryButton from "./SharedComponents/PrimaryButton";
import { useDispatch } from "react-redux";
import { showCropImageView } from "../features/dashboard/dashboardSlice";
import ImageSlider from "./ImageSlider.jsx";

const GallerySlider = ({
  label,
  images,
  isPreview,
  rounded = true,
  disabled = false,
}) => {
  const dispatch = useDispatch();
  // const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    if (images?.length > 0) {
      setCroppedImage(images[0]); // Don't use createObjectURL
      dispatch(showCropImageView("ForceClose"));
    }
  }, [images]);

  return (
    <div>
      <label className="text-base font-medium">{label}</label>
      <div
        className={`w-full h-[200px] border border-dotted border-gray-400 mt-1 ${
          rounded ? "rounded-2xl" : ""
        } flex items-center justify-center bg-gray-100`}
      >
        <div className="w-full h-full flex flex-col justify-center items-center gap-5 cursor-pointer">
          {!croppedImage ? (
            <>
              <div className="relative">
                <CiImageOn className="text-gray-400 w-14 h-14" />
                {!isPreview && (
                  <FiPlus className="bg-white text-gray-400 absolute top-0 right-0" />
                )}
              </div>
              {!isPreview && (
                <div
                  className="w-[90%] text-sm text-center text-violet-600 py-2 px-8 border-1 border-gray-300 rounded-xl"
                  onClick={() => {
                    if (disabled) return;
                    dispatch(showCropImageView());
                  }}
                >
                  Upload Image
                </div>
              )}
            </>
          ) : (
            // <img
            //   src={croppedImage}
            //   alt="Cropped"
            //   className="w-full h-full object-cover rounded-2xl"
            // />
            <ImageSlider images={images} />
          )}
        </div>
      </div>
      {croppedImage && !isPreview && (
        <div
          className="w-[100%] text-sm text-center text-violet-600 py-2 px-8 border-1 border-gray-300 rounded-xl"
          onClick={() => dispatch(showCropImageView())}
        >
          Upload another image
        </div>
      )}
    </div>
  );
};

export default GallerySlider;
