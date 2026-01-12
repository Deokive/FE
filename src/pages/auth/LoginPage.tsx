import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BtnBasic } from "@/components/common/Button/Btn";
import CheckboxIcon from "@/assets/Icon/CheckboxIcon";
import { useState } from "react";
import googleIcon from "@/assets/Icon/Google.svg";
import kakaoIcon from "@/assets/Icon/kakao.svg";
import naverIcon from "@/assets/Icon/naver.svg";

const schema = z.object({
  email: z.email({ message: "이메일 형식이 올바르지 않습니다." }),
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
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur", //touched 되었는지 여부 확인
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  const [checked, setChecked] = useState<boolean>(false);

  const handleLogin = () => {
    console.log("로그인 시도");
  };

  const handleSocialLogin = (provider: string) => {
    switch (provider) {
      case "google":
        // window.location.href = "https://www.google.com";
        console.log("google 로그인 시도");
        break;
      case "kakao":
        // window.location.href = "https://www.kakao.com";
        console.log("kakao 로그인 시도");
        break;
      case "naver":
        // window.location.href = "https://www.naver.com";
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
              className="w-full h-[65px] p-5 rounded-xl border-2 border-solid border-border-mid
            typo-h2 text-color-highest placeholder:text-color-low"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="w-full h-[65px] p-5 rounded-xl border-2 border-solid border-border-mid 
            typo-h2 text-color-highest placeholder:text-color-low"
            />
            <div className="flex items-center gap-2.5">
              <button onClick={() => setChecked(!checked)}>
                <CheckboxIcon checked={checked} />
              </button>
              <span className="typo-h2 text-color-mid">로그인 상태 유지</span>
            </div>
          </div>
          {/* 로그인 버튼  & 회원가입/아이디비밀번호 찾기 */}
          <div className="w-full flex flex-col gap-8">
            <BtnBasic
              variant="blue"
              onClick={handleLogin}
              disabled={isSubmitting}
              className="w-full h-[65px]"
            >
              로그인
            </BtnBasic>
            <div className="w-full flex gap-2.5 justify-center items-center typo-h2 text-color-mid">
              <button onClick={() => {}} className="flex-1 cursor-pointer">
                <p>회원가입</p>
              </button>
              <p>|</p>
              <button onClick={() => {}} className="flex-1 cursor-pointer">
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
