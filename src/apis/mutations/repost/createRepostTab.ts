import axiosInstance from "@/apis/axios";

export type CreateRepostTabPayload = {
  title?: string;
  // 서버 스펙에 따라 다른 필드가 있으면 추가
};

export async function createRepostTabApi(
  archiveId: string | number,
  payload: CreateRepostTabPayload = {}
) {
  if (archiveId === undefined || archiveId === null)
    throw new Error("archiveId가 필요합니다.");
  const url = `/api/v1/repost/tabs/${String(archiveId)}`;
  const res = await axiosInstance.post(url, payload, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
  return res.data;
}

export default createRepostTabApi;
