import Footbar from "@/components/Footbar";
import MainNavbar from "@/components/MainNavbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <MainNavbar isLoggedIn={false} />
      <Outlet />
      <Footbar />
    </div>
  );
};

export default HomeLayout;
