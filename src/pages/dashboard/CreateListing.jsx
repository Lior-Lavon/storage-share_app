import React, { useEffect, useRef, useState, CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GallerySlider, ImageCropper, TopBar } from "../../components";
import {
  showCreateListing,
  showCropImageView,
} from "../../features/dashboard/dashboardSlice";
import { GrValidate } from "react-icons/gr";
import { HiOutlineRefresh } from "react-icons/hi";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";
import InputField from "../../components/SharedComponents/InputField";
import EditField from "../../components/SharedComponents/EditField";
import MultiSelectTag from "../../components/SharedComponents/MultiSelectTag";
import SelectField from "../../components/SharedComponents/SelectField";
import DatePickerField from "../../components/SharedComponents/DatePickerField";
import { validateAddressWithGoogle } from "../../features/listing/listingSlice";
import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const listing = {};

const CreateListing = ({ isVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [changePasswordError, setChangePasswordError] = useState(null);
  const { isLoading } = useSelector((store) => store.listing);
  const { isCropView } = useSelector((store) => store.dashboard);

  const [images, setImages] = useState([]);
  const [listTitle, setListTitle] = useState("title");
  const [listDescription, setListDescription] = useState("description");
  const [listAddress, setListAddress] = useState(
    "Groenhoven 806, 1103 LZ, amsterdam, Netherlands"
  );
  const [validateAddress, setValidateAddress] = useState(true);
  const [storageType, setStorageType] = useState(["garage", "room"]);
  const [allowedStorage, setAllowedStorage] = useState(["boxes", "car"]);
  const [listSize, setListSize] = useState("50");
  const [accessDetails, setAccessDetails] = useState("not_set");
  const [pricePer, setPricePer] = useState("not_set");
  const [minStoragePeriod, setMinStoragePeriod] = useState("not_set");
  const [additionalNotes, setAdditionalNotes] = useState("additional notes");
  const [listingStartDate, setListingStartDate] = useState(
    "2025-06-01T19:46:13.92056Z"
  );
  const [listingEndDate, setListingEndDate] = useState(
    "2025-06-10T19:46:13.92056Z"
  );

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

  const hideCreateListingView = () => {
    setChangePasswordError(null);
    dispatch(showCreateListing());
  };

  const handleCreateListing = () => {
    console.log("handleCreateListing");
  };

  const validateListingAddress = () => {
    dispatch(
      validateAddressWithGoogle({
        address: listAddress,
      })
    )
      .unwrap()
      .then(() => {
        setValidateAddress(true);
      })
      .catch((err) => {
        console.log("validateAddress failed");
      });
  };

  const handleCropped = (base64) => {
    setImages((prevImages) => [...prevImages, base64]);
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
      <TopBar
        ref={topRef}
        showBackIcon={hideCreateListingView}
        title={"New listing"}
      />
      <div
        className="w-full mt-[56px] relative overflow-y-auto bg-white"
        style={{ height: `${height}px` }}
      >
        <form
          onSubmit={handleCreateListing}
          className="flex flex-col gap-5 mt-4 mx-4"
        >
          {/* gallery */}
          <GallerySlider images={images} />
          {/* List title */}
          <InputField
            label={
              <>
                List title <span style={{ color: "red" }}>*</span>
              </>
            }
            type="text"
            value={listTitle}
            placeholder="e.g. House of fun :)"
            onChange={(e) => setListTitle(e.target.value)}
            autoComplete="list_title"
          />
          <EditField
            label={
              <>
                Description <span style={{ color: "red" }}>*</span>
              </>
            }
            placeholder="Short description"
            value={listDescription}
            onChange={(e) => setListDescription(e.target.value)}
          />
          {/* Address */}
          <div className="w-full relative">
            <EditField
              label={
                <>
                  Address <span style={{ color: "red" }}>*</span>
                </>
              }
              placeholder="Full address"
              value={listAddress}
              onChange={(e) => setListAddress(e.target.value)}
              onFocus={(e) => setValidateAddress(false)}
              rows={2}
              autoComplete="list_additional_notes"
            />

            {isLoading ? (
              <div className="w-5 h-5 text-green-600 absolute right-3 top-15 -translate-y-1/2">
                <MoonLoader
                  color={"#000000"}
                  loading={true}
                  cssOverride={override}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : validateAddress ? (
              <GrValidate className="w-5 h-5 text-green-600 absolute right-3 top-15 -translate-y-1/2" />
            ) : (
              <HiOutlineRefresh
                className="w-5 h-5 text-gray-600 absolute right-3 top-15 -translate-y-1/2 cursor-pointer"
                onClick={validateListingAddress}
              />
            )}
          </div>
          {/* Type of space */}
          <MultiSelectTag
            label={
              <>
                Type of space <span style={{ color: "red" }}>*</span>
              </>
            }
            value={storageType}
            onChange={(selected) => setStorageType(selected)}
            options={["Garage", "Attic", "Shed", "Room", "Basement", "Others"]}
          />
          {/* Size */}
          <InputField
            label={
              <>
                Size <span style={{ color: "red" }}>*</span>
              </>
            }
            type="text"
            value={listSize}
            placeholder="Size"
            onChange={(e) => setListSize(e.target.value)}
            autoComplete="list_size"
          />
          {/* Access details */}
          <SelectField
            label={
              <>
                Access details <span style={{ color: "red" }}>*</span>
              </>
            }
            value={accessDetails}
            onChange={(selected) => {
              setAccessDetails(selected.target.value);
            }}
            options={["not_set", "24_7", "weekdays_only", "weekends_only"]}
          />
          {/* Allowed Storage Type */}
          <MultiSelectTag
            label={
              <>
                Allowed storage type <span style={{ color: "red" }}>*</span>
              </>
            }
            value={allowedStorage}
            onChange={(selected) => setAllowedStorage(selected)}
            options={[
              "boxes",
              "bicycle",
              "car",
              "motorcycle",
              "furniture's",
              "others",
            ]}
          />
          {/* Price type */}
          <SelectField
            label={
              <>
                Price per <span style={{ color: "red" }}>*</span>
              </>
            }
            value={pricePer}
            onChange={(selected) => {
              setPricePer(selected.target.value);
            }}
            options={["not_set", "daily", "weekly", "monthly"]}
          />
          {/* Minimum storage period */}
          <SelectField
            label={
              <>
                Minimum storage period <span style={{ color: "red" }}>*</span>
              </>
            }
            value={minStoragePeriod}
            onChange={(selected) => {
              setMinStoragePeriod(selected.target.value);
            }}
            options={["not_set", "days", "1_week", "1_month"]}
          />
          {/* Availability */}
          <div className="w-full flex flex-col">
            <label className="text-base font-medium">
              Availability / Calendar Blocking{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <div className="w-full flex items-center gap-2 mt-1">
              <DatePickerField
                name="startDate"
                value={listingStartDate}
                onChange={(e) => setListingStartDate(e.target.value)}
                min="2023-01-01"
                max="2025-12-31"
                className="w-1/2"
              />

              <DatePickerField
                name="endDate"
                value={listingEndDate}
                onChange={(e) => setListingEndDate(e.target.value)}
                min="2023-01-01"
                max="2025-12-31"
                className="w-1/2"
              />
            </div>
          </div>
          {/* Additional notes */}
          <EditField
            label={"Additional notes"}
            placeholder="Open text"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            rows={2}
            autoComplete="list_additional_notes"
          />

          <PrimaryButton type="submit">Preview my listing</PrimaryButton>
        </form>
        <div className="w-full h-10 bg-white"></div>
      </div>

      {isCropView && (
        <ImageCropper
          shape={"rectangle"}
          aspect={417 / 198}
          closeModal={() => dispatch(showCropImageView())}
          onCropped={handleCropped}
        />
      )}
    </div>
  );
};

export default CreateListing;
