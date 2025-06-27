import React, { useEffect, useRef, useState } from "react";

import {
  HomeView,
  MyStorageView,
  ActivityView,
  ChatView,
  CreateListing,
} from "../index";

import { TabBar, TopBar } from "../../components";
import ProfileView from "./ProfileView";
import { useDispatch, useSelector } from "react-redux";
import { showProfile } from "../../features/dashboard/dashboardSlice";
import PreviewListing from "./PreviewListing";

function renderTabContent(activeTab) {
  switch (activeTab) {
    case "home":
      return <HomeView />;
    case "my_storage":
      return <MyStorageView />;
    case "activity":
      return <ActivityView />;
    case "chat":
      return <ChatView />;
    default:
      return <div>Unknown Tab</div>;
  }
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [activeTab, setActiveTab] = useState("home");
  const [viewHeight, setViewHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (topRef.current && bottomRef.current) {
        const topBottom = topRef.current.getBoundingClientRect().bottom;
        const bottomTop = bottomRef.current.getBoundingClientRect().top;

        const availableHeight = bottomTop - topBottom;
        console.log("availableHeight : ", availableHeight);

        setViewHeight(availableHeight);
      }
    };

    // Initial run
    updateHeight();

    // Recalculate on window resize
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { isProfile, isCreateListing, isPreviewListing } = useSelector(
    (store) => store.dashboard
  );

  const handleShowProfile = () => {
    dispatch(showProfile());
  };

  return (
    <div className="w-full items-center">
      <div
        className="flex flex-col h-screen w-full bg-red-500 overflow-y-hidden"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain", // prevent pull-to-refresh
          touchAction: "none", // stop passive scroll
        }}
      >
        {/* TopBar */}
        <TopBar
          ref={topRef}
          showProfile={handleShowProfile}
          title="StorageShare"
        />
        {/* Main content */}
        <div
          className="scroll-content mt-14 bg-amber-300"
          style={{ height: viewHeight }}
        >
          <div className="">{renderTabContent(activeTab)}</div>
        </div>
        {/* Bottom TabBar */}
        <TabBar
          ref={bottomRef}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <ProfileView isVisible={isProfile} />
      <CreateListing isVisible={isCreateListing} />
      <PreviewListing isVisible={isPreviewListing} />
    </div>
  );
};

export default Dashboard;
