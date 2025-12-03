import Footbar from "@/components/Footbar";
import MainNavbar from "@/components/MainNavbar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div>
      <div>
        <MainNavbar />
        <Outlet />
        <Footbar />
      </div>
    </div>
  );
};

export default ProtectedLayout;
