import React from "react";
import { ShortListing } from "../../components";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";

const MyListList = () => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-4">
        <ShortListing />
        <ShortListing />
        <ShortListing />
        <ShortListing />
        <ShortListing />
      </div>

      {/* Fixed button at the bottom */}
      <div className="bg-white flex items-center justify-center">
        <div className="w-full py-1">
          <PrimaryButton onClick={() => inputRef.current.click()}>
            Create new listing
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default MyListList;
