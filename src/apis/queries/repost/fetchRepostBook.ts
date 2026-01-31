import axiosInstance from "@/apis/axios";

export type RepostBookQueryParams = {
  page?: number; // 0-based
  size?: number;
  sort?: string;
  direction?: "ASC" | "DESC";
  tabId?: number | null;
};

export type RepostBookResponse = {
  title?: string;
  tabId?: number;
  tab?: { id: number; title: string; repostBookId?: number }[];
  content?: Array<{
    id: number;
    postId?: number;
    title?: string;
    thumbnailUrl?: string | null;
    repostTabId?: number;
    createdAt?: string;
  }>;
  page?: {
    size?: number;
    pageNumber?: number;
    totalElements?: number;
    totalPages?: number;
    hasPrev?: boolean;
    hasNext?: boolean;
    empty?: boolean;
  };
};

/**
 * GET /api/v1/repost/{archiveId}
 * query params: page (0-based), size, sort, direction, tabId
 *
 * signal: optional AbortSignal (요청 취소용)
 */
export async function fetchRepostBookApi(
  archiveId: string | number,
  params: RepostBookQueryParams = {},
  signal?: AbortSignal
): Promise<RepostBookResponse> {
  if (archiveId === undefined || archiveId === null) {
    throw new Error("archiveId가 필요합니다.");
  }
  const id = String(archiveId);
  const query: Record<string, any> = {};
  if (params.page !== undefined) query.page = params.page;
  if (params.size !== undefined) query.size = params.size;
  if (params.sort) query.sort = params.sort;
  if (params.direction) query.direction = params.direction;
  if (params.tabId !== undefined && params.tabId !== null)
    query.tabId = params.tabId;

  const res = await axiosInstance.get(`/api/v1/repost/${id}`, {
    params: query,
    // axios 1.2+ 에서 signal 지원. 버전 확인하세요.
    signal,
  });
  return res.data;
}

export default fetchRepostBookApi;
