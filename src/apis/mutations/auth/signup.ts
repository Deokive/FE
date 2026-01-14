import { axiosInstance } from "@/apis/axios";
import type {
  SendVerificationCodeRequest,
  SendVerificationCodeResponse,
  SignupRequest,
  SignupResponse,
} from "@/types/auth/signup";

/**
 * 회원가입 API
 * POST /api/v1/auth/register
 */
export const registerUser = async (
  data: SignupRequest
): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>(
    "/api/v1/auth/register", // ✅ 직접 경로 지정
    data
  );
  return response.data;
};

export const sendVerificationCode = async (
  data: SendVerificationCodeRequest
): Promise<SendVerificationCodeResponse> => {
  const response = await axiosInstance.post<SendVerificationCodeResponse>(
    "/api/v1/auth/email/send", // ✅ 실제 엔드포인트로 변경
    null,
    {
      params: {
        // ✅ query parameter로 전달
        email: data.email,
      },
    }
  );
  return response.data;
};
