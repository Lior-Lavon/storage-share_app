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
import {
  clearListing,
  deleteListingImage,
  setListing,
  updateListing,
  updateListingImage,
} from "../../features/listing/listingSlice";
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
  const { isLoading, listing } = useSelector((store) => store.listing);
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
    console.log("CreateListing : ", listing);

    setDefaultValues();
  }, [listing]);

  const setDefaultValues = () => {
    console.log("listing : ", listing);
    galleryRef?.current?.reset(); // Clear the image
    setImages([]);

    setFormattedAddress(listing?.formatted_address || "");
    if (listing?.formatted_address == undefined) placeRef.current?.clear();

    setMapCoordinate(listing?.coordinate || null);

    // append the S3 bucket
    if (listing?.formatted_address == undefined) {
      if (galleryRef.current) {
        galleryRef?.current?.reset(); // Clear the image
      }
    } else {
      const baseUrl = import.meta.env.VITE_AWS_S3_LISTING_BUCKET;
      setImages(
        listing?.images.map((img) => ({
          image: `${baseUrl}/${img}`,
        }))
      );
    }

    setListTitle(listing?.title || "");
    setListDescription(listing?.description || "");
    setStorageType(listing?.storage_type || []);
    setAllowedStorage(listing?.allowed_storage || []);
    setListSize(listing?.storage_size || "");
    setAccessDetails(listing?.storage_access || "not_set");
    setPricePer(listing?.price_per || "not_set");
    setMinStoragePeriod(listing?.min_period || "not_set");
    setListingStartDate(listing?.availability_from || "");
    setListingEndDate(listing?.availability_to || "");
    setAdditionalNotes(listing?.additional_note || "");
  };

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
      console.log("CreateListing is now visible");
      setDefaultValues();
    } else {
      console.log("CreateListing is now hidden");
      galleryRef?.current?.reset(); // Clear the image
      dispatch(clearListing());
    }
  }, [isVisible]);

  const hideCreateListingView = () => {
    setChangePasswordError(null);
    dispatch(showCreateListing());
  };

  const handleCropped = (base64) => {
    if (listing?.id == undefined) {
      // on create
      setImages((prevImages) => [
        ...prevImages,
        {
          filename: "image.jpg",
          image: base64,
        },
      ]);
    } else {
      // on edit
      dispatch(
        updateListingImage({
          listing_id: listing?.id,
          image: {
            filename: "image.jpg",
            image: base64.substring("data:image/jpeg;base64,".length),
          },
        })
      );
    }
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

  const handlePreviewListing = () => {
    if (!validation()) return;

    console.log("handlePreviewListing mapCoordinate : ", mapCoordinate);
    dispatch(
      setListing({
        user_id: profile.id,
        formatted_address: formattedAddress,
        coordinate: mapCoordinate,
        images: images,
        title: listTitle,
        description: listDescription,
        storage_type: storageType,
        storage_size: listSize,
        storage_access: accessDetails,
        allowed_storage: allowedStorage,
        price_per: pricePer,
        min_period: minStoragePeriod,
        availability_from: listingStartDate,
        availability_to: listingEndDate,
        additional_note: additionalNotes,
      })
    );
    dispatch(showPreviewListing());
  };

  const handleUpdateListing = () => {
    if (!validation()) return;

    dispatch(
      updateListing({
        id: listing.id,
        title: listTitle,
        description: listDescription,
        formatted_address: formattedAddress,
        coordinate: mapCoordinate,
        storage_type: storageType,
        storage_size: listSize,
        storage_access: accessDetails,
        // price: "bb",
        price_per: pricePer,
        // currency: "USD",
        min_period: minStoragePeriod,
        availability_from: listingStartDate,
        availability_to: listingEndDate,
        additional_note: additionalNotes,
        allowed_storage: allowedStorage,
        status: "in_review",
        images: images,
      })
    );
    // .unwrap()
    // .then(() => {
    //   console.log("updateListing - succesfully");
    // })
    // .catch((err) => {
    //   console.log("updateListing - failed");
    // });
  };

  const handleDeleteImage = (imageUrl) => {
    if (listing?.id != undefined) {
      const baseUrl = import.meta.env.VITE_AWS_S3_LISTING_BUCKET;
      dispatch(
        deleteListingImage({
          listing_id: listing?.id,
          image_url: imageUrl?.replace(baseUrl + "/", ""),
        })
      );
    }
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
      {/* Top Bar (static height) */}
      <TopBar
        ref={topRef}
        showBackIcon={hideCreateListingView}
        title={listing?.id == undefined ? "New listing" : "Edit listing"}
      />

      {/* Scrollable content that fills the space */}
      <div className="flex-1 mt-[56px] overflow-y-auto bg-white">
        <div className="flex flex-col gap-5 mt-4 mx-4">
          <div className="w-full relative flex flex-col gap-2">
            {mapCoordinate == null && (
              <p className="text-sm">fill in your listing address</p>
            )}
            {/* auto complete address */}

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
              deleteImage={handleDeleteImage}
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
          </div>
        </div>

        <div className="w-full h-10 bg-white"></div>
      </div>

      {/* Bottom button */}
      <div className="w-full px-4 py-2 bg-white">
        {listing?.id == undefined ? (
          <PrimaryButton
            type="submit"
            onClick={handlePreviewListing}
            disabled={formattedAddress == "" || mapCoordinate == null}
          >
            Preview listing
          </PrimaryButton>
        ) : (
          <PrimaryButton
            type="submit"
            onClick={handleUpdateListing}
            disabled={formattedAddress == "" || mapCoordinate == null}
          >
            Update listing
          </PrimaryButton>
        )}
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
