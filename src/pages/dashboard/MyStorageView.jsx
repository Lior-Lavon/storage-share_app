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
  const topRef = useRef(null);
  const [viewType, setViewType] = useState("listing");

  const viewHeight = useViewportHeight() - 120;

  const { profile } = useSelector((store) => store.user);
  const { isCreateListing } = useSelector((store) => store.dashboard);

  const handleTypeChange = (newType) => {
    setViewType(newType);
    console.log(newType);
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center space-y-1 bg-white "
      style={{ height: viewHeight }}
    >
      <div className="w-[95%] mx-auto my-2">
        <TypeSwitch initialType="listing" onSwitch={handleTypeChange} />
      </div>

      <div className="w-[95%] flex-grow overflow-y-auto max-h-[100vh]">
        {viewType == "storage" ? <MyStorageList /> : <MyListList />}
      </div>

      {/* CreateListing */}
      <CreateListing isVisible={isCreateListing} />
    </div>
  );
};

export default MyStorageView;
