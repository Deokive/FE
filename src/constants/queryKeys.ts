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
} as const;
