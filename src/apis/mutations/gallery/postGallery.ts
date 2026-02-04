import axiosInstance from "@/apis/axios";
import type { PostGalleryRequest, PostGalleryResponse } from "@/types/gallery";

export async function postGalleryApi(
  archiveId: string | number,
  payload: PostGalleryRequest
): Promise<PostGalleryResponse> {
  const res = await axiosInstance.post<PostGalleryResponse>(
    `/api/v1/gallery/${archiveId}`,
    payload
  );
  return res.data;
}

export default postGalleryApi;
