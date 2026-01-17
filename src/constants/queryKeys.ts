export const queryKeys = {
  ticket: {
    all: ["ticket"] as const,
    detail: (ticketId: number) => ["ticket", ticketId] as const,
  },
  ticketBook: {
    all: ["ticketBook"] as const,
    detail: (ticketBookId: number) => ["ticketBook", ticketBookId] as const,
  },
} as const;
