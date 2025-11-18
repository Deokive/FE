// src/components/auth/AuthBootstrapper.tsx
import { useEffect } from "react";
import { fetchSocialLoginUser } from "@/hooks/auth";
import { useAuthStore } from "@/store/authStore";
import {
  setNextAtkExp,
  scheduleLocalRefreshIfNeeded,
  clearRefreshTimer,
} from "@/libs/token/refreshToken";

export const AuthBootstrapper = () => {
  const tokenExpiresInfo = useAuthStore((s) => s.tokenExpiresInfo);

  useEffect(() => {
    void (async () => {
      try {
        const me = await fetchSocialLoginUser();
        useAuthStore.getState().loginWithUser(me.user);
      } catch {
        console.error("Failed to fetch user");
      }
    })();
  }, []);

  useEffect(() => {
    if (tokenExpiresInfo?.accessTokenExpiresAt) {
      setNextAtkExp(tokenExpiresInfo.accessTokenExpiresAt);
      scheduleLocalRefreshIfNeeded();
    }
    return () => clearRefreshTimer();
  }, [tokenExpiresInfo]);

  return null;
};
