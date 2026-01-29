import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getFriendList,
  getSendFriendList,
  getStatusFriend,
} from "@/apis/queries/friend/getFriend";
import { queryKeys } from "@/constants/queryKeys";
import type { FriendRequestType } from "@/enums/friendRequestType";
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

export const useGetFriendListInfinite = (params: { size?: number }) => {
  return useInfiniteQuery<GetFriendListResponse>({
    queryKey: ["friend", "list", "infinite", params.size],
    queryFn: ({ pageParam }) => {
      const { lastFriendId, lastAcceptedAt } = pageParam as {
        lastFriendId?: number;
        lastAcceptedAt?: string;
      };
      return getFriendList({ ...params, lastFriendId, lastAcceptedAt });
    },
    initialPageParam: {},
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || lastPage.friends.length === 0) return undefined;
      const lastFriend = lastPage.friends[lastPage.friends.length - 1];
      return {
        lastFriendId: lastFriend.userId,
        lastAcceptedAt: lastFriend.acceptedAt,
      };
    },
    retry: false,
  });
};

export const useGetSendFriendListInfinite = (params: {
  type: FriendRequestType;
  size?: number;
}) => {
  return useInfiniteQuery<GetSendFriendListResponse>({
    queryKey: ["friend", "sendList", "infinite", params.type, params.size],
    queryFn: ({ pageParam }) => {
      const { lastId, lastCreatedAt } = pageParam as {
        lastId?: number;
        lastCreatedAt?: string;
      };
      return getSendFriendList({ ...params, lastId, lastCreatedAt });
    },
    initialPageParam: {},
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || lastPage.friends.length === 0) return undefined;
      const lastFriend = lastPage.friends[lastPage.friends.length - 1];
      return {
        lastId: lastFriend.userId,
        lastCreatedAt: lastFriend.createdAt,
      };
    },
    retry: false,
  });
};
