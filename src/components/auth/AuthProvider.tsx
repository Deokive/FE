import { useEffect, useState } from "react";
// import { fetchMe } from "@/hooks/user";
import { useAuthStore } from "@/store/authStore";
import { fetchSocialLoginUser } from "@/apis/auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        // const me = await fetchMe();
        const me = await fetchSocialLoginUser();
        // 응답 키 불일치 대비
        useAuthStore.getState().loginWithUser(me.user);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) return <div>Loading...</div>; // 필요하면 로딩 UI로 교체
  return <>{children}</>;
}
