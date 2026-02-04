import { useMutation, useQueryClient } from "@tanstack/react-query";
import patchGalleryTitleApi from "@/apis/mutations/gallery/patchGalleryTitle";
import type { ApiError, ApiErrorBody } from "@/types/error";
import type { PatchGalleryTitlePayload } from "@/types/gallery";

type Vars = {
  archiveId: string | number;
  payload: PatchGalleryTitlePayload;
};

export const usePatchGalleryTitle = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError<ApiErrorBody>, Vars>({
    mutationFn: ({ archiveId, payload }) =>
      patchGalleryTitleApi(archiveId, payload),

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
        console.warn("usePatchGalleryTitle onSuccess invalidate error:", err);
      }
    },

    onError: (error) => {
      console.error("usePatchGalleryTitle error:", error);
    },

    retry: false,
  });
};
