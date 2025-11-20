import { Link } from "react-router-dom";

const MainNavbar = () => {
  return (
    // 홈, 아카이브, 커뮤니티, 피드 네비게이션 바
    <div className="h-16 fixed top-0 left-0 right-0 bg-gray-100">
      <div className="flex items-center justify-between">
        <ul className="flex items-center gap-4">
          <li className="text-sm font-medium">
            <Link to="/">Home</Link>
          </li>
          <li className="text-sm font-medium">
            <Link to="/archive">Archive</Link>
          </li>
          <li className="text-sm font-medium">
            <Link to="/community">Community</Link>
          </li>
          <li className="text-sm font-medium">
            <Link to="/feed">Feed</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainNavbar;
