import MainNavbar from "@/components/MainNavbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="w-full h-full">
      <MainNavbar />
      <Outlet />
      {/* <Footbar /> */}
    </div>
  );
};

export default HomeLayout;
