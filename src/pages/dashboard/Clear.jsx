import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

import React from "react";

const ClearCache = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate("/");
  }, []);
  return <div></div>;
};

export default ClearCache;
