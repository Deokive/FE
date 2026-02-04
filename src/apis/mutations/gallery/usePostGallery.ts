import { useMutation, useQueryClient } from "@tanstack/react-query";
import postGalleryApi from "@/apis/mutations/gallery/postGallery";
import type { ApiError, ApiErrorBody } from "@/types/error";
import type { PostGalleryRequest, PostGalleryResponse } from "@/types/gallery";

export const usePostGallery = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PostGalleryResponse,
    ApiError<ApiErrorBody>,
    { archiveId: string | number; payload: PostGalleryRequest }
  >({
    mutationFn: ({ archiveId, payload }) => postGalleryApi(archiveId, payload),
    onSuccess: (_data, vars) => {
      try {
        const aid = vars?.archiveId;

        queryClient.invalidateQueries({ queryKey: ["gallery"] });

        if (aid !== undefined && aid !== null) {
          const aidStr = String(aid);
          queryClient.invalidateQueries({
            predicate: (query) => {
              const k = query.queryKey;
              if (!Array.isArray(k) || k.length === 0) return false;
              if (k[0] !== "gallery") return false;

              return k.some((part) => String(part) === aidStr);
            },
          });
        }
      } catch (err) {
        console.warn("usePostGallery onSuccess invalidate error:", err);
      }
    },
    onError: (error) => {
      console.error("usePostGallery error:", error);
    },
  });
};
