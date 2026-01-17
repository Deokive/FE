import type { FileCompleteResponse } from "./file";

type file = {
  fileId: number;
  mediaRole: string;
  sequence: number;
};

//다이어리 생성 요청 타입
export type CreateDiaryRequest = {
  title: string;
  content: string;
  recordedAt: string;
  color: string;
  visibility: string;
  files: file[];
};

// ✅ 일기 상세 조회 응답 타입
export type DiaryDetailResponse = {
  id: number;
  title: string;
  content: string;
  recordedAt: string; // "2026-01-17" 형식
  color: string;
  visibility: "PUBLIC" | "PRIVATE";
  diaryBookId: number;
  createdBy: number; // ✅ 작성자 ID
  files: FileCompleteResponse[];
};
