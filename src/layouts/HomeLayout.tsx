import MainNavbar from "@/components/MainNavbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="w-[1920px] h-screen">
      <MainNavbar />
      <Outlet />
      {/* <Footbar /> */}
    </div>
  );
};

export default HomeLayout;
