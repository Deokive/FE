import axios, { AxiosError } from "axios";
import {
  setNextAtkExp,
  scheduleLocalRefreshIfNeeded,
} from "../token/refreshToken.ts";
import { refreshTokens } from "../../hooks/auth.ts";
import { useAuthStore } from "../../store/authStore.ts";
import type {
  CustomInternalAxiosRequestConfig,
  TokenExpiresInfo,
  RefreshingPromise,
} from "../../types/auth"; // 위에서 정의한 타입들을 import

// 환경 변수가 string임을 가정합니다.
const API_BASE_URL = import.meta.env.VITE_API_BASE as string;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// refreshing 변수에 타입을 명확히 지정
let refreshing: RefreshingPromise | null = null;

// AxiosError의 config에 CustomInternalAxiosRequestConfig 타입을 명시
type CustomAxiosError = AxiosError<CustomInternalAxiosRequestConfig>;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err: CustomAxiosError) => {
    // 에러 객체에서 config를 안전하게 가져오고, Custom 타입으로 캐스팅
    const cfg: CustomInternalAxiosRequestConfig | undefined = err.config;

    // config가 없거나, 이미 재시도 플래그가 설정되어 있다면 에러를 던지고 종료
    if (!cfg || cfg._retry) throw err;

    const status = err.response?.status;

    // ATK 만료 (401) 또는 RTK 만료 (419) 감지
    if (status === 401 || status === 419) {
      try {
        // 토큰 갱신이 진행 중이 아니라면, 갱신을 시작하고 Promise를 저장
        if (!refreshing) {
          // refreshTokens()는 Promise<TokenExpiresInfo>를 반환해야 합니다.
          refreshing = refreshTokens() as RefreshingPromise;
        }

        // 갱신이 완료될 때까지 대기
        const tokenInfo: TokenExpiresInfo = await refreshing;
        refreshing = null; // 갱신 완료 후 초기화

        // 새 만료 정보 설정 및 타이머 재설정 유틸리티 함수 호출
        useAuthStore.getState().setTokenExpiresInfo(tokenInfo);
        setNextAtkExp(tokenInfo.accessTokenExpiresAt);
        scheduleLocalRefreshIfNeeded();

        // 재시도 플래그 설정 후, 원래 요청을 새 토큰(쿠키)으로 재시도
        cfg._retry = true;
        // axiosInstance(cfg)의 결과가 최종적으로 반환됨
        return axiosInstance(cfg);
      } catch (e) {
        refreshing = null;
        console.error("토큰 갱신 실패:", e);
        // 세션 만료 → 로그인 페이지로 이동
        window.location.href = "/login";
        throw e;
      }
    }

    // 401/419 이외의 에러는 그대로 던짐
    throw err;
  }
);

export default axiosInstance;
