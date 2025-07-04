import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setListing } from "../features/listing/listingSlice";
import {
  showCreateListing,
  showPreviewListing,
} from "../features/dashboard/dashboardSlice";

const ShortListing = ({ listing }) => {
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [viewActive, setViewActive] = useState(false);

  const { id, title, images, formatted_address } = listing;

  const getImageUrl = (imageUrl) => {
    const baseUrl = import.meta.env.VITE_AWS_S3_LISTING_BUCKET;
    return `${baseUrl}/${imageUrl}`;
  };

  useEffect(() => {
    if (editActive) {
      setTimeout(() => {
        setEditActive(false);
        dispatch(setListing(listing));
        dispatch(showCreateListing());
      }, 400);
    }
  }, [editActive]);

  useEffect(() => {
    if (viewActive) {
      setTimeout(() => {
        setViewActive(false);
        dispatch(showPreviewListing());
      }, 400);
    }
  }, [viewActive]);

  return (
    <div className="w-full border-1 border-gray-300 rounded-2xl">
      {/* image */}
      <div className="w-full h-[200px] bg-gray-200 rounded-t-2xl flex justify-center items-center">
        <img
          src={getImageUrl(images[0])}
          className="w-full h-full object-cover rounded-t-2xl"
        />
      </div>
      {/* description */}
      <div className="w-full h-[190px] flex flex-col justify-center items-center gap-2 px-2">
        {/* title / address */}
        <div className="w-full flex items-center justify-between">
          <p className="w-full text-2xl text-left">{title}</p>
          <div className="flex items-center gap-2">
            <FaRegEdit
              className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                editActive ? "text-violet-600" : "text-gray-600"
              }`}
              onClick={() => {
                setEditActive(!editActive);
              }}
            />
            <FaEye
              className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                viewActive ? "text-violet-600" : "text-gray-600"
              }`}
              onClick={() => {
                setViewActive(!viewActive);
                dispatch(setListing(listing));
              }}
            />
          </div>
        </div>

        <p className="w-full text-base">{formatted_address}</p>
        {/* price / period */}
        <div className="w-full flex items-center justify-between text-lg">
          {/* price */}
          <p className="font-bold">
            <span className=" text-violet-600">€45</span>{" "}
            <span className="text-sm">PM</span>
          </p>

          {/* period */}
          <div className="flex items-center">
            <p className="text-gray-400">
              H <span className="font-bold text-black">3</span>M W
              <span className="font-bold text-black">2</span> D
              <span className="font-bold text-black">2</span>
            </p>
          </div>
        </div>
        {/* online */}
        <div className="w-full flex items-center justify-between bg-gray-200 px-2 py-3 rounded-2xl ">
          <p>This list is online.</p>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? "bg-blue-600" : "bg-gray-300"}
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${enabled ? "translate-x-6" : "translate-x-1"}
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default ShortListing;
