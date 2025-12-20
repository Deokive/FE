import MainNavbar from "@/components/MainNavbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <MainNavbar />
      <Outlet />
      {/* <Footbar /> */}
    </div>
  );
};

export default HomeLayout;
