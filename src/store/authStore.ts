import { create } from "zustand";
import type { AuthResponse, TokenExpiresInfo, User } from "../types/auth";

type AuthStore = {
  // 인증 상태
  isAuthenticated: boolean;
  user: User | null;
  tokenExpiresInfo: TokenExpiresInfo | null;

  // 파생 정보 헬퍼
  isAccessTokenExpired: () => boolean;
  msUntilAccessExpire: () => number;

  // 액션
  loginWithUser: (user: User) => void;
  loginSuccess: (payload: AuthResponse) => void;
  setTokenExpiresInfo: (info: TokenExpiresInfo) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  user: null,
  tokenExpiresInfo: null,

  isAccessTokenExpired: () => {
    const info = get().tokenExpiresInfo;
    if (!info) return true;
    const now = Date.now();
    const exp = new Date(info.accessTokenExpiresAt).getTime();
    return now >= exp;
    // 서버 시간이 KST 라면 문자열을 Date에 그대로 넣어도 파싱됩니다.
  },

  msUntilAccessExpire: () => {
    const info = get().tokenExpiresInfo;
    if (!info) return 0;
    const delta = new Date(info.accessTokenExpiresAt).getTime() - Date.now();
    return Math.max(0, delta);
  },

  loginWithUser: (user: User) => {
    set({
      isAuthenticated: true,
      user,
    });
  },

  loginSuccess: (payload: AuthResponse) => {
    set({
      isAuthenticated: true,
      user: payload.user,
      tokenExpiresInfo: payload.tokenExpiresInfo,
    });
  },

  setTokenExpiresInfo: (info: TokenExpiresInfo) => {
    set({ tokenExpiresInfo: info, isAuthenticated: true });
  },

  clearAuth: () => {
    set({
      isAuthenticated: false,
      user: null,
      tokenExpiresInfo: null,
    });
  },
}));
