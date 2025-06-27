import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useViewportHeight from "../../utils/useViewportHeight";
import { TypeSwitch } from "../../components";
import MyStorageList from "./MyStorageList";
import MyListList from "./MyListList";
import CreateListing from "./CreateListing";

const MyStorageView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("listing");

  const { profile } = useSelector((store) => store.user);

  const handleTypeChange = (newType) => {
    setViewType(newType);
  };

  return (
    // <div className="w-full h-[calc(100vh-120px)] flex flex-col items-center overflow-y-hidden bg-red-500">
    <div className="w-full pt-14 flex flex-col flex-1 items-center overflow-hidden bg-white">
      <div className="w-[95%] mx-auto my-2">
        <TypeSwitch initialType="listing" onSwitch={handleTypeChange} />
      </div>

      <div className="w-[95%] flex-1 overflow-hidden bg-red-500">
        {viewType === "storage" ? <MyStorageList /> : <MyListList />}
      </div>
    </div>
  );
};

export default MyStorageView;
