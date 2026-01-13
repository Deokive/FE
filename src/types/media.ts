export type MediaItem = {
  id: string;
  url: string;
  type: "image" | "video";
  isRepresentative?: boolean;
};
