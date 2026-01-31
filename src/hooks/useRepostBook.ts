import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import fetchRepostBookApi from "@/apis/queries/repost/fetchRepostBook";
import type {
  RepostBookQueryParams,
  RepostBookResponse,
} from "@/apis/queries/repost/fetchRepostBook";

export function useRepostBook(
  archiveId?: string | number,
  params: RepostBookQueryParams = {},
  options: { enabled?: boolean; keepPrevious?: boolean } = {}
) {
  const { enabled = !!archiveId } = options;

  // 쿼리 키: 모든 파트는 문자열로 정규화해서 일관성 유지
  const key = [
    "repostBook",
    String(archiveId ?? ""),
    String(params.tabId ?? "all"),
    String(params.page ?? 0),
    String(params.size ?? 9),
    params.sort ?? "createdAt",
    params.direction ?? "DESC",
  ] as const;

  const queryFn = async (): Promise<RepostBookResponse> => {
    if (archiveId === undefined || archiveId === null) {
      throw new Error("archiveId가 필요합니다.");
    }
    return fetchRepostBookApi(archiveId, params);
  };

  const opts: UseQueryOptions<
    RepostBookResponse,
    unknown,
    RepostBookResponse,
    typeof key
  > = {
    queryKey: key,
    queryFn,
    enabled,
    staleTime: 1000 * 30,
    retry: 1,
    refetchOnMount: "always",
  };

  return useQuery(opts);
}
