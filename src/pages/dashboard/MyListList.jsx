import React from "react";
import { ShortListing } from "../../components";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";
import { useDispatch } from "react-redux";
import { showCreateListing } from "../../features/dashboard/dashboardSlice";

const MyListList = () => {
  const dispatch = useDispatch();
  console.log("MyListList");

  return (
    <div className="w-full h-screen flex flex-col bg-blue-500 relative">
      {/* Scrollable list */}
      {/* <div className="h-[645px] overflow-y-auto bg-white py-2 flex flex-col gap-4">
        <ShortListing />
        <ShortListing />
        <ShortListing />
      </div> */}

      {/* Fixed button */}
      <div className="absolute bottom-44 w-full bg-red-500 flex items-center justify-center py-1">
        <PrimaryButton onClick={() => dispatch(showCreateListing())}>
          Create new listing
        </PrimaryButton>
      </div>
    </div>
  );
};

export default MyListList;
