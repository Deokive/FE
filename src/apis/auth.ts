// 로그인
export type RequestSignupDto = {
  email: string;
  nickname: string;
  password: string;
};

export type ResponseSignupDto = {
  id: number;
  email: string;
  role: string;
  nickname: string;
  createdAt: Date;
  lastModifiedAT: Date;
};

// 회원가입
export type RequestSigninDto = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type ResponseSigninDto = {
  accessToken: string;
  refreshToken: string;
};
