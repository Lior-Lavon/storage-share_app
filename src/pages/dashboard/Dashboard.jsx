import React, { useEffect, useState } from "react";
import { ForgotPasswordView, LoginView, SignupView } from "../../components";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { status } = useSelector((store) => store.user);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.visualViewport?.height || window.innerHeight);
    };

    updateHeight(); // set on mount
    window.visualViewport?.addEventListener("resize", updateHeight);
    window.addEventListener("resize", updateHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div
      className="w-full bg-red-400 flex items-center justify-center"
      style={{ height: viewportHeight }}
    >
      {status == 0 && <LoginView />}
      {status == 1 && <SignupView />}
      {status == 2 && <ForgotPasswordView />}
    </div>
  );
};

export default Dashboard;
