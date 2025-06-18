import React, { useEffect, useRef, useState } from "react";

import { TopBar, UserAvatar } from "../../components";
import { showMyProfile } from "../../features/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";
import InputField from "../../components/SharedComponents/InputField";
import EditField from "../../components/SharedComponents/EditField";
import SelectField from "../../components/SharedComponents/SelectField";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";

const MyProfileView = ({ isVisible }) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    value: "nl",
    label: "Netherlands",
  });
  const [changePassword, setChangePassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (topRef.current) {
        const topBottom = topRef.current.getBoundingClientRect().bottom;
        const bottomTop = bottomRef.current.getBoundingClientRect().top;
        setHeight(bottomTop - topBottom);
      }
    };

    updateHeight(); // Call once on mount
  }, []);

  const hideMyProfileView = () => {
    dispatch(showMyProfile());
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setChangePassword(false);
  };
  const handleClose = (e) => {
    setChangePassword(false);
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
      onClick={handleClose}
    >
      <TopBar
        ref={topRef}
        showBackIcon={hideMyProfileView}
        title={"My Profile"}
      />

      <div
        className="w-full mt-[56px] relative bg-white overflow-y-auto "
        style={{ height: `${height}px` }}
      >
        <UserAvatar allowEditing={true} showInfo={false} />
        <div className="px-4 mt-4 space-y-4">
          <p className="font-bold">My personal details</p>

          <InputField
            label="Email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            disabled={true}
          />
          <div className="relative overflow-visible">
            <SelectField
              label="Country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              options={[
                { value: "nl", label: "Netherlands" },
                { value: "de", label: "Germany" },
                { value: "us", label: "United States" },
              ]}
            />
          </div>
          <InputField
            label="First name"
            type="text"
            value={firstName}
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="first_name"
          />
          <InputField
            label="Last name"
            type="text"
            value={lastName}
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="last_name"
          />
          <EditField
            label="Description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <PrimaryButton
            onClick={() => {
              setChangePassword(true);
            }}
          >
            Change password
          </PrimaryButton>
          <div className="w-full h-8"></div>
        </div>
      </div>
      {/* delete account */}
      <div
        ref={bottomRef}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] text-xl text-red-400 text-center rounded-2xl bg-white py-2 border-[0.5px] border-red-400"
        onClick={() => {
          dispatch(logoutUser())
            .unwrap()
            .then(() => {
              handleHideProfileView();
            })
            .catch((err) => {
              console.error("Logout failed:", err);
              // navigate("/");
            });
        }}
      >
        Delete account
      </div>

      {changePassword && (
        <div className="w-full h-screen absolute top-0 bg-transparent z-50 flex items-center justify-center">
          <div className="w-[300px] bg-white border-1 border-gray-300 rounded-lg shadow-lg">
            <div className="p-4 space-y-18">
              <label className="text-base font-medium">Change password</label>

              <form
                onSubmit={handleChangePassword}
                className="flex flex-col gap-4 my-4"
              >
                <InputField
                  label="Password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                />

                <InputField
                  label="Confirm password"
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="confirm_password"
                />

                <PrimaryButton type="submit">Submit</PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfileView;
