import React from "react";
import { ShortListing } from "../../components";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";
import { useDispatch } from "react-redux";
import { showCreateListing } from "../../features/dashboard/dashboardSlice";
import useViewportHeight from "../../utils/useViewportHeight";

const MyListList = () => {
  const dispatch = useDispatch();
  const viewHeight = useViewportHeight() - 176;

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Scrollable list */}
      <div
        className="overflow-y-auto bg-blue-500 py-2 flex flex-col gap-4"
        style={{ height: `${viewHeight}px` }}
      >
        <ShortListing />
        <ShortListing />
        <ShortListing />
        <ShortListing />
      </div>

      {/* Fixed button at the bottom */}
      <div className="bg-white flex items-center justify-center">
        <div className="w-full py-1">
          <PrimaryButton onClick={() => dispatch(showCreateListing())}>
            Create new listing
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default MyListList;
