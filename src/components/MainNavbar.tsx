import { NavLink } from "react-router-dom";

const MainNavbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-black font-bold" : "text-gray-500";

  return (
    // 홈, 아카이브, 커뮤니티, 피드 네비게이션 바
    <div className="h-16 fixed top-0 left-0 right-0 bg-gray-100">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4">
        {/* 왼쪽 그룹 */}
        <ul className="flex items-center gap-6">
          <li className="text-sm font-medium">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>
          <li className="text-sm font-medium">
            <NavLink to="/Archive" className={linkClass}>
              Archive
            </NavLink>
          </li>
          <li className="text-sm font-medium">
            <NavLink to="/Feed" className={linkClass}>
              Feed
            </NavLink>
          </li>
          <li className="text-sm font-medium">
            <NavLink to="/Community" className={linkClass}>
              Community
            </NavLink>
          </li>
        </ul>
        {/* 오른쪽 단독(My Page) */}

        <div className="text-sm font-medium">
          <NavLink to="/me" className={linkClass}>
            My Page
          </NavLink>
        </div>

        <div className="text-sm font-medium">
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
        </div>
        <div className="text-sm font-medium">
          <NavLink to="/signup" className={linkClass}>
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
