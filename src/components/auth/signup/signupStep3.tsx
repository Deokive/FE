import { BtnBasic } from "@/components/common/Button/Btn";
import { useState } from "react";

type SignupStep3Props = {
  email: string;
  onComplete: () => void; // 회원가입 완료 시 호출될 함수
};

const SignupStep3 = ({ onComplete }: SignupStep3Props) => {
  const [code, setCode] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false); // 인증 성공 여부
  const [isVerifying, setIsVerifying] = useState<boolean>(false); // 인증 중 로딩 상태

  // 인증번호 확인 API 호출
  const handleVerifyCode = async () => {
    try {
      setIsVerifying(true);

      // TODO: 실제 API 호출
      // const response = await verifyEmailCode(code);

      // 임시로 성공 시뮬레이션 (실제로는 API 응답 확인)
      console.log("인증번호 확인", code);

      // API 응답이 성공이면 (예: response === "200" 또는 response.status === 200)
      const isSuccess = true; // 실제로는 API 응답으로 판단

      if (isSuccess) {
        setIsVerified(true);
        console.log("인증 성공!");

        // 자동으로 회원가입 완료 처리 (선택사항)
        // setTimeout(() => {
        //   handleCompleteSignup();
        // }, 1000);
      }
    } catch (error) {
      console.error("인증 실패:", error);
      alert("인증번호가 올바르지 않습니다.");
    } finally {
      setIsVerifying(false);
    }
  };

  // 재전송 API 호출
  const handleResendCode = () => {
    console.log("인증번호 재발송");
    setCode("");
    setIsVerified(false);
  };

  // 인증번호 6자리 입력 여부 확인
  const isCodeComplete = code.length === 6;

  return (
    <div className="w-[711px] flex flex-col items-center gap-15">
      <p className="typo-h2-semibold text-color-highest">
        가입하신 계정으로 인증번호를 발송하였습니다.
      </p>
      <div className="w-full flex justify-between items-center gap-4">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          disabled={isVerified} // 인증 성공 시 입력 비활성화
          className={`flex-1 h-[65px] p-5 rounded-xl border-2 typo-h2 placeholder:text-color-low outline-none
            ${
              isVerified
                ? "border-green-500 bg-green-50 text-color-highest"
                : "border-border-mid text-color-highest focus:border-brand-blue-400"
            }`}
          placeholder="인증번호 입력"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        />
        <BtnBasic
          className="h-[65px]"
          variant="blue"
          onClick={handleVerifyCode}
          disabled={!isCodeComplete || isVerified || isVerifying}
        >
          <p className="typo-h3-semibold">
            {isVerifying ? "확인 중..." : isVerified ? "인증 완료" : "인증하기"}
          </p>
        </BtnBasic>
      </div>

      {isVerified ? (
        <p className="typo-h3 text-green-600">
          ✓ 이메일 인증이 완료되었습니다.
        </p>
      ) : (
        <div className="w-full flex gap-4">
          <p className="typo-h3 text-color-mid">인증번호가 오지 않았나요?</p>
          <p
            onClick={handleResendCode}
            className="typo-h3 text-primary cursor-pointer"
          >
            재전송
          </p>
        </div>
      )}

      {/* <div className="w-full flex gap-4">
        <p className="typo-h3 text-color-mid">인증번호가 오지 않았나요?</p>
        <p
          onClick={handleResendCode}
          className="typo-h3 text-primary cursor-pointer"
        >
          재전송
        </p>
      </div> */}

      <BtnBasic
        className="w-full h-[65px]"
        variant="blue"
        onClick={onComplete}
        disabled={!isVerified} // ✅ 인증 성공해야 활성화
      >
        <p className="typo-h3-semibold">회원가입 완료</p>
      </BtnBasic>
    </div>
  );
};

export default SignupStep3;
