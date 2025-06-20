import "react-image-crop/dist/ReactCrop.css";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";

import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";

const MIN_DIMENSION = 1000;
const MAX_WIDTH_DIMENSION = 4000;
const MAX_HEIGHT_DIMENSION = 3000;

const ImageCrop = ({
  updateImage,
  showCropModel,
  useCirculate,
  aspectRatio,
}) => {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  const [crop, setCrop] = useState();
  const dispatch = useDispatch();
  const inputField = useRef(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    showCropModel(false);
  };
  const handleFileSelect = () => {
    inputField.current.click();
  };
  const handleChange = (e) => {
    setIsLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;
      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;

        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 px");
          setImageSrc("");
          return;
        } else if (
          naturalWidth > MAX_WIDTH_DIMENSION ||
          naturalHeight > MAX_HEIGHT_DIMENSION
        ) {
          setError(
            `Image should be max (${MAX_WIDTH_DIMENSION} x ${MAX_HEIGHT_DIMENSION}) px`
          );
          setImageSrc("");
          return;
        }

        setImageSrc(imageUrl);
      });
    });
    reader.readAsDataURL(file);
  };
  const onImageLoad = (e) => {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      aspectRatio,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleImageCrop = () => {
    setCanvasPreview(
      imgRef.current,
      canvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );

    updateImage(fileName, canvasRef.current.toDataURL("image/jpeg", 0.5));

    //  hide the cropModel
    showCropModel(false);
  };

  const setCanvasPreview = (image, canvas, crop) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSoothingQuality = "medium";
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.translate(-cropX, -cropY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );
    ctx.restore();
  };

  return (
    <div className="fixed top-0 w-screen h-screen pt-20 bg-transparent z-999 transition grid place-items-center">
      <div className="w-[90%] mx-auto rounded-md shadow-lg bg-gray-50 grid pb-2 border border-gray-300">
        {/* TITLE */}
        <div className="flex justify-between items-center py-2 px-4">
          <h3 className="font-bold capitalize">Upload image</h3>
          <FaTimes className="text-xl cursor-pointer" onClick={handleClose} />
        </div>
        {/* image crop */}
        <div className="w-[96%] min-h-[100px] mx-auto">
          {!imageSrc ? (
            <div className="w-full h-full grid place-items-center">
              <input
                type="file"
                // accept="image/*"
                onChange={handleChange}
                ref={inputField}
                style={{ display: "none" }}
              />
              {isLoading && (
                <div className="w-full h-[300px] p-[0.1rem] grid place-items-center overflow-hidden border border-black">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex justify-center">
                  <button
                    className="py-1.5 px-4 text-white capitalize text-[0.9rem] transition bg-red-200 inline"
                    onClick={handleFileSelect}
                  >
                    {!isLoading ? "choose file" : "loading"}
                  </button>
                </div>

                {error && <p className="text-red-400 text-xs mt-4">{error}</p>}
              </div>
            </div>
          ) : (
            <div className="w-full h-full px-2 grid justify-center items-center">
              {/* IMAGE */}
              <div className="w-full p-[0.1rem] grid place-items-center overflow-hidden border border-black">
                <ReactCrop
                  crop={crop}
                  onChange={(pixelCrop, percentCrop) => {
                    setCrop(percentCrop);
                  }}
                  circularCrop={useCirculate}
                  keepSelection
                  aspect={aspectRatio}
                  minWidth={MIN_DIMENSION}
                >
                  <img
                    src={imageSrc}
                    ref={imgRef}
                    alt="upload"
                    onLoad={onImageLoad}
                    style={{ maxHeight: "70vh" }}
                  />
                </ReactCrop>
              </div>
              {/* CROP */}
              <div className="flex justify-center mt-2">
                <button
                  className="py-1.5 px-4 text-gray-800 capitalize text-lg shadow transition bg-gray-200 rounded-xl inline-block w-auto"
                  onClick={handleImageCrop}
                >
                  select
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {crop && <canvas ref={canvasRef} style={{ display: "none" }} />}
    </div>
  );
};
export default ImageCrop;
