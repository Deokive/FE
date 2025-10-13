import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Home from "../pages/Home.tsx";
import NotFound from "../pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout
    children: [
      { index: true, element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
