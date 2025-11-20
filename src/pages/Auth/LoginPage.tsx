import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import SocialLoginButtons from "../../components/auth/SocialLoginButton";

export const LoginPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      void navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-xl font-semibold mb-6 text-center">로그인</h1>
        <SocialLoginButtons />
      </div>
    </div>
  );
};

export default LoginPage;
