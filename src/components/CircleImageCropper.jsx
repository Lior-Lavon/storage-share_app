import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";
import PrimaryButton from "./SharedComponents/PrimaryButton";

const CircleImageCropper = ({ closeModal, onCropped }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const inputRef = useRef();
  const inputCameraRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropImage = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropped(croppedImage);
  };

  return (
    <div
      className="w-full h-screen absolute top-0 flex items-center justify-center bg-black/70 z-50"
      onClick={closeModal}
    >
      <div
        className="w-[90%] max-w-md mx-auto p-4 space-y-4 bg-white rounded-2xl shadow-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Hidden Inputs */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          ref={inputCameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />

        {!imageSrc && (
          <div className="w-full flex flex-col items-center gap-5">
            <p className="font-bold text-left">Upload or Take Photo</p>
            <div className="flex flex-col gap-5 w-[250px]">
              <PrimaryButton onClick={() => inputRef.current.click()}>
                Select
              </PrimaryButton>
              {/* <PrimaryButton onClick={() => inputCameraRef.current.click()}>
                Capture from Camera
              </PrimaryButton> */}
            </div>
          </div>
        )}

        {imageSrc && (
          <div className="relative w-full h-[400px] bg-black rounded overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}

        {imageSrc && (
          <PrimaryButton onClick={handleCropImage}>Select</PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default CircleImageCropper;
