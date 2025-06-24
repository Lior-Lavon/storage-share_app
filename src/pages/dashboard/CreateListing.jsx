import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components";
import { showCreateListing } from "../../features/dashboard/dashboardSlice";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";
import InputField from "../../components/SharedComponents/InputField";
import EditField from "../../components/SharedComponents/EditField";
import MultiSelectTag from "../../components/SharedComponents/MultiSelectTag";

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

          <PrimaryButton type="submit">Preview my listing</PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
