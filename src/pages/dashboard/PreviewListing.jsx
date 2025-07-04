import { useEffect, useRef, useState } from "react";
import { TiArrowLeft } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  closeAllViews,
  showCreateListing,
  showPreviewListing,
} from "../../features/dashboard/dashboardSlice";
import { GallerySlider, MapView } from "../../components";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";
import {
  createListing,
  getMyListings,
} from "../../features/listing/listingSlice";

const PreviewListing = ({ isVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listing } = useSelector((store) => store.listing);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (listing?.id !== undefined) {
      const baseUrl = import.meta.env.VITE_AWS_S3_LISTING_BUCKET;
      setImages(
        listing?.images.map((img) => ({
          image: `${baseUrl}/${img}`,
        }))
      );
    } else {
      setImages(listing?.images);
    }
  }, [listing]);

  const [height, setHeight] = useState(0);
  const topRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (topRef.current) {
        const topBottom = topRef.current.getBoundingClientRect().bottom;
        let bottomTop = window.innerHeight;
        setHeight(bottomTop - topBottom);
      }
    };

    updateHeight(); // Call once on mount
  }, []);

  function capitalizeFirst(text) {
    return text?.charAt(0).toUpperCase() + text?.slice(1);
  }

  function formatLabel(text) {
    if (!text || typeof text !== "string") return "";

    const noUnderscores = text.replace(/_/g, " ");
    const trimmed = noUnderscores.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
    // return `${day}/${month}`;
  }

  const prepareImagesForUpload = (imageList) => {
    return imageList.map(({ filename, image }) => {
      const imageTmp = image.replace(/^data:image\/\w+;base64,/, "");
      return { filename, image: imageTmp };
    });
  };

  const publishListing = () => {
    const copyListing = { ...listing };
    copyListing.images = prepareImagesForUpload(copyListing.images);

    dispatch(createListing(copyListing))
      .unwrap()
      .then(() => {
        dispatch(closeAllViews());
        dispatch(
          getMyListings({
            user_id: listing?.userId,
          })
        );
      })
      .catch((err) => {
        console.error("createListing failed:", err);
      });
  };

  return (
    <div
      className={`w-full h-full z-900 fixed top-0 right-0 transition-transform duration-500 flex flex-col bg-white ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
      // style={{
      //   WebkitOverflowScrolling: "touch",
      //   overscrollBehavior: "contain", // prevent pull-to-refresh
      //   touchAction: "none", // stop passive scroll
      // }}
    >
      <div className="flex flex-col h-screen bg-white">
        {/* Back button */}
        <TiArrowLeft
          onClick={() => {
            dispatch(showPreviewListing());
          }}
          className="absolute top-3 left-4 w-8 h-8 cursor-pointer hover:scale-105 active:scale-95 text-black transition-transform duration-150 z-999 bg-white rounded-full"
        />

        {/* Gallery slider */}
        <GallerySlider images={images} isPreview={true} rounded={false} />

        {/* Filler div between slider and button */}
        <div
          ref={topRef}
          className="mt-4 mb-1 px-4 bg-white space-y-2 overflow-y-auto hidden"
          style={{ flex: 1 }}
        >
          <p className="font-bold text-xl tracking-wide">
            {capitalizeFirst(listing?.title)}
          </p>
          <p className="text-sm tracking-wide">
            {capitalizeFirst(listing?.formatted_address)}
          </p>
          <div className="w-full flex items-center justify-between text-lg">
            {/* price */}
            <p className="font-bold">
              <span className=" text-violet-600">€45</span>{" "}
              <span className="text-sm">PM</span>
            </p>

            {/* period */}
            <div className="flex items-center">
              <p className="text-gray-400">
                H <span className="font-bold text-black">3</span>M W
                <span className="font-bold text-black">2</span> D
                <span className="font-bold text-black">2</span>
              </p>
            </div>
          </div>
          {/* description */}
          <p className="text-sm text-gray-600">{listing?.description}</p>

          {/* map */}
          <MapView className="w-full h-40 bg-gray-300 rounded-2xl" />

          {/* type of space */}
          <div className="w-full">
            <p className="text-sm text-gray-400">Type of Space</p>
            <div className="flex items-center gap-2">
              {listing?.storage_type?.map((item, index) => (
                <span key={index} className="text-black text-sm">
                  {capitalizeFirst(item)}
                  {index < listing.storage_type.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
          {/* access details */}
          <div className="w-full">
            <p className="text-sm text-gray-400">Access details</p>
            <p className="text-black text-sm">
              {formatLabel(listing?.storage_access)}
            </p>
          </div>
          {/* allowed storage type */}
          <div className="w-full">
            <p className="text-sm text-gray-400">Allowed Storage Types</p>
            <div className="flex items-center gap-2">
              {listing?.allowed_storage?.map((item, index) => (
                <span key={index} className="text-black text-sm">
                  {capitalizeFirst(item)}
                  {index < listing.allowed_storage.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
          {/* access details */}
          <div className="w-full">
            <p className="text-sm text-gray-400">Minimum Booking Duration</p>
            <p className="text-black text-sm">
              {formatLabel(listing?.min_period)}
            </p>
          </div>
          {/* availability / calendar blocking */}
          <div className="w-full">
            <p className="text-sm text-gray-400">
              Availability / Calendar Blocking
            </p>
            <p className="text-black text-sm">
              {/* {formatLabel(listing?.minStoragePeriod)} */}
              {`From: ${formatDate(
                listing?.availability_from
              )} - To: ${formatDate(listing?.availability_to)}`}
            </p>
          </div>
          {/* Additional notes / Restrictions */}
          <div className="w-full">
            <p className="text-sm text-gray-400">
              Additional notes / Restrictions
            </p>
            <p className="text-black text-sm">
              {formatLabel(listing?.additional_note)}
            </p>
          </div>
        </div>

        {/* Publish button at the bottom */}
        <div className="mb-1 w-full max-w-[95%] mx-auto bg-white">
          <div className="w-full h-[1px] mb-2 bg-gray-300"></div>
          <PrimaryButton type="submit" onClick={publishListing}>
            Publish this listing
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default PreviewListing;

{
  /* <div className="w-full mt-5">
            <PrimaryButton
              type="submit"
              bgColor={"bg-white"}
              textColor={"bg-violet-600"}
              borderColor="border border-violet-600"
              onClick={() => {
                dispatch(showPreviewListing());
              }}
            >
              Back to edit this listing
            </PrimaryButton>
          </div> */
}
