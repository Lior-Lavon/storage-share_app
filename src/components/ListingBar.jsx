import React from "react";

const ListingBar = ({ chat }) => {
  const listingBaseUrl = import.meta.env.VITE_AWS_S3_LISTING_BUCKET;

  const listing_image = chat?.listing_image;
  const listing_title = chat?.listing_title;
  const formatted_address = chat?.formatted_address;

  return (
    <div className="w-[90%] mx-auto flex items-center p-3 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow max-w-md">
      {/* Image placeholder */}
      <div className="w-[7rem] h-[4rem] bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-600">
        {listing_image == "" ? (
          <p>Image</p>
        ) : (
          <img
            className="w-full h-full object-cover rounded-md"
            src={`${listingBaseUrl}/${listing_image}`}
          />
        )}
      </div>

      {/* Text content */}
      <div className="ml-4">
        <h3 className="font-semibold text-base text-gray-900">
          {listing_title}
        </h3>
        <p className="text-sm text-gray-700">{formatted_address}</p>
      </div>
    </div>
  );
};

export default ListingBar;
