import React, { useState } from "react";
import { Switch } from "@headlessui/react";

const ShortListing = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="w-full border-1 border-gray-300 rounded-2xl">
      {/* image */}
      <div className="w-full h-[220px] bg-gray-200 rounded-t-2xl flex justify-center items-center">
        <p>Image</p>
      </div>
      {/* description */}
      <div className="w-full h-[190px] flex flex-col justify-center items-center gap-2 px-2">
        {/* title / address */}
        <p className="w-full text-2xl text-left">Full list title</p>
        <p className="w-full text-base">Boogschutter 12, Amstelveen</p>
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
