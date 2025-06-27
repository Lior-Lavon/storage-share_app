import React from "react";
import { ShortListing } from "../../components";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";
import { useDispatch } from "react-redux";
import { showCreateListing } from "../../features/dashboard/dashboardSlice";

const MyListList = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      {/* Scrollable list */}
      {/* <div className="h-[645px] overflow-y-auto bg-red-500 py-2 flex flex-col gap-4">
        <ShortListing />
        <ShortListing />
        <ShortListing />
        <ShortListing />
        <ShortListing />
        <ShortListing />
      </div> */}

      {/* Fixed button */}
      <div className="absolute bottom-0 w-full bg-white flex items-center justify-center py-1">
        <PrimaryButton onClick={() => dispatch(showCreateListing())}>
          Create new listing
        </PrimaryButton>
      </div>
    </div>
  );
};

export default MyListList;
