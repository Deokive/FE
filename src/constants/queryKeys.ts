export const queryKeys = {
  ticket: {
    all: ["ticket"] as const,
    detail: (ticketId: number) => ["ticket", ticketId] as const,
  },
  ticketBook: {
    all: ["ticketBook"] as const,
    detail: (ticketBookId: number) => ["ticketBook", ticketBookId] as const,
  },
  diary: {
    all: ["diary"] as const,
    detail: (diaryId: number) => ["diary", diaryId] as const,
  },
  diaryBook: {
    all: ["diaryBook"] as const,
    detail: (archiveId: number) => ["diaryBook", archiveId] as const,
  },
  friend: {
    all: ["friend"] as const,
    status: (friendId: number) => ["friend", "status", friendId] as const,
    sendList: (
      type: string,
      lastId?: number,
      lastCreatedAt?: string,
      size?: number
    ) => ["friend", "sendList", type, lastId, lastCreatedAt, size] as const,
    list: (lastFriendId?: number, lastAcceptedAt?: string, size?: number) =>
      ["friend", "list", lastFriendId, lastAcceptedAt, size] as const,
  },
} as const;
