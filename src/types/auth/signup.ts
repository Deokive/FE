// ✅ 약관 동의 항목
export type Agreement = {
  id: string; // 약관 아이디
  label: string; // 약관 내용
  required: boolean; // 필수 여부
};

// 회원가입 요청
export type SignupRequest = {
  email: string;
  password: string;
  nickname: string;
};

// 회원가입 응답
export type SignupResponse = {
  id: number;
  email: string;
  role: string;
  nickname: string;
  createdAt: string;
  lastModifiedAt: string;
};

export type SendVerificationCodeRequest = {
  email: string;
};

export type SendVerificationCodeResponse = {
  message: string;
};
