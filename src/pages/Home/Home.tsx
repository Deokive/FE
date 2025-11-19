import { logout } from "@/apis/auth";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    useAuthStore.getState().clearAuth();
    await navigate("/login", { replace: true });
  };

  return (
    <div>
      <div>
        Home
        {/* 로그인한 유저 이름 나오게 하기 */}
        <div>
          <span>{user?.nickname ?? "로그인 해주세요"}</span>
          <button onClick={() => void handleLogout()}>로그아웃</button>
        </div>
      </div>
    </div>
  );
}
