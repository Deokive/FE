import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteGalleryApi from "@/apis/mutations/gallery/deleteGallery"; // 경로는 실제 경로에 맞춰 조정
import { queryKeys } from "@/constants/queryKeys";
import type { ApiError, ApiErrorBody } from "@/types/error";
import type {
  DeleteGalleryRequest,
  DeleteGalleryResponse,
} from "@/types/gallery";

export const useDeleteGallery = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteGalleryResponse,
    ApiError<ApiErrorBody>,
    { archiveId: string | number; payload: DeleteGalleryRequest }
  >({
    mutationFn: ({ archiveId, payload }) =>
      deleteGalleryApi(archiveId, payload),
    onSuccess: (_data, vars) => {
      try {
        const archiveId = vars?.archiveId;

        queryClient.invalidateQueries({ queryKey: ["gallery"] });

        if (archiveId !== undefined && archiveId !== null) {
          const aidStr = String(archiveId);

          queryClient.invalidateQueries({
            predicate: (query) => {
              const k = query.queryKey;
              if (!Array.isArray(k) || k.length === 0) return false;
              if (k[0] !== "gallery") return false;

              return k.some((part) => String(part) === aidStr);
            },
          });
        }

        queryClient.invalidateQueries({ queryKey: queryKeys.archive.all });
      } catch (err) {
        console.warn("useDeleteGallery onSuccess invalidate error:", err);
      }
    },
    onError: (error) => {
      console.error("useDeleteGallery error:", error);
    },
  });
};
