import { useQuery } from "@tanstack/react-query";
import {
  getFriendList,
  getSendFriendList,
  getStatusFriend,
} from "@/apis/queries/friend/getFriend";
import { queryKeys } from "@/constants/queryKeys";
import type {
  GetFriendListRequest,
  GetFriendListResponse,
  GetSendFriendListRequest,
  GetSendFriendListResponse,
  GetStatusFriendRequest,
  GetStatusFriendResponse,
} from "@/types/friend";

export const useGetFriendList = (params: GetFriendListRequest) => {
  return useQuery<GetFriendListResponse>({
    queryKey: queryKeys.friend.list(
      params.lastFriendId,
      params.lastAcceptedAt,
      params.size
    ),
    queryFn: () => getFriendList(params),
    retry: false,
  });
};

export const useGetStatusFriend = (params: GetStatusFriendRequest) => {
  return useQuery<GetStatusFriendResponse>({
    queryKey: queryKeys.friend.status(params.friendId),
    queryFn: () => getStatusFriend(params),
    enabled: !!params.friendId,
    retry: false,
  });
};

export const useGetSendFriendList = (params: GetSendFriendListRequest) => {
  return useQuery<GetSendFriendListResponse>({
    queryKey: queryKeys.friend.sendList(
      params.type,
      params.lastId,
      params.lastCreatedAt,
      params.size
    ),
    queryFn: () => getSendFriendList(params),
    retry: false,
  });
};
