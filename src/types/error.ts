import type { AxiosError } from "axios";

// 일단 swagger에는 없어서 임시로 반환 값에 따라 작성 추후 변경될 수도 있음
export type ApiErrorBody = {
  status: string;
  error: string;
  message: string;
};

export type ApiError<T = ApiErrorBody> = AxiosError<T>;
