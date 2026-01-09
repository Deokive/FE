export type Ticket = {
  id: string;
  imageUrl?: string | null;
  isRepresentative?: boolean;
  eventName: string; // 필수
  dateTime?: string | null;
  place?: string | null;
  seat?: string | null;
  casting?: string | null;
  rating?: number | null;
  review?: string | null;
  createdAt?: string | null;
};
