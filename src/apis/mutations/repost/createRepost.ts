import axiosInstance from "@/apis/axios";

export type CreateRepostPayload = {
  postId: number;
};

export async function createRepostApi(
  tabId: string | number,
  payload: CreateRepostPayload
) {
  if (tabId === undefined || tabId === null)
    throw new Error("tabId가 필요합니다.");
  const url = `/api/v1/repost/${String(tabId)}`;
  const res = await axiosInstance.post(url, payload, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
  return res.data;
}

export default createRepostApi;
