import { NavLink } from "react-router-dom";

const MainNavbar = () => {
  return (
    // 홈, 아카이브, 커뮤니티, 피드 네비게이션 바
    <div className="h-16 fixed top-0 left-0 right-0 bg-gray-100">
      <div className="flex items-center justify-between">
        <ul className="flex items-center gap-4">
          <li className="text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-black font-bold" : "text-gray-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="text-sm font-medium">
            <NavLink
              to="/archive"
              className={({ isActive }) =>
                isActive ? "text-black font-bold" : "text-gray-500"
              }
            >
              Archive
            </NavLink>
          </li>
          <li className="text-sm font-medium">
            <NavLink
              to="/community"
              className={({ isActive }) =>
                isActive ? "text-black font-bold" : "text-gray-500"
              }
            >
              Community
            </NavLink>
          </li>
          <li className="text-sm font-medium">
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                isActive ? "text-black font-bold" : "text-gray-500"
              }
            >
              Feed
            </NavLink>
          </li>
        </ul>

        {/* 오른쪽 단독(My Page) */}
        <div className="text-sm font-medium">
          <NavLink
            to="/me"
            className={({ isActive }) =>
              isActive ? "text-black font-bold" : "text-gray-500"
            }
          >
            My Page
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
