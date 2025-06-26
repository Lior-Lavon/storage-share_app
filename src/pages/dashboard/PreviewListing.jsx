import { useEffect, useRef, useState } from "react";
import { TiArrowLeft } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showPreviewListing } from "../../features/dashboard/dashboardSlice";
import { GallerySlider } from "../../components";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";

const PreviewListing = ({ isVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listing } = useSelector((store) => store.listing);

  const [height, setHeight] = useState(0);
  const topRef = useRef(null);

  console.log("listing : ", listing);

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

  const publish = () => {
    console.log("publish");
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
      <div className="w-full h-screen relative  bg-white">
        {/* back button */}
        <TiArrowLeft
          onClick={() => {
            dispatch(showPreviewListing());
          }}
          className="absolute top-3 left-4 w-8 h-8 cursor-pointer hover:scale-105 active:scale-95 text-black transition-transform duration-150 z-999"
        />

        <GallerySlider
          images={listing?.images}
          isPreview={true}
          rounded={false}
        />

        {/* full list title */}
        <div
          ref={topRef}
          className="my-4 px-4 bg-white space-y-2 overflow-y-auto"
          style={{ height: `${height}px` }}
        >
          <p className="font-bold text-xl tracking-wide">
            {capitalizeFirst(listing?.title)}
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
          <div className="w-full h-40 bg-gray-300 rounded-2xl"></div>

          {/* type of space */}
          <div className="w-full">
            <p className="text-sm text-gray-400">Type of Space</p>
            <div className="flex items-center gap-2">
              {listing?.storageType?.map((item, index) => {
                return (
                  <p key={index} className="text-black text-sm">
                    {capitalizeFirst(item)}
                  </p>
                );
              })}
            </div>
          </div>

          {/* access details */}
          <div className="w-full">
            <p className="text-sm text-gray-400">Access details</p>
            <p className="text-black text-sm">
              {formatLabel(listing?.accessDetails)}
            </p>
          </div>

          {/* allowed storage type */}
          <div className="w-full">
            <p className="text-sm text-gray-400">Allowed Storage Types</p>
            <div className="flex items-center gap-2">
              {listing?.allowedStorage?.map((item, index) => {
                return (
                  <p key={index} className="text-black text-sm">
                    {capitalizeFirst(item)}
                  </p>
                );
              })}
            </div>
          </div>

          {/* access details */}
          <div className="w-full">
            <p className="text-sm text-gray-400">Minimum Booking Duration</p>
            <p className="text-black text-sm">
              {formatLabel(listing?.minStoragePeriod)}
            </p>
          </div>

          {/* availability / calendar blocking */}
          <div className="w-full">
            <p className="text-sm text-gray-400">
              Availability / Calendar Blocking
            </p>
            <p className="text-black text-sm">
              {/* {formatLabel(listing?.minStoragePeriod)} */}
              {`From: ${formatDate(listing?.startDate)} - To: ${formatDate(
                listing?.endDate
              )}`}
            </p>
          </div>

          {/* Additional notes / Restrictions */}
          <div className="w-full">
            <p className="text-sm text-gray-400">
              Additional notes / Restrictions
            </p>
            <p className="text-black text-sm">
              {formatLabel(listing?.additionalNotes)}
            </p>
          </div>

          <div className="w-full h-[1px] bg-gray-300"></div>

          <div className="w-full mt-5">
            <PrimaryButton type="submit" onClick={publish}>
              Publish this listing
            </PrimaryButton>
          </div>

          <div className="w-full mt-5">
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
          </div>

          <div className="w-full h-10 bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default PreviewListing;
