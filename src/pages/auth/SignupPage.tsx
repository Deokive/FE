import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import SignupStepBar from "@/components/auth/signup/SignupStepBar";
import type { Agreement } from "@/types/auth/signup";
import SignupStep1 from "@/components/auth/signup/signupStep1";
import SignupStep2 from "@/components/auth/signup/signupStep2";

// ✅ Step 2 스키마 (이메일, 비밀번호, 닉네임)
export const schema = z
  .object({
    emailId: z.string(),
    emailDomain: z.string(),
    password: z
      .string()
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, {
        message:
          "8 ~ 16자 이내 영문, 숫자, 특수문자를 모두 포함하여 입력해주세요.",
      }),
    passwordCheck: z.string(),
    nickname: z
      .string()
      .min(2, { message: "2~10자 이내 한글, 영어, 숫자 중에 작성해 주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  })
  // ✅ 이메일 합쳐서 검증
  .refine(
    (data) => {
      const email = `${data.emailId}@${data.emailDomain}`;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    {
      message: "유효한 이메일 주소를 입력해주세요.",
      path: ["emailId"], // 에러 표시 위치
    }
  );

export type FormFields = z.infer<typeof schema>;

const agreements: Agreement[] = [
  { id: "all", label: "전체 동의", required: false },
  { id: "terms", label: "[필수] 이용약관 동의", required: true },
  { id: "privacy", label: "[필수] 개인정보 수집 및 이용 동의", required: true },
];

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3; // 총 단계 수

  // Step 1: 약관 동의 상태
  const [checkedAgreements, setCheckedAgreements] = useState<
    Record<string, boolean>
  >({
    all: false,
    terms: false,
    privacy: false,
  });
  // Step 2: 이메일 리스트

  // ✅ Step 3: 인증 관련 상태
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 발송 여부

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormFields>({
    defaultValues: {
      emailId: "",
      emailDomain: "",
      password: "",
      passwordCheck: "",
      nickname: "",
    },
    resolver: zodResolver(schema), // 유효성 검사 규칙
    mode: "onBlur", // ✅ onBlur로 설정 (onChange 아님!)
  });

  // email 조합 완성
  // 이메일 합쳐서 사용 (Step 3에서 보여줄 때)
  const emailId = watch("emailId");
  const emailDomain = watch("emailDomain");
  const email = emailId && emailDomain ? `${emailId}@${emailDomain}` : "";

  // ✅ 약관 동의 핸들러
  const handleAgreementChange = (id: string) => {
    if (id === "all") {
      const newValue = !checkedAgreements.all;
      setCheckedAgreements({
        all: newValue,
        terms: newValue,
        privacy: newValue,
      });
    } else {
      const newChecked = {
        ...checkedAgreements,
        [id]: !checkedAgreements[id],
      };
      // 전체 동의 체크 상태 업데이트
      newChecked.all = newChecked.terms && newChecked.privacy;
      setCheckedAgreements(newChecked);
    }
  };

  // ✅ 필수 약관 동의 여부 확인
  const isRequiredAgreed = checkedAgreements.terms && checkedAgreements.privacy;

  // ✅ 인증번호 발송 API 호출
  const handleSendCode = async () => {
    const isEmailValid = await trigger(["emailId", "emailDomain"]); // 이메일 유효성 검사
    if (!isEmailValid) return; // 이메일 유효성 검사 실패 시 발송 중단

    // TODO: API 호출 - 인증번호 발송
    console.log("인증번호 발송:", email);
  };

  // ✅ 다음 단계로 이동
  const handleNext = async () => {
    if (step === 1) {
      // Step 1: 필수 약관 동의 확인
      if (isRequiredAgreed) {
        setStep(2);
      }
    } else if (step === 2) {
      // Step 2: 폼 유효성 검사 + 회원가입 API 호출
      const isValid = await trigger([
        "emailId",
        "emailDomain",
        "password",
        "passwordCheck",
        "nickname",
      ]);
      if (isValid) {
        // emailId와 emailDomain을 합쳐서 email로 만들기
        const emailId = watch("emailId");
        const emailDomain = watch("emailDomain");
        const password = watch("password");
        const nickname = watch("nickname");

        const signupData = {
          email: `${emailId}@${emailDomain}`,
          nickname: nickname,
          password: password,
        };

        console.log(signupData);
        setStep(3);
        // 인증번호 자동 발송
        handleSendCode();
      }
    }
  };

  // ✅ 이전 단계로 이동
  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const { passwordCheck, ...rest } = data;
    console.log("회원가입 데이터:", rest);

    // TODO: API 호출 - 회원가입
  };

  return (
    <div className="w-full h-full bg-[#F4F5F9]">
      <div className="max-w-[951px] mx-auto py-15 flex flex-col items-center justify-center gap-15">
        {/* 헤더 */}
        <p className="typo-h1 text-color-highest">회원가입</p>
        {/* 단계 표시 */}
        {/* ✅ Step Bar 컴포넌트 사용 */}
        <SignupStepBar currentStep={step} />

        <div className="w-full px-30 py-16 rounded-xl bg-white flex flex-col items-center justify-center">
          {/* ✅ 폼 컨테이너 */}
          <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
            {step === 1 && (
              <SignupStep1
                checkedAgreements={checkedAgreements}
                onAgreementChange={handleAgreementChange}
                onClick={handleNext}
              />
            )}
            {step === 2 && (
              <SignupStep2
                register={register}
                control={control}
                errors={errors}
                trigger={trigger}
                onClick={handleNext}
                isValid={isValid}
                watch={watch}
              />
            )}
            {step === 3 && <div></div>}
          </form>
        </div>

        <div className="w-[450px] bg-white rounded-2xl shadow-lg p-10">
          {/* ✅ 헤더 */}
          <div className="flex items-center justify-between mb-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="p-2 hover:bg-surface-container-10 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-color-high" />
              </button>
            ) : (
              <div className="w-10" />
            )}
            <h1 className="typo-h1 text-color-highest">회원가입</h1>
            <div className="w-10" />
          </div>

          {/* ✅ 진행 바 */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-brand-blue-500" : "bg-border-low"
                }`}
              />
            ))}
          </div>

          {/* ✅ 단계 표시 */}
          <p className="typo-body2 text-color-mid mb-6">
            Step {step} / {totalSteps}
          </p>

          <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
            {/* ✅ Step 1: 약관 동의 */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <h2 className="typo-h2-semibold text-color-highest mb-2">
                  서비스 이용약관에 동의해주세요
                </h2>
                <div className="flex flex-col gap-3">
                  {agreements.map((agreement) => (
                    <div
                      key={agreement.id}
                      className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors ${
                        agreement.id === "all"
                          ? "bg-brand-blue-100 border border-brand-blue-300"
                          : "bg-surface-container-10 hover:bg-surface-container-20"
                      }`}
                      onClick={() => handleAgreementChange(agreement.id)}
                    >
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                          checkedAgreements[agreement.id]
                            ? "bg-brand-blue-500"
                            : "bg-white border-2 border-border-mid"
                        }`}
                      >
                        {checkedAgreements[agreement.id] && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span
                        className={`typo-body1 ${
                          agreement.id === "all"
                            ? "text-color-highest font-semibold"
                            : "text-color-high"
                        }`}
                      >
                        {agreement.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ Step 2: 이메일, 비밀번호, 닉네임 */}
            {step === 2 && <div></div>}

            {/* ✅ Step 3: 인증번호 입력 */}
            {step === 3 && (
              <div className="flex flex-col gap-4">
                <h2 className="typo-h2-semibold text-color-highest mb-2">
                  이메일 인증을 완료해주세요
                </h2>
                <p className="typo-body1 text-color-mid">
                  <span className="text-brand-blue-500 font-semibold">
                    {email}
                  </span>
                  으로 인증번호를 발송했습니다.
                </p>
                <div className="flex flex-col gap-2">
                  <label className="typo-body2 text-color-high">인증번호</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleSendCode}
                      className="px-4 h-12 bg-surface-container-20 text-color-high typo-body1 rounded-lg
                      hover:bg-surface-container-30 transition-colors
                      disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      인증하기
                    </button>
                  </div>
                </div>
                <p className="typo-body2 text-color-mid">
                  인증번호가 오지 않았나요?{" "}
                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="text-brand-blue-500 underline disabled:opacity-50"
                  >
                    재발송
                  </button>
                </p>
              </div>
            )}

            {/* ✅ 버튼 영역 */}
            <div className="mt-8">
              {step === 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isRequiredAgreed}
                  className="w-full h-12 bg-brand-blue-500 text-white typo-h2-semibold rounded-lg
                  hover:bg-brand-blue-600 transition-colors
                  disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  다음
                </button>
              )}
              {step === 2 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full h-12 bg-brand-blue-500 text-white typo-h2-semibold rounded-lg
                  hover:bg-brand-blue-600 transition-colors"
                >
                  다음
                </button>
              )}
              {step === 3 && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-brand-blue-500 text-white typo-h2-semibold rounded-lg
                  hover:bg-brand-blue-600 transition-colors
                  disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "처리 중..." : "회원가입 완료"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
