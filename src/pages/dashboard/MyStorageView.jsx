import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useViewportHeight from "../../utils/useViewportHeight";
import { TypeSwitch } from "../../components";
import MyStorageList from "./MyStorageList";
import MyListList from "./MyListList";
import CreateListing from "./CreateListing";
import { getMyListings } from "../../features/listing/listingSlice";

const MyStorageView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("listing");
  const { profile } = useSelector((store) => store.user);

  // Optional: set it when mounted
  useEffect(() => {
    dispatch(getMyListings(profile?.id));
  }, []);

  const handleTypeChange = (newType) => {
    setViewType(newType);
  };

  return (
    // <div className="w-full h-[calc(100vh-120px)] flex flex-col items-center overflow-y-hidden bg-red-500">
    <div
      id="my-storage-view-root"
      className="w-full mt-14 flex flex-col flex-1 items-center overflow-hidden bg-white"
    >
      <div className="w-[95%] mx-auto my-2">
        <TypeSwitch initialType="listing" onSwitch={handleTypeChange} />
      </div>

      <div className="w-[95%] flex-1 overflow-hidden bg-white">
        {viewType === "storage" ? <MyStorageList /> : <MyListList />}
      </div>
    </div>
  );
};

export default MyStorageView;
