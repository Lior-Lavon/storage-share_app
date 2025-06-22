import React, { useEffect, useRef, useState } from "react";

import { CircleImageCropper, TopBar, UserAvatar } from "../../components";
import { showMyProfile } from "../../features/dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/SharedComponents/InputField";
import EditField from "../../components/SharedComponents/EditField";
import SelectField from "../../components/SharedComponents/SelectField";
import PrimaryButton from "../../components/SharedComponents/PrimaryButton";
import {
  logoutUser,
  resetPassword,
  softDeleteUser,
  updateUser,
  updateUserProfile,
  uploadAvatar,
  deleteAvatar,
} from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

import womanAvatar from "../../assets/womanAvatar.png";
import ImageCrop from "../../components/ImageCrop";

const titleOptions = [
  { value: "not_set", label: "not set" },
  { value: "mr", label: "mr" },
  { value: "ms", label: "ms" },
];

const MyProfileView = ({ isVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cropModel, setCropModel] = useState(false);
  const [height, setHeight] = useState(0);
  const { profile } = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(titleOptions[0]);
  const [changePassword, setChangePassword] = useState("");
  const [password, setPassword] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordError, setChangePasswordError] = useState(null);
  const topRef = useRef(null);
  const isFirstRender = useRef(true);
  const prevVisibleRef = useRef(isVisible);

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
    console.log("profile : ", profile);

    setSelectedTitle(
      titleOptions.find((option) => option.value === profile?.title)
    );
    setFirstName(profile?.firstname);
    setLastName(profile?.lastname);
    setDescription(profile?.description);
  }, [profile]);

  useEffect(() => {}, [selectedTitle]);

  useEffect(() => {
    if (!isFirstRender.current) {
      if (isVisible == true) {
        setChangePasswordError(null);
      }
      if (prevVisibleRef.current === true && isVisible == false) {
        postProfile();
      }
    } else {
      isFirstRender.current = false;
    }

    prevVisibleRef.current = isVisible;
  }, [isVisible]);

  const hideMyProfileView = () => {
    setChangePasswordError(null);
    dispatch(showMyProfile());
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // setChangePassword(false);

    if (originalPassword == "" || password == "" || confirmPassword == "") {
      setChangePasswordError("missing input");
      return;
    }
    if (password != confirmPassword) {
      setChangePasswordError("password does not match");
      return;
    }

    dispatch(
      resetPassword({
        id: profile.id,
        email: profile.email,
        currentEmail: originalPassword,
        password: password,
      })
    )
      .unwrap()
      .then((res) => {
        console.log("change password success: ", res);
        setChangePassword(false);
      })
      .catch((err) => {
        console.log("failed to change password");
        setChangePassword(false);
      });
  };

  const postProfile = () => {
    dispatch(
      updateUser({
        id: profile.id,
        title: selectedTitle?.value,
        first_name: firstName == undefined ? "" : firstName,
        last_name: lastName == undefined ? "" : lastName,
        description: description == undefined ? "" : description,
      })
    )
      .unwrap()
      .then(() => {
        console.log("updateUser success");
      })
      .catch((err) => {
        console.error("updateUser failed");
      });
  };

  const handleDeleteAccount = () => {
    dispatch(
      softDeleteUser({
        id: profile.id,
        delete: "true",
      })
    )
      .unwrap()
      .then(() => {
        console.log("handleDeleteAccount successful");
        // navigate("/");
      })
      .catch((err) => {
        console.error("deleted failed:", err);
      });
  };

  const handleTitleChange = (e) => {
    const matchedOption = titleOptions.find(
      (option) => option.value === e.target.value
    );
    if (matchedOption != null) setSelectedTitle(matchedOption);
  };

  const isChangePasswordAllowed = () => {
    let retVal = false;
    if (profile == undefined) {
      retVal = false;
    }
    if (profile.loginType == "Password") {
      retVal = true;
    }
    return !retVal;
  };

  const updateAvatar = (fileName, imgSrc) => {
    console.log("updateAvatar : ");

    // const updatedProfile = { ...profile, avatar: imgSrc };
    // dispatch(updateUserProfile(updatedProfile));

    // update server
    const fd = new FormData();
    fd.append("filename", fileName);
    fd.append("body", imgSrc.substring("data:image/jpeg;base64,".length));
    dispatch(uploadAvatar(fd));
  };

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob); // produces base64 string
    });
  }

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
      <TopBar
        ref={topRef}
        showBackIcon={hideMyProfileView}
        title={"My Profile"}
      />

      <div
        className="w-full mt-[56px] relative bg-white overflow-y-auto "
        style={{ height: `${height}px` }}
      >
        <UserAvatar
          allowEditing={true}
          imageUrl={profile?.avatar}
          showModal={() => {
            setCropModel(!cropModel);
          }}
        />
        <div className="px-4 mt-4 space-y-4">
          <p className="font-bold text-xl">My personal details</p>

          <InputField
            label="Email"
            type="email"
            value={profile.email}
            placeholder="Email"
            // onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            disabled={true}
          />
          <div className="relative overflow-visible">
            <SelectField
              label="Title"
              value={selectedTitle.value}
              onChange={handleTitleChange}
              options={titleOptions}
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
            disabled={isChangePasswordAllowed()}
            onClick={() => {
              setChangePassword(true);
            }}
          >
            Change password
          </PrimaryButton>

          {/* delete account */}
          <PrimaryButton
            bgColor="bg-white"
            textColor="text-red-500"
            borderColor="border border-red-500"
            onClick={() => {
              handleDeleteAccount();
            }}
          >
            Delete account
          </PrimaryButton>
          <div className="w-full h-8"></div>
        </div>
      </div>

      {changePassword && (
        <div
          className="w-full h-screen absolute top-0 bg-transparent z-50 flex items-center justify-center"
          onClick={() => {
            setChangePasswordError(null);
            setChangePassword(false);
          }}
        >
          <div
            className="change_password w-[90%] max-w-[500px] bg-white border-1 border-gray-300 rounded-lg shadow-lg"
            onClick={(e) => {
              e.stopPropagation(); // Block "22" here
            }}
          >
            <div className="p-4 space-y-1">
              <div className="w-full flex flex-col gap-2 font-bold">
                <p className="text-violet-600 text-2xl text-center  ">
                  Change password
                </p>
                <p className="text-center">Set up a new password</p>
              </div>

              {changePasswordError != null && (
                <p className="w-full text-center text-red-400">
                  {changePasswordError}
                </p>
              )}

              <form
                onSubmit={handleChangePassword}
                className="flex flex-col gap-4 mt-4"
              >
                <InputField
                  label="Current password"
                  type="text"
                  value={originalPassword}
                  placeholder="Password"
                  onChange={(e) => setOriginalPassword(e.target.value)}
                  autoComplete="original_password"
                />

                <InputField
                  label="New password"
                  type="text"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                />

                <InputField
                  label="Confirm new password"
                  type="text"
                  value={confirmPassword}
                  placeholder="Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="confirm_password"
                />

                <PrimaryButton type="submit">Set new password</PrimaryButton>

                <PrimaryButton
                  bgColor={"bg-while"}
                  textColor={"text-violet-600"}
                  borderColor={"border"}
                  onClick={() => {
                    setChangePassword(false);
                  }}
                >
                  Cancel
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      )}

      {cropModel && (
        <CircleImageCropper
          closeModal={() => {
            setCropModel(!cropModel);
          }}
          onCropped={(blob) => {
            blobToBase64(blob).then((base64String) => {
              const fd = new FormData();
              fd.append("filename", "cropped.jpg");
              fd.append(
                "body",
                base64String.substring("data:image/jpeg;base64,".length)
              );
              dispatch(uploadAvatar(fd))
                .unwrap()
                .then(() => {
                  console.log("uploadAvatar success");
                  setCropModel(!cropModel);
                })
                .catch((err) => {
                  console.error("uploadAvatar failed:", err);
                });
            });
          }}
        />
        // <ImageCrop
        //   updateImage={updateAvatar}
        //   showCropModel={setCropModel}
        //   useCirculate={true}
        //   aspectRatio={1}
        // />
      )}
    </div>
  );
};

export default MyProfileView;
