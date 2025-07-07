import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";
import PrimaryButton from "./SharedComponents/PrimaryButton";

const ImageCropper = ({
  closeModal,
  onCropped,
  shape = "circle",
  aspect = 1,
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const IMAGE_WIDTH = 800;
  const IMAGE_HEIGHT = 800;

  const inputRef = useRef();
  const inputCameraRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const resized = await resizeImage(
        reader.result,
        IMAGE_WIDTH,
        IMAGE_HEIGHT
      );
      setImageSrc(resized);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropImage = async () => {
    const croppedImage = await getCroppedImg(
      imageSrc,
      croppedAreaPixels,
      shape === "circle"
    );
    onCropped(croppedImage);
  };

  const resizeImage = (base64Str, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const scale = Math.min(maxWidth / width, maxHeight / height);
          width *= scale;
          height *= scale;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.9);
        resolve(resizedBase64);
      };
    });
  };

  return (
    <div
      className="w-full h-screen absolute top-0 flex items-center justify-center bg-black/70 z-50"
      onClick={closeModal}
    >
      <div
        className="w-[90%] max-w-md mx-auto p-4 space-y-4 bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hidden Inputs */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {/* <input
          ref={inputCameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        /> */}
        {/* Camera Input (Android-friendly) */}
        <input
          ref={inputCameraRef}
          type="file"
          accept="image/*"
          capture
          className="hidden"
          onChange={handleFileChange}
        />

        {!imageSrc && (
          // <div className="w-full flex flex-col items-center gap-5">
          //   <p className="font-bold text-left">Upload or Take Photo</p>
          //   <div className="flex flex-col gap-5 w-[250px]">
          //     <PrimaryButton onClick={() => inputRef.current.click()}>
          //       Select
          //     </PrimaryButton>
          //   </div>
          // </div>
          <div className="flex flex-col gap-5 w-[250px]">
            <div className="flex flex-col gap-5 w-[250px]">
              <PrimaryButton onClick={() => inputRef.current.click()}>
                Select from Gallery
              </PrimaryButton>
              <PrimaryButton onClick={() => inputCameraRef.current.click()}>
                Take Photo
              </PrimaryButton>
            </div>
          </div>
        )}

        {imageSrc && (
          <div className="relative w-full h-[400px] bg-black rounded overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={shape === "circle" ? 1 : aspect}
              cropShape={shape === "circle" ? "round" : "rect"}
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

export default ImageCropper;
