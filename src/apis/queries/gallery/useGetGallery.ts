import { useQuery } from "@tanstack/react-query";
import fetchGallery from "./getGallery";
import type { GalleryListResponse, FetchGalleryParams } from "@/types/gallery";

export const useGetGallery = (params: FetchGalleryParams) => {
  return useQuery<GalleryListResponse>({
    queryKey: [
      "gallery",
      String(params.archiveId),
      params.page ?? 0,
      params.size ?? 9,
      params.sort ?? "createdAt",
      params.direction ?? "DESC",
    ],
    queryFn: () => fetchGallery(params),
    enabled: !!params.archiveId,
    retry: false,
  });
};
