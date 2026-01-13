import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BtnBasic } from "@/components/common/Button/Btn";
import CheckboxIcon from "@/assets/icon/CheckboxIcon";
import { useState } from "react";
import googleIcon from "@/assets/icon/Google.svg";
import kakaoIcon from "@/assets/icon/kakao.svg";
import naverIcon from "@/assets/icon/naver.svg";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .max(16, { message: "비밀번호는 16자 이하이어야 합니다." }),
});

type FormFields = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting }, // error
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  const navigate = useNavigate();

  const [checked, setChecked] = useState<boolean>(false);
  //로그인 에러 상태
  const [loginError, setLoginError] = useState<string>("");

  // 입력여부 확인을 위한 watch & isFormValid
  const email = watch("email");
  const password = watch("password");
  const isFormValid = email.length > 0 && password.length > 0;

  const handleLogin = async () => {
    try {
      console.log("로그인 시도");

      // const response = await apiClient.post('/auth/login', { email, password });

      // 테스트용
      const isSuccess = true;

      if (!isSuccess) {
        throw new Error("로그인 실패");
      }

      // 성공 시 처리
      console.log("로그인 성공", { email, password, checked });
      // navigate('/') 등
    } catch (error) {
      // ✅ 로그인 실패 시 에러 메시지 설정
      setLoginError(
        "아이디(이메일) 또는 비밀번호가 일치하지 않습니다. 올바른 정보를 입력해주세요."
      );
    }
  };

  // ✅ 입력 변경 시 에러 초기화
  const handleInputChange = () => {
    if (loginError) {
      setLoginError("");
    }
  };

  const handleSocialLogin = (provider: string) => {
    switch (provider) {
      case "google":
        console.log("google 로그인 시도");
        break;
      case "kakao":
        console.log("kakao 로그인 시도");
        break;
      case "naver":
        console.log("naver 로그인 시도");
    }
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      className="pt-15 w-full h-screen flex flex-col items-center gap-15 bg-surface-container-10"
    >
      {/* 헤더 */}
      <p className="typo-h1 text-color-high">DEOKIVE</p>
      {/* 로그인 폼 */}
      <div className="w-[951px] flex flex-col items-start gap-25 px-30 py-16 bg-surface-bg rounded-xl">
        {/* 이메일 & 비밀번호 & 로그인 상태 유지 버튼 */}
        <div className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-col gap-8">
            <input
              {...register("email")}
              type="email"
              placeholder="이메일을 입력해주세요"
              onChange={(e) => {
                register("email").onChange(e);
                handleInputChange();
              }}
              className={`w-full h-[65px] p-5 rounded-xl border-2 border-solid 
                typo-h2 text-color-highest placeholder:text-color-low outline-none
                ${loginError ? "border-red-500" : "border-border-mid"}
                focus:border-brand-blue-400`}
            />
            <input
              {...register("password")}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) => {
                register("password").onChange(e);
                handleInputChange();
              }}
              className={`w-full h-[65px] p-5 rounded-xl border-2 border-solid 
                typo-h2 text-color-highest placeholder:text-color-low outline-none
                ${loginError ? "border-red-500" : "border-border-mid"}
                focus:border-brand-blue-400`}
            />

            {loginError && (
              <p className="typo-h3 text-color-accent">{loginError}</p>
            )}

            <div className="flex items-center gap-2.5">
              <button type="button" onClick={() => setChecked(!checked)}>
                <CheckboxIcon checked={checked} />
              </button>
              <span className="typo-h2 text-color-mid">로그인 상태 유지</span>
            </div>
          </div>
          {/* 로그인 버튼  & 회원가입/아이디비밀번호 찾기 */}
          <div className="w-full flex flex-col gap-8">
            <BtnBasic
              onClick={() => handleLogin()}
              variant="blue"
              disabled={!isFormValid || isSubmitting || !!loginError}
              className="w-full h-[65px]"
            >
              로그인
            </BtnBasic>

            <div className="w-full flex gap-2.5 justify-center items-center typo-h2 text-color-mid">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="flex-1 cursor-pointer"
              >
                <p>회원가입</p>
              </button>
              <p>|</p>
              <button
                type="button"
                onClick={() => navigate("/password-find")}
                className="flex-1 cursor-pointer"
              >
                <p>아이디/비밀번호 찾기</p>
              </button>
            </div>
          </div>
        </div>
        {/* 소셜로그인 버튼 */}
        <div className="w-full flex flex-col gap-8">
          {/* 또는 부분 */}
          <div className="flex gap-2.5 justify-center items-center typo-h2 text-color-mid">
            <div className="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="324.5"
                height="1"
                viewBox="0 0 711 1"
                fill="none"
              >
                <path d="M0 0.5H711" stroke="#7D9AB2" strokeDasharray="2 2" />
              </svg>
            </div>
            <p>또는</p>
            <div className="flex-1">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="324.5"
                  height="1"
                  viewBox="0 0 711 1"
                  fill="none"
                >
                  <path d="M0 0.5H711" stroke="#7D9AB2" strokeDasharray="2 2" />
                </svg>
              </div>
            </div>
          </div>
          {/* 소셜로그인 아이콘 */}
          <div className="flex justify-center gap-37.5">
            <div
              className="flex p-[9.3px] justify-center items-center rounded-full shadow-[0_0_4px_0_#CBD5DF] cursor-pointer"
              onClick={() => handleSocialLogin("google")}
            >
              <img src={googleIcon} alt="google" />
            </div>
            <div
              className="w-16 h-16 flex px-[10.6px] justify-center items-center rounded-full bg-[#FEE500] cursor-pointer"
              onClick={() => handleSocialLogin("kakao")}
            >
              <img src={kakaoIcon} alt="kakao" />
            </div>
            <div
              className="w-16 h-16 flex justify-center items-center rounded-full bg-[#03C75A] cursor-pointer"
              onClick={() => handleSocialLogin("naver")}
            >
              <img src={naverIcon} alt="naver" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
