import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components";
import { showSettingsView } from "../../features/dashboard/dashboardSlice";
import ToggleSwitch from "../../components/SharedComponents/ToggleSwitch";
import { getUserSettings, updateSettings } from "../../features/user/userSlice";

const SettingsView = ({ isVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [height, setHeight] = useState(0);
  const { profile } = useSelector((store) => store.user);

  const [receiveEmail, setReceiveEmail] = useState(false);
  const [receiveNotification, setReceiveNotification] = useState(false);
  const [userInteraction, setUserInteraction] = useState(false);

  const topRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (topRef.current) {
        const topBottom = topRef.current.getBoundingClientRect().bottom;
        let bottomTop = window.innerHeight;
        setHeight(bottomTop - topBottom);
      }
    };

    updateHeight(); // Call once on mount
  }, []);

  useEffect(() => {
    setReceiveEmail(profile?.settings?.receive_email);
    setReceiveNotification(profile?.settings?.receive_notification);
  }, [profile]);

  useEffect(() => {
    if (isVisible) {
      dispatch(getUserSettings());
    }
  }, [isVisible]);

  useEffect(() => {
    if (userInteraction) {
      setUserInteraction(false);

      dispatch(
        updateSettings({
          receive_email: receiveEmail.toString(),
          receive_notification: receiveNotification.toString(),
        })
      );

      // .unwrap()
      // .then(() => {
      //   // console.log("setting updated successful");
      // })
      // .catch((err) => {
      //   console.error("setting updated failed:", err);
      // });
    }
  }, [receiveEmail, receiveNotification]);

  const hideSettingsView = () => {
    dispatch(showSettingsView());
  };

  const handleEmailToggle = () => {
    setUserInteraction(true);
    setReceiveEmail(!receiveEmail);
  };
  const handleNotificationToggle = () => {
    setUserInteraction(true);
    setReceiveNotification(!receiveNotification);
  };

  return (
    <div
      className={`w-full h-full z-90 fixed top-0 right-0 transition-transform duration-500 flex flex-col bg-white ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "contain", // prevent pull-to-refresh
        touchAction: "none", // stop passive scroll
      }}
    >
      <TopBar ref={topRef} showBackIcon={hideSettingsView} title={"Settings"} />

      <div
        className="w-full mt-[56px] relative bg-white overflow-y-auto "
        style={{ height: `${height}px` }}
      >
        <div className="px-4 mt-8 space-y-4">
          <p className="font-bold text-xl">Communication</p>

          <div className="w-full flex items-center justify-between mt-10 border-b-1 border-gray-300 pb-4">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold">Receive email</p>
              <p className="text-gray-400">All my personal details</p>
            </div>

            <ToggleSwitch checked={receiveEmail} onChange={handleEmailToggle} />
          </div>

          <div className="w-full flex items-center justify-between mt-10 border-b-1 border-gray-300 pb-4">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold">Push notification</p>
              <p className="text-gray-400">All my personal details</p>
            </div>

            <ToggleSwitch
              checked={receiveNotification}
              onChange={handleNotificationToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
