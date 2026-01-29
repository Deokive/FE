import {
  useGetFriendListInfinite,
  useGetSendFriendListInfinite,
} from "@/apis/queries/friend/useGetFriend";
import {
  usePostAcceptFriend,
  usePostRejectFriend,
} from "@/apis/mutations/friend/usePostFriend";
import {
  useDeleteSendFriend,
  useDeleteCancelFriend,
} from "@/apis/mutations/friend/useDeleteFriend";
import { FriendRequestType } from "@/enums/friendRequestType";
import { FriendTabId } from "@/enums/friendTabId";

export const useFriendsData = () => {
  const friendsQuery = useGetFriendListInfinite({});
  const requestsQuery = useGetSendFriendListInfinite({
    type: FriendRequestType.RECEIVED,
  });
  const pendingQuery = useGetSendFriendListInfinite({
    type: FriendRequestType.SENT,
  });

  const { mutate: acceptFriend } = usePostAcceptFriend();
  const { mutate: rejectFriend } = usePostRejectFriend();
  const { mutate: deleteFriend } = useDeleteSendFriend();
  const { mutate: cancelFriend } = useDeleteCancelFriend();

  const tabDataMap = {
    [FriendTabId.REQUESTS]: {
      data:
        requestsQuery.data?.pages.flatMap((page) => page.friends ?? []) ?? [],
      query: requestsQuery,
      role: "request" as const,
      handlers: {
        onAccept: (id: string) => acceptFriend({ friendId: Number(id) }),
        onDecline: (id: string) => rejectFriend({ friendId: Number(id) }),
      },
    },
    [FriendTabId.FRIENDS]: {
      data:
        friendsQuery.data?.pages.flatMap((page) => page.friends ?? []) ?? [],
      query: friendsQuery,
      role: "friend" as const,
      handlers: {
        onDelete: (id: string) => deleteFriend({ friendId: Number(id) }),
      },
    },
    [FriendTabId.PENDING]: {
      data:
        pendingQuery.data?.pages.flatMap((page) => page.friends ?? []) ?? [],
      query: pendingQuery,
      role: "pending" as const,
      handlers: {
        onDecline: (id: string) => cancelFriend({ friendId: Number(id) }),
      },
    },
  };

  return { tabDataMap };
};
