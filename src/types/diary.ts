type file = {
  fileId: number;
  mediaRole: string;
  sequence: number;
};

export type CreateDiaryRequest = {
  title: string;
  content: string;
  recordedAt: string;
  color: string;
  visibility: string;
  files: file[];
};
