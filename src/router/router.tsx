import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home.tsx";
import NotFound from "../pages/NotFound.tsx";
import LoginPage from "../pages/Auth/LoginPage.tsx";
import HomeLayout from "@/components/layout/HomeLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />, // layout
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
