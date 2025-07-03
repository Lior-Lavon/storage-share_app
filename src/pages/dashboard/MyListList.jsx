import React, { useEffect, useRef, useState } from "react";
import { ShortListing } from "../../components";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { showCreateListing } from "../../features/dashboard/dashboardSlice";
import { clearListing } from "../../features/listing/listingSlice";

const MyListList = () => {
  const dispatch = useDispatch();
  const [contentHeight, setContentHeight] = useState(null);
  const [tabBarTop, setTabBarTop] = useState(null);
  const { myListings } = useSelector((store) => store.listing);
  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    console.log("MyListList : myListings : ", myListings);
  }, [myListings]);

  useEffect(() => {
    const updateTabBarTop = () => {
      const tabBar = document.querySelector(".tab-bar");
      const button = buttonRef.current;
      const wrapper = wrapperRef.current;

      if (tabBar && button && wrapper) {
        const tabBarTop = tabBar.getBoundingClientRect().top;
        const buttonHeight = button.offsetHeight;

        const wrapperTop = wrapper.getBoundingClientRect().top; // 👈 This is what you want
        const availableHeight = tabBarTop - buttonHeight - wrapperTop;

        setContentHeight(availableHeight);
        setTabBarTop(tabBarTop);
      }
    };

    setTimeout(() => {
      updateTabBarTop();
    }, 1);

    window.addEventListener("resize", updateTabBarTop);
    return () => window.removeEventListener("resize", updateTabBarTop);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-screen flex flex-col bg-white relative"
    >
      {/* Scrollable list */}
      <div
        className="content-area overflow-y-auto bg-white py-2 flex flex-col gap-4"
        style={{
          height: contentHeight ? `${contentHeight}px` : "auto",
        }}
      >
        {myListings?.length > 0 ? (
          myListings?.map((listing, index) => {
            return <ShortListing key={index} listing={listing} />;
          })
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <p className="font-bold text-2xl">No listing</p>
            <p className="text-sm">You have no listing at the moment</p>
          </div>
        )}
      </div>

      {/* Fixed button — positioned just above the tab bar */}
      {/* {tabBarTop !== null && ( */}
      <div
        ref={buttonRef}
        className="absolute w-full flex items-center justify-center py-1 px-2"
        style={{
          top: tabBarTop - 160, // adjust the offset to sit above tab bar
        }}
      >
        <PrimaryButton
          onClick={() => {
            dispatch(clearListing());
            dispatch(showCreateListing());
          }}
        >
          Create new listing
        </PrimaryButton>
      </div>
      {/* )} */}
    </div>
  );
};

export default MyListList;
