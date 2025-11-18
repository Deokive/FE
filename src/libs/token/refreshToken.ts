import { refreshTokens } from "../../hooks/auth.ts";
import { useAuthStore } from "../../store/authStore.ts";
import type { TokenExpiresInfo } from "../../types/auth.ts";

// 선제 RTR 타이머 보관
let refreshTimer: number | null = null;
// Access Token 만료시각(ms)
let nextAtkExpMs: number | null = null;

const readAccessExpireFromStore = (): string | null => {
  const info: TokenExpiresInfo | null =
    useAuthStore.getState().tokenExpiresInfo;
  return info?.accessTokenExpiresAt ?? null;
};

const doRefresh = async (): Promise<void> => {
  const tokenInfo: TokenExpiresInfo = await refreshTokens();
  // 스토어 최신화
  useAuthStore.getState().setTokenExpiresInfo(tokenInfo);
  // 다음 만료시각 설정
  setNextAtkExp(tokenInfo.accessTokenExpiresAt);
};

export const setNextAtkExp = (
  expIsoString: string | null | undefined
): void => {
  if (!expIsoString) {
    nextAtkExpMs = null;
    return;
  }
  const parsed = Date.parse(expIsoString);
  nextAtkExpMs = Number.isFinite(parsed) ? parsed : null;
};

// 만료 2분 전 선제 RTR 타이머 설정
export const scheduleLocalRefreshIfNeeded = (): void => {
  if (refreshTimer !== null) {
    window.clearTimeout(refreshTimer);
    refreshTimer = null;
  }

  if (!nextAtkExpMs) return;
  const nowMs = Date.now();
  const leadMs = 2 * 60 * 1000; // 만료 2분 전
  const dueMs = Math.max(nextAtkExpMs - leadMs - nowMs, 0);

  refreshTimer = window.setTimeout(async () => {
    try {
      await doRefresh();
      // 갱신 후 다음 만료에 맞춰 재스케줄
      scheduleLocalRefreshIfNeeded();
    } catch {
      useAuthStore.getState().clearAuth();
      window.location.href = "/login";
    }
  }, dueMs);
};

// 앱 시작/로그인 직후 등 스토어의 값으로 부트스트랩
export const bootstrapRefreshTimerFromStore = (): void => {
  const nextExp = readAccessExpireFromStore();
  setNextAtkExp(nextExp);
  scheduleLocalRefreshIfNeeded();
};

// refreshToken 타이머 정리 (로그아웃 시 사용)
export const clearRefreshTimer = (): void => {
  if (refreshTimer !== null) {
    window.clearTimeout(refreshTimer);
    refreshTimer = null;
  }
  nextAtkExpMs = null;
};
