import React, { useEffect, useState } from "react";
import { ShortListing } from "../../components";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";
import { useDispatch } from "react-redux";
import { showCreateListing } from "../../features/dashboard/dashboardSlice";

const MyListList = () => {
  const dispatch = useDispatch();
  const [tabBarTop, setTabBarTop] = useState(null);

  useEffect(() => {
    const updateTabBarTop = () => {
      const tabBar = document.querySelector(".tab-bar");
      if (tabBar) {
        const top = tabBar.getBoundingClientRect().top;
        setTabBarTop(top);
      }
    };

    updateTabBarTop();
    window.addEventListener("resize", updateTabBarTop);
    return () => window.removeEventListener("resize", updateTabBarTop);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-blue-500 relative">
      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto bg-white py-2 flex flex-col gap-4">
        <ShortListing />
        <ShortListing />
        <ShortListing />
      </div>

      {/* Fixed button — positioned just above the tab bar */}
      {tabBarTop !== null && (
        <div
          className="absolute w-full flex items-center justify-center py-1 px-2"
          style={{
            top: tabBarTop - 160, // adjust the offset to sit above tab bar
          }}
        >
          <PrimaryButton onClick={() => dispatch(showCreateListing())}>
            Create new listing
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default MyListList;
