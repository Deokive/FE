import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound.tsx";
import HomeLayout from "@/layouts/HomeLayout.tsx";
import Archive from "@/pages/Archive/Archive.tsx";
import Community from "@/pages/Community/Community";
import Feed from "@/pages/Feed/Feed";
import MyPage from "@/pages/MyPage/MyPage";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import LoginPage from "@/pages/Auth/LoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import TestPlayGround from "@/pages/Test/TestPlayGround";
import FeedDetail from "@/pages/Feed/FeedDetail";
import CommunityWrite from "@/pages/Community/CommunityWrite";
import CommunityDetail from "@/pages/Community/CommunityDetail";
import ArchiveDetail from "@/pages/Archive/ArchiveDetail";
import TicketBookPage from "@/pages/Archive/Ticket/TicketBookPage";
import CreateTicketPage from "@/pages/Archive/Ticket/CreateTicketPage";
import EditTicketPage from "@/pages/Archive/Ticket/EditTicketPage";
import Gallery from "@/pages/Archive/Gallery/Gallery";

// 로그인 하지 않은 사용자만 접근 가능한 라우트 (메인 홈, 커뮤니티 열람, 피드 열람)
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />, // layout
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "archive", element: <Archive /> },
      { path: "archive/:id", element: <ArchiveDetail /> },
      { path: "archive/:id/ticket-book", element: <TicketBookPage /> },
      { path: "archive/:id/gallery", element: <Gallery /> },
      { path: "feed", element: <Feed /> },
      { path: "feed/:id", element: <FeedDetail /> },
      { path: "community", element: <Community /> },
      { path: "/community/:postId", element: <CommunityDetail /> },
      { path: "test", element: <TestPlayGround /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

// 로그인 한 사용자만 접근 가능한 라우트 (메인 홈, 커뮤니티 열람, 피드 열람, 아카이브 열람, 마이페이지)
const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "archive", element: <Archive /> },
      { path: "ticket/create", element: <CreateTicketPage /> },
      { path: "ticket/edit/:id", element: <EditTicketPage /> },
      { path: "feed", element: <Feed /> },
      { path: "community", element: <Community /> },
      { path: "community/new", element: <CommunityWrite /> },
      { path: "me", element: <MyPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

export default router;
