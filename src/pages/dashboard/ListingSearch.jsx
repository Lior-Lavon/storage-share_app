import React, { useEffect, useRef, useState } from "react";
import InputField from "../../components/SharedComponents/InputField";
import { CiSearch } from "react-icons/ci";
import { MapView } from "../../components";
import MultiSelectTag from "../../components/SharedComponents/MultiSelectTag";
import SelectField from "../../components/SharedComponents/SelectField";
import DatePickerField from "../../components/SharedComponents/DatePickerField";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";

const ListingSearch = () => {
  const [address, setAddress] = useState("");
  const [viewHeight, setViewHeight] = useState();
  const filterRef = useRef(null);

  const [storageType, setStorageType] = useState([]);
  const [listingStartDate, setListingStartDate] = useState("");
  const [listingEndDate, setListingEndDate] = useState("");
  const [minimumSize, setMinimumSize] = useState("");
  const [maximumSize, setMaximumSize] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");

  useEffect(() => {
    const updateTabBarTop = () => {
      const tabBar = document.querySelector(".tab-bar");
      const filterView = filterRef.current;
      if (tabBar && filterView) {
        const tabBarTop = tabBar.getBoundingClientRect().top;

        const filterTop = filterView.getBoundingClientRect().top; // 👈 This is what you want
        const availableHeight = tabBarTop - filterTop;

        setViewHeight(availableHeight);
      }
    };

    setTimeout(() => {
      updateTabBarTop();
    }, 1);

    window.addEventListener("resize", updateTabBarTop);
    return () => window.removeEventListener("resize", updateTabBarTop);
  }, []);

  const searchAddress = () => {
    console.log("searchAddress");
  };
  const viewResults = () => {
    console.log("viewResults");
  };
  return (
    <div className="w-full h-full mt-[112px] relative">
      <div className="w-full px-4 py-2 bg-white relative">
        <InputField
          label=""
          type="text"
          value={address}
          placeholder="Search where you want to store"
          onChange={(e) => setAddress(e.target.value)}
          autoComplete="search_address_field"
        />
        <div className="absolute right-8 top-1/2 -translate-y-[30%] text-gray-500">
          <CiSearch className="w-5 h-5" onClick={searchAddress} />
        </div>
      </div>

      <div
        ref={filterRef}
        className="w-full bg-white overflow-y-auto overflow-visible"
        style={{ height: viewHeight }}
      >
        <div className="vertical-scroll mt-2 space-y-4">
          <MapView
            className="w-full"
            additionalClass={"h-40"}
            showControls={false}
          />

          <div className="flex flex-col mx-4 space-y-4 ">
            <div className="w-full ">
              <label className="text-sm font-medium">Size</label>
              <div className="w-full flex items-center justify-between gap-2">
                <InputField
                  name="minimumSize"
                  value={minimumSize}
                  placeholder={"From:"}
                  onChange={(e) => {
                    setMinimumSize(e.target.value);
                  }}
                  className="w-full"
                />

                <InputField
                  name="maxSize"
                  value={maximumSize}
                  placeholder={"To:"}
                  onChange={(e) => {
                    setMaximumSize(e.target.value);
                  }}
                  className="w-full"
                />
              </div>
            </div>

            {/* Type of space */}
            <div className="w-full ">
              <label className="text-sm font-medium">Type</label>
              <MultiSelectTag
                chipFontSize="text-sm"
                value={storageType}
                onChange={(selected) => {
                  // clearError("storageType");
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
                // error={formValidation.storageType}
              />
            </div>

            {/* Availability */}
            <div className="w-full flex flex-col">
              <label className="text-sm font-medium">Availability</label>
              <div className="w-full flex items-center gap-2 mt-1">
                <DatePickerField
                  name="startDate"
                  value={listingStartDate}
                  onChange={(e) => {
                    // clearError("availability");
                    setListingStartDate(e.target.value);
                  }}
                  min="2023-01-01"
                  max="2025-12-31"
                  className="w-1/2"
                />

                <DatePickerField
                  name="endDate"
                  value={listingEndDate}
                  onChange={(e) => {
                    // clearError("availability");
                    setListingEndDate(e.target.value);
                  }}
                  min="2023-01-01"
                  max="2025-12-31"
                  className="w-1/2"
                />
              </div>
            </div>

            {/* Price range */}
            <div className="w-full ">
              <label className="text-sm font-medium">Price range</label>
              <div className="w-full flex items-center justify-between gap-2">
                <InputField
                  name="minimumPrice"
                  value={minimumPrice}
                  placeholder={"From:"}
                  onChange={(e) => {
                    setMinimumPrice(e.target.value);
                  }}
                  className="w-full"
                />

                <InputField
                  name="maxPrice"
                  value={maximumPrice}
                  placeholder={"To:"}
                  onChange={(e) => {
                    setMaximumPrice(e.target.value);
                  }}
                  className="w-full"
                />
              </div>
            </div>

            <div className="pt-4">
              <PrimaryButton onClick={viewResults}>View results</PrimaryButton>
            </div>
          </div>

          {/* spacing  */}
          <div className="w-full h-10"></div>
        </div>
      </div>
    </div>
  );
};

export default ListingSearch;
