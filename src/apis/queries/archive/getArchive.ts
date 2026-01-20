import axiosInstance from "@/apis/axios";
import type { GetArchiveRequest, GetArchiveResponse,  } from "@/types/archive";

export const getArchive = async (userId: number, params: GetArchiveRequest): Promise<GetArchiveResponse> => {

  const response = await axiosInstance.get(`/api/v1/archives/users/${userId}`, {
    params: {
      page: params?.page ?? 0, // default 0
      size: params?.size ?? 10, // default 10
      sort: params?.sort ?? "createdAt",      // default "createdAt"
      direction: params?.direction ?? "DESC", // default "DESC"
    },
  });
  return response.data;
};