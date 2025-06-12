import useScreenWidth from "../utils/useScreenWidth";
import Dashboard from "./dashboard/Dashboard";
import NotSupported from "./NotSupported";

const Landing = () => {
  const screenWidth = useScreenWidth();

  return <>{screenWidth > 768 ? <NotSupported /> : <Dashboard />}</>;
};
export default Landing;
