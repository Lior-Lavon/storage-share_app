import React, { useEffect, useRef, useState } from "react";

const MyStorageList = () => {
  const wrapperRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(null);
  const [tabBarTop, setTabBarTop] = useState(null);

  useEffect(() => {
    const updateTabBarTop = () => {
      const tabBar = document.querySelector(".tab-bar");
      const wrapper = wrapperRef.current;

      if (tabBar && wrapper) {
        const tabBarTop = tabBar.getBoundingClientRect().top;

        const wrapperTop = wrapper.getBoundingClientRect().top;
        const availableHeight = tabBarTop - wrapperTop;
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
        {/* {myListings.length > 0 ? (
          myListings?.map((listing) => {
            return <ShortListing listing={listing} />;
          })
        ) : (*/}
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <p className="font-bold text-2xl">No storage</p>
          <p className="text-sm">You have no orders at the moment</p>
        </div>
        {/*)} */}
      </div>
    </div>
  );
};

export default MyStorageList;
