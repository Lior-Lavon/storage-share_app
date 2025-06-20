import styled from "styled-components";
import { useRef, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { FaPen } from "react-icons/fa";
// import { uploadAvatar } from "../features/user/userSlice";
// import { toggleImageCrop } from "../features/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  display: inline-block;
  border: 1px solid lightgray;
  padding: 0.5rem;
  position: relative;
  width: fit-content;

  .image-container {
    height: 100px;
    width: 100px;
    z-index: 1;
    border-radius: 50%;
    background-color: #fff;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    color: var(--grey-400);
  }
  .icon-wrapper {
    position: absolute;
    height: 30px;
    width: 30px;
    padding: 0.35rem;
    bottom: 10px;
    right: 10px;
    background-color: var(--primary-500);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    cursor: pointer;

    &:hover {
      transition: all 0.25s;
      background-color: var(--primary-700);
    }

    .icon {
      color: white;
      font-size: 0.8rem;
    }

    label {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* input[type="file"] {
      display: none;
    } */
  }
`;

const AvatarLoader = ({ image, setCropModel }) => {
  const avatarUrl = useRef("");
  const inputField = useRef(null);
  const dispatch = useDispatch();

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const handleClick = (event) => {
    // open file manager
    // inputField.current.click();
    setCropModel(true);
  };

  const handleChange = (e) => {
    console.log("handleChange");
    if (e.target.files && e.target.files[0]) {
      // console.log(e.target.files[0]);
      // const formData = new FormData();
      // formData.append("avatar", e.target.files[0]);
      // dispatch(uploadAvatar(formData));
    }
  };

  return (
    <Wrapper>
      <div className="image-container">
        {!image ? (
          <RxAvatar className="avatar" />
        ) : (
          <img src={image} className="avatar" />
        )}
      </div>
      <div className="icon-wrapper">
        <input
          type="file"
          // accept="image/*"
          onChange={handleChange}
          ref={inputField}
          style={{ display: "none" }}
        />
        <button className="button-upload" onClick={handleClick}>
          <FaPen className="icon" />
        </button>
      </div>
    </Wrapper>
  );
};
export default AvatarLoader;
