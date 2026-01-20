import axiosInstance from "@/apis/axios";
import type { ArchiveResponse, CreateArchiveRequest } from "@/types/archive";

export const CreateArchive = async (data: CreateArchiveRequest): Promise<ArchiveResponse> => {
  const response = await axiosInstance.post<ArchiveResponse>(
    "/api/v1/archives",
    data
  );
  return response.data;
};