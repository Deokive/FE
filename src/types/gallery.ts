import type { DefaultPaginationResponse } from "@/types/pagination";

export type DeleteGalleryRequest = {
  galleryIds: number[];
};

export type DeleteGalleryResponse = void;

export type GalleryItem = {
  id: number | string;
  thumbnailUrl?: string | null;
  originalUrl?: string | null;
  fileName?: string;
  createdAt?: string;
  lastModifiedAt?: string;
};

export type GalleryListResponse = {
  title?: string;
  content: GalleryItem[];
  page: DefaultPaginationResponse;
};

export type FetchGalleryParams = {
  archiveId: string | number;
  page?: number; // 0-based
  size?: number;
  sort?: string;
  direction?: "ASC" | "DESC";
};

export type PostGalleryRequest = {
  fileIds: number[];
};

export type PostGalleryResponse = {
  createdCount?: number;
  archiveId?: number;
};

export type PatchGalleryTitlePayload = {
  title: string;
};
