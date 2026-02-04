import axiosInstance from "@/apis/axios";
import type { GalleryListResponse } from "@/types/gallery";
import type { FetchGalleryParams } from "@/types/gallery";

const DEFAULTS = {
  page: 0,
  size: 9,
  sort: "createdAt",
  direction: "DESC",
};

export async function fetchGallery(
  params: FetchGalleryParams,
  signal?: AbortSignal
): Promise<GalleryListResponse> {
  const {
    archiveId,
    page = DEFAULTS.page,
    size = DEFAULTS.size,
    sort = DEFAULTS.sort,
    direction = DEFAULTS.direction,
  } = params;

  const url = `/api/v1/gallery/${archiveId}?page=${page}&size=${size}&sort=${encodeURIComponent(
    sort
  )}&direction=${encodeURIComponent(direction)}`;

  const res = await axiosInstance.get<GalleryListResponse>(url, {
    headers: { Accept: "application/json" },
    signal,
  });

  return res.data;
}

export default fetchGallery;
