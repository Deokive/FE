export type EventProps = {
  onClose: () => void;
  startDate: Date | null;
};

export type DateData = {
  startDate: Date | null;
  endDate: Date | null;
  isAllDay: boolean;
};

export type ColorData = {
  name: string;
  color: string;
} | null;
