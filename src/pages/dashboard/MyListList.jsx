import React from "react";
import { ShortListing } from "../../components";

const MyListList = () => {
  return (
    <div className="w-full">
      <div className="w-full py-2 flex flex-col gap-4">
        <ShortListing />
        <ShortListing />
        <ShortListing />
        <ShortListing />
        <ShortListing />
      </div>
    </div>
  );
};

export default MyListList;
