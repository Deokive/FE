import Logo from "@/assets/Icon/Logo";
import { NavLink } from "react-router-dom";

const MainNavbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-color-lowest" : "text-color-lowest opacity-[0.5]";

  return (
    // 홈, 아카이브, 커뮤니티, 피드 네비게이션 바
    <div className="typo-h3 bg-brand-blue-400 flex h-20 px-20 py-7 justify-between items-center">
      <div className="flex items-center gap-10">
        {/* 왼쪽 그룹 */}
        <ul className="flex h-10 items-center gap-10">
          <Logo />
          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/archive" className={linkClass}>
              Archive
            </NavLink>
          </li>
          <li>
            <NavLink to="/feed" className={linkClass}>
              Feed
            </NavLink>
          </li>
          <li>
            <NavLink to="/community" className={linkClass}>
              Community
            </NavLink>
          </li>
        </ul>
      </div>
      {/* 오른쪽 단독(My Page) */}
      <div className="flex items-center gap-10">
        <div>
          <NavLink to="/login" className={linkClass}>
            로그인
          </NavLink>
        </div>
        <div>
          <NavLink to="/signup" className={linkClass}>
            회원가입
          </NavLink>
        </div>
        <div>
          <NavLink to="/me" className={linkClass}>
            My page
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
