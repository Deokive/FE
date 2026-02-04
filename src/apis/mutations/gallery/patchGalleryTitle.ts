import axiosInstance from "@/apis/axios";
import type { PatchGalleryTitlePayload } from "@/types/gallery";

export async function patchGalleryTitleApi(
  archiveId: string | number,
  payload: PatchGalleryTitlePayload
) {
  const id = String(archiveId);
  const url = `/api/v1/gallery/${id}`;
  const res = await axiosInstance.patch(url, payload, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
  return res.data;
}

export default patchGalleryTitleApi;
