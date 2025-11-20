import axiosInstance from "@/libs/axios/axios";
import type { fetchMeResponse } from "@/types/auth";

export const fetchMe = async () => {
  const { data } = await axiosInstance.get<fetchMeResponse>("/api/v1/users/me");
  return data;
};
