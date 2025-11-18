import axios from "axios";
import axiosInstance from "../libs/axios/axios.ts";
import type {
  deleteUserResponse,
  RegisterPayload,
  RefreshTokensResponse,
  fetchSocialLoginUserResponse,
} from "../types/auth.ts";

// 로그아웃
export const logout = async () => {
  await axiosInstance.post("/api/v1/auth/logout").catch(() => {});
};

// 로그인
export const login = async (username: string, password: string) =>
  axios.post(
    `${import.meta.env.VITE_API_BASE}/api/v1/auth/login`,
    { username, password },
    { withCredentials: true }
  );

// 회원가입
export const register = async (payload: RegisterPayload) =>
  axios.post(`${import.meta.env.VITE_API_BASE}/api/v1/auth/register`, payload, {
    withCredentials: true,
  });

// 리프레시 토큰갱신
export const refreshTokens = async () => {
  const { data } = await axiosInstance.post<RefreshTokensResponse>(
    "/api/v1/auth/refresh"
  );
  return data;
};

//유저 회원탈퇴
export const deleteUser = async () => {
  const { data } = await axiosInstance.delete<deleteUserResponse>(
    "/api/v1/auth/delete"
  );
  return data;
};

//소셜 로그인 유저정보 & 토큰만류 정보
export const fetchSocialLoginUser = async () => {
  const { data } = await axiosInstance.get<fetchSocialLoginUserResponse>(
    "/api/v1/auth/social/me"
  );
  return data;
};

// 로컬 유저 정보 초기화
export const clearLocalUser = () => {
  localStorage.removeItem("loginType");
  localStorage.removeItem("nickname");
  localStorage.removeItem("userId");
};
