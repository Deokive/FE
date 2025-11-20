import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Home from "@/pages/Home/Home.tsx";
import NotFound from "@/pages/NotFound.tsx";
import HomeLayout from "@/layouts/HomeLayout.tsx";
import Archive from "@/pages/Archive/Archive.tsx";
import Community from "@/pages/Community/Community.tsx";
import Feed from "@/pages/Feed/Feed.tsx";
import MyPage from "@/pages/MyPage/MyPage.tsx";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />, // layout
    children: [
      { index: true, element: <Home /> },
      { path: "archive", element: <Archive /> },
      { path: "feed", element: <Feed /> },
      { path: "community", element: <Community /> },
      { path: "me", element: <MyPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes]);

export default router;
