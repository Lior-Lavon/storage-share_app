import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GallerySlider, TopBar } from "../../components";
import { showCreateListing } from "../../features/dashboard/dashboardSlice";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";
import InputField from "../../components/SharedComponents/InputField";
import EditField from "../../components/SharedComponents/EditField";
import MultiSelectTag from "../../components/SharedComponents/MultiSelectTag";
import SelectField from "../../components/SharedComponents/SelectField";
import DatePickerField from "../../components/SharedComponents/DatePickerField";

const CreateListing = ({ isVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [changePasswordError, setChangePasswordError] = useState(null);
  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [listAddress, setListAddress] = useState("");
  const [listSize, setListSize] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [listingStartDate, setListingStartDate] = useState("");
  const [listingEndDate, setListingEndDate] = useState("");

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

  return (
    <div
      className={`w-full h-full z-900 fixed top-0 right-0 transition-transform duration-500 flex flex-col bg-white ${
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
        className="w-full mt-[56px] relative bg-white overflow-y-auto "
        style={{ height: `${height}px` }}
      >
        <form
          onSubmit={handleCreateListing}
          className="flex flex-col gap-5 mt-4 mx-4"
        >
          {/* gallery */}
          <GallerySlider />

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
          <InputField
            label={
              <>
                Address <span style={{ color: "red" }}>*</span>
              </>
            }
            type="text"
            value={listAddress}
            placeholder="Full address"
            onChange={(e) => setListAddress(e.target.value)}
            autoComplete="list_address"
          />

          {/* Type of space */}
          <MultiSelectTag
            label={
              <>
                Type of space <span style={{ color: "red" }}>*</span>
              </>
            }
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
            value={""}
            onChange={(item) => {
              console.log(item);
            }}
            options={["24/7", "weekdays only", "weekends only", "ect..."]}
          />

          {/* Allowed Storage Type */}
          <MultiSelectTag
            label={
              <>
                Allowed storage type <span style={{ color: "red" }}>*</span>
              </>
            }
            options={[
              "Boxes",
              "Bicycle",
              "Car",
              "Motorcycle",
              "Furniture's",
              "Others",
            ]}
          />

          {/* Price type */}
          <SelectField
            label={
              <>
                Price per <span style={{ color: "red" }}>*</span>
              </>
            }
            value={""}
            onChange={(item) => {
              console.log(item);
            }}
            options={["Daily", "Weekly", "Monthly"]}
          />

          {/* Minimum storage types */}
          <SelectField
            label={
              <>
                Minimum storage types <span style={{ color: "red" }}>*</span>
              </>
            }
            value={""}
            onChange={(item) => {
              console.log(item);
            }}
            options={["days", "1 week", "1 month"]}
          />

          {/* Availability */}
          <div className="w-full flex flex-col">
            <label className="text-base font-medium">
              Availability / Calendar Blocking{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <div className="w-full flex items-center gap-4 mt-1">
              <DatePickerField
                name="startDate"
                value={listingStartDate}
                onChange={(e) => setListingStartDate(e.target.value)}
                min="2023-01-01"
                max="2025-12-31"
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
        <div className="w-full h-10"></div>
      </div>
    </div>
  );
};

export default CreateListing;
