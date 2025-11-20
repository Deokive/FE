import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Home from "../pages/Home.tsx";
import NotFound from "../pages/NotFound.tsx";
import HomeLayout from "@/layouts/HomeLayout.tsx";
import Archive from "@/pages/Archive/Archive.tsx";
import Community from "@/pages/Community/Community.tsx";
import Feed from "@/pages/Feed/Feed.tsx";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />, // layout
    children: [
      { index: true, element: <Home /> },
      { path: "Archive", element: <Archive /> },
      { path: "Feed", element: <Feed /> },
      { path: "Community", element: <Community /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes]);

export default router;
