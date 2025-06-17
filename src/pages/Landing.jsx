import { useSelector } from "react-redux";
import useScreenWidth from "../utils/useScreenWidth";
import Dashboard from "./dashboard/Dashboard";
import NotSupported from "./NotSupported";
import useViewportHeight from "../utils/useViewportHeight";
import { TopBar } from "../components";
import PrimaryButton from "../components/SharedComponents/PrimaryButton";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const { profile } = useSelector((store) => store.user);
  const screenWidth = useScreenWidth();
  const viewHeight = useViewportHeight();

  if (screenWidth > 768) {
    return <NotSupported />;
  }

  // if (profile != null) {
  //   return <Dashboard />;
  // }

  return (
    <div
      className="w-full flex items-center justify-center bg-white"
      style={{ height: viewHeight }}
    >
      {/* TopBar */}
      <TopBar />

      <div className="w-[90%]">
        <div className="flex flex-col space-y-4 text-center">
          <p>LandingView</p>
          <PrimaryButton onClick={() => navigate("/login")}>
            Sign in
          </PrimaryButton>
          <PrimaryButton onClick={() => navigate("/register")}>
            Sign up
          </PrimaryButton>
          <PrimaryButton onClick={() => navigate("/delete_user")}>
            Delete user
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
export default Landing;
