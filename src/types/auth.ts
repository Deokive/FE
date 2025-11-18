// src/types/auth.ts
import type { InternalAxiosRequestConfig } from "axios";

// 1) 백엔드에서 내려주는 사용자 정보
export interface User {
  id: number;
  email: string;
  role: string;
  nickname: string;
  createdAt: string; // ISO 또는 KST Datetime 문자열
  lastModifiedAt: string; // ISO 또는 KST Datetime 문자열
}

// 2) 토큰 만료 정보
export interface TokenExpiresInfo {
  accessTokenExpiresAt: string; // ISO 또는 KST Datetime 문자열
  refreshTokenExpiresAt: string; // ISO 또는 KST Datetime 문자열
}

// 3) 로그인/리프레시 공통 응답 (예시 스펙 기반)
export interface AuthResponse {
  user: User;
  tokenExpiresInfo: TokenExpiresInfo;
}

// 4) Axios 요청 Config 확장 타입
// Interceptor에서 _retry 플래그를 사용하기 위해 기본 타입(InternalAxiosRequestConfig)을 확장합니다.
export interface CustomInternalAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 4. Promise<TokenExpiresInfo>를 resolve하는 Refreshing 상태 타입
export type RefreshingPromise = Promise<TokenExpiresInfo>;

export interface RegisterPayload {
  email: string;
  nickname: string;
  password: string;
  emailVerified: boolean;
  isEmailVerified: boolean;
}

export type RefreshTokensResponse = {
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
};

export type fetchMeResponse = {
  user: User;
};

export type deleteUserResponse = {
  message: string;
};

export type fetchSocialLoginUserResponse = {
  user: User;
  tokenExpiresInfo: TokenExpiresInfo;
};
