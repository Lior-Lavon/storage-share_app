import React, { useEffect, useRef, useState, CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GallerySlider,
  ImageCropper,
  PlacesAutocomplete,
  TopBar,
} from "../../components";
import {
  showCreateListing,
  showCropImageView,
  showPreviewListing,
} from "../../features/dashboard/dashboardSlice";
import { GrValidate } from "react-icons/gr";
import { HiOutlineRefresh } from "react-icons/hi";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";
import InputField from "../../components/SharedComponents/InputField";
import EditField from "../../components/SharedComponents/EditField";
import MultiSelectTag from "../../components/SharedComponents/MultiSelectTag";
import SelectField from "../../components/SharedComponents/SelectField";
import DatePickerField from "../../components/SharedComponents/DatePickerField";
import { setListing } from "../../features/listing/listingSlice";
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
  const placeRef = useRef();
  const galleryRef = useRef();
  const [height, setHeight] = useState(0);
  const [changePasswordError, setChangePasswordError] = useState(null);
  const { isLoading } = useSelector((store) => store.listing);
  const { isCropView } = useSelector((store) => store.dashboard);
  const { profile } = useSelector((store) => store.user);

  const [images, setImages] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");
  const [mapCoordinate, setMapCoordinate] = useState(null);

  const [storageType, setStorageType] = useState([]);
  const [allowedStorage, setAllowedStorage] = useState([]);
  const [listSize, setListSize] = useState("");
  const [accessDetails, setAccessDetails] = useState("not_set");
  const [pricePer, setPricePer] = useState("not_set");
  const [minStoragePeriod, setMinStoragePeriod] = useState("not_set");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [listingStartDate, setListingStartDate] = useState("");
  const [listingEndDate, setListingEndDate] = useState("");
  const [, forceUpdate] = useState(0);

  const refresh = () => forceUpdate((n) => n + 1);

  const [formValidation, setFormValidation] = useState({
    address: false,
    title: false,
    description: false,
    storageType: false,
    size: false,
    accessDetails: false,
    allowedStorageType: false,
    pricePer: false,
    minimumStoragePeriod: false,
    availability: false,
  });

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

  useEffect(() => {
    if (isVisible) {
      setImages([]);
      handleGalleryReset();
      setListTitle("");
      setListDescription("");
      setFormattedAddress("");
      setMapCoordinate(null);
      handleAutocompleteClear();

      setStorageType([]);
      setAllowedStorage([]);
      setListSize("");
      setAccessDetails("not_set");
      setPricePer("not_set");
      setMinStoragePeriod("not_set");
      setAdditionalNotes("");
      setListingStartDate("");
      setListingEndDate("");

      refresh();

      console.log("CreateListing is now visible");
    } else {
      console.log("CreateListing is now hidden");
    }
  }, [isVisible]);

  const hideCreateListingView = () => {
    setChangePasswordError(null);
    dispatch(showCreateListing());
  };

  const handleCropped = (base64) => {
    setImages((prevImages) => [
      ...prevImages,
      {
        filename: "image.jpg",
        image: base64,
      },
    ]);
  };

  const validation = () => {
    const obj = { ...formValidation };
    if (formattedAddress == "" || mapCoordinate == null) {
      obj.address = true;
    }
    if (listTitle == "") {
      obj.title = true;
    }
    if (listDescription == "") {
      obj.description = true;
    }
    if (storageType.length == 0) {
      obj.storageType = true;
    }
    if (listSize == "") {
      obj.size = true;
    }
    if (accessDetails == "not_set") {
      obj.accessDetails = true;
    }
    if (allowedStorage.length == 0) {
      obj.allowedStorageType = true;
    }
    if (pricePer == "not_set") {
      obj.pricePer = true;
    }
    if (minStoragePeriod == "not_set") {
      obj.minimumStoragePeriod = true;
    }
    if (listingStartDate == "" || listingEndDate == "") {
      obj.availability = true;
    }

    setFormValidation(obj);

    const hasAnyError = Object.values(obj).some((value) => value === true);
    if (hasAnyError) {
      return false;
    }
    return true;
  };

  const clearError = (key) => {
    const obj = { ...formValidation };
    obj[key] = false;
    setFormValidation(obj);
  };

  const handleAutocompleteClear = () => {
    placeRef.current?.clear();
  };

  const handleGalleryReset = () => {
    if (galleryRef.current) {
      galleryRef.current.reset(); // Clear the image
    }
  };

  const handlePreviewListing = () => {
    if (!validation()) return;

    dispatch(
      setListing({
        userId: profile.id,
        address: formattedAddress,
        coordinate: mapCoordinate,
        images: images,
        title: listTitle,
        description: listDescription,
        storageType: storageType,
        size: listSize,
        accessDetails: accessDetails,
        allowedStorage: allowedStorage,
        pricePer: pricePer,
        minStoragePeriod: minStoragePeriod,
        startDate: listingStartDate,
        endDate: listingEndDate,
        additionalNotes: additionalNotes,
      })
    );
    dispatch(showPreviewListing());
  };

  return (
    <div
      className={`w-full h-full z-100 fixed top-0 right-0 transition-transform duration-500 flex flex-col bg-gray-100 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "contain", // prevent pull-to-refresh
        touchAction: "none", // stop passive scroll
      }}
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
        <div className="flex flex-col gap-5 mt-4 mx-4">
          <div className="w-full relative flex flex-col gap-2">
            {/* auto complete address */}
            <p className="font-bold text-lg">Create New Listing</p>
            {mapCoordinate == null && (
              <p className="text-sm">fill in your listing address</p>
            )}

            <PlacesAutocomplete
              label={
                <>
                  Address. <span style={{ color: "red" }}>*</span>
                </>
              }
              ref={placeRef}
              setFormattedAddress={setFormattedAddress}
              setCoordinate={setMapCoordinate}
              onFocus={() => {
                setFormattedAddress("");
                setMapCoordinate(null);
              }}
              error={formValidation.address}
              initialAddress={formattedAddress}
            />
            {mapCoordinate != null && (
              <GrValidate className="w-5 h-5 text-green-600 absolute right-2 top-[48px] -translate-y-1/2" />
            )}
          </div>

          <div
            className={`${
              mapCoordinate != null ? "flex flex-col gap-5" : "hidden"
            }`}
          >
            {/* gallery */}
            <GallerySlider
              label={
                <>
                  Images <span style={{ color: "red" }}>*</span>
                </>
              }
              ref={galleryRef}
              images={images}
              isPreview={false}
              disabled={formattedAddress == ""}
            />
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
              error={formValidation.title}
              disabled={formattedAddress == ""}
              onFocus={() => clearError("title")}
            />
            {/* description */}
            <EditField
              label={
                <>
                  Description <span style={{ color: "red" }}>*</span>
                </>
              }
              placeholder="Short description"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
              error={formValidation.description}
              disabled={formattedAddress == ""}
              onFocus={() => clearError("description")}
            />
            {/* Type of space */}
            <MultiSelectTag
              label={
                <>
                  Type of space <span style={{ color: "red" }}>*</span>
                </>
              }
              value={storageType}
              onChange={(selected) => {
                clearError("storageType");
                setStorageType(selected);
              }}
              options={[
                "garage",
                "attic",
                "shed",
                "room",
                "basement",
                "others",
              ]}
              error={formValidation.storageType}
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
              error={formValidation.size}
              disabled={formattedAddress == ""}
              onFocus={() => clearError("size")}
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
                clearError("accessDetails");
                setAccessDetails(selected.target.value);
              }}
              options={["not_set", "24_7", "weekdays_only", "weekends_only"]}
              error={formValidation.accessDetails}
              disabled={formattedAddress == ""}
            />
            {/* Allowed Storage Type */}
            <MultiSelectTag
              label={
                <>
                  Allowed storage type <span style={{ color: "red" }}>*</span>
                </>
              }
              value={allowedStorage}
              onChange={(selected) => {
                clearError("allowedStorageType");
                setAllowedStorage(selected);
              }}
              options={[
                "boxes",
                "bicycle",
                "car",
                "motorcycle",
                "furniture",
                "others",
              ]}
              error={formValidation.allowedStorageType}
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
                clearError("pricePer");
                setPricePer(selected.target.value);
              }}
              options={["not_set", "daily", "weekly", "monthly"]}
              error={formValidation.pricePer}
              disabled={formattedAddress == ""}
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
                clearError("minimumStoragePeriod");
                setMinStoragePeriod(selected.target.value);
              }}
              options={[
                "not_set",
                "days",
                "1_week",
                "2_weeks",
                "4_weeks",
                "8_weeks",
              ]}
              error={formValidation.minimumStoragePeriod}
              disabled={formattedAddress == ""}
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
                  onChange={(e) => {
                    clearError("availability");
                    setListingStartDate(e.target.value);
                  }}
                  min="2023-01-01"
                  max="2025-12-31"
                  className="w-1/2"
                  error={formValidation.availability}
                  disabled={formattedAddress == ""}
                />

                <DatePickerField
                  name="endDate"
                  value={listingEndDate}
                  onChange={(e) => {
                    clearError("availability");
                    setListingEndDate(e.target.value);
                  }}
                  min="2023-01-01"
                  max="2025-12-31"
                  className="w-1/2"
                  error={formValidation.availability}
                  disabled={formattedAddress == ""}
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
              error={formValidation.additionalNotes}
              disabled={formattedAddress == ""}
            />
            <PrimaryButton
              type="submit"
              onClick={handlePreviewListing}
              disabled={formattedAddress == "" || mapCoordinate == null}
            >
              Preview listing
            </PrimaryButton>
            {/*  */}
          </div>
        </div>
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
