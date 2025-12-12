import { NavLink } from "react-router-dom";

const MainNavbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-color-lowest" : "text-color-lowest opacity-[0.5]";

  return (
    // 홈, 아카이브, 커뮤니티, 피드 네비게이션 바
    <div className="typo-h3-semibold bg-brand-blue-400 flex h-[88px] px-[80px] py-[22px] justify-between items-center stretch">
      <div className="flex items-center gap-10">
        {/* 왼쪽 그룹 */}
        <ul className="flex items-center gap-10">
          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/Archive" className={linkClass}>
              Archive
            </NavLink>
          </li>
          <li>
            <NavLink to="/Feed" className={linkClass}>
              Feed
            </NavLink>
          </li>
          <li>
            <NavLink to="/Community" className={linkClass}>
              Community
            </NavLink>
          </li>
        </ul>
      </div>
      {/* 오른쪽 단독(My Page) */}
      <div className="flex items-center gap-10">
        <div>
          <NavLink to="/me" className={linkClass}>
            My Page
          </NavLink>
        </div>
        <div>
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to="/signup" className={linkClass}>
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
