import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { CiImageOn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { showCropImageView } from "../features/dashboard/dashboardSlice";
import ImageSlider from "./ImageSlider.jsx";
import { FaRegTrashCan } from "react-icons/fa6";

const GallerySlider = forwardRef(
  (
    { label, images, isPreview, rounded = true, disabled = false, deleteImage },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const dispatch = useDispatch();
    // const [showCropper, setShowCropper] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);

    const rootRef = useRef(null);

    useImperativeHandle(ref, () => ({
      reset: () => setCroppedImage(null),
      getBoundingClientRect: () => rootRef.current?.getBoundingClientRect(),
    }));

    useEffect(() => {
      if (images?.length > 0) {
        setCroppedImage(images[0].image); // Don't use createObjectURL
        dispatch(showCropImageView("ForceClose"));
      }
    }, [images]);

    // useEffect(() => {
    //   console.log("croppedImage : ", croppedImage);
    // }, [croppedImage]);

    const handleDeleteImage = () => {
      const imageToDelete = images[currentIndex];
      if (deleteImage != undefined) {
        deleteImage(imageToDelete?.image);
      }
    };

    return (
      <div ref={rootRef} className="">
        <label className="text-base font-medium">{label}</label>
        <div
          className={`w-full h-[200px] border border-dotted border-gray-400 ${
            rounded ? "rounded-2xl" : ""
          } flex items-center justify-center bg-gray-100 relative`}
        >
          <div className="w-full h-full flex flex-col justify-center items-center gap-5 cursor-pointer">
            {croppedImage == null ? (
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
              <ImageSlider images={images} onChange={setCurrentIndex} />
            )}
          </div>

          <div className="absolute top-2 right-2">
            {images?.length > 0 && (
              <FaRegTrashCan
                className="w-8 h-8 p-1.5 text-red-500 bg-white rounded-lg cursor-pointer"
                onClick={handleDeleteImage}
              />
            )}
          </div>
        </div>
        {croppedImage != null && !isPreview && (
          <div
            className="w-[100%] text-sm text-center text-violet-600 mt-4 py-2 px-8 border-1 border-gray-300 rounded-xl"
            onClick={() => dispatch(showCropImageView())}
          >
            Upload another image
          </div>
        )}
      </div>
    );
  }
);

export default GallerySlider;
