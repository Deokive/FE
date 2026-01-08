type SignupStepBarProps = {
  currentStep: number;
  totalSteps?: number;
};

const SignupStepBar = ({ currentStep, totalSteps = 3 }: SignupStepBarProps) => {
  const steps = [
    { step: 1, label: "약관 동의" },
    { step: 2, label: "정보 입력" },
    { step: 3, label: "인증 번호 받기" },
  ];

  return (
    <div className="w-[676px] flex justify-center">
      {steps.map((item, index) => (
        <div
          key={item.step}
          className="max-w-67.5 min-w-[136px] flex flex-col items-center gap-4"
        >
          {/* 스텝 원형 + 연결선 */}
          <div
            className={`${
              index === 2
                ? "flex items-center justify-start gap-4"
                : "pl-4 flex items-center gap-4"
            }`}
          >
            {/* ✅ 겹치는 원 - relative 컨테이너 */}
            <div className="relative w-[50px] h-[50px] flex items-center justify-center">
              {/* 바깥 원 (반투명) */}
              <div
                className={`absolute inset-0 rounded-full transition-colors ${
                  currentStep == item.step
                    ? "bg-brand-blue-300/25"
                    : "bg-surface-container-40/25"
                }`}
              />
              {/* 안쪽 원 (불투명) */}
              <div
                className={`relative w-9 h-9 rounded-full flex items-center justify-center typo-h2-semibold transition-colors ${
                  currentStep == item.step
                    ? "bg-brand-blue-400 text-white"
                    : "bg-surface-container-30 text-white"
                }`}
              >
                {item.step}
              </div>
            </div>

            {/* 연결선 (마지막 스텝 제외) */}
            {index < steps.length - 1 && (
              <div className={`w-47 bg-[#7D9AB2]`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="47"
                  height="1"
                  viewBox="0 0 711 1"
                  fill="none"
                >
                  <path
                    d="M0 0.5H711"
                    stroke="#7D9AB2"
                    stroke-dasharray="2 2"
                  />
                </svg>
              </div>
            )}
          </div>
          {/* 라벨 내용 */}
          <div className="w-full">
            <p
              className={`w-full typo-h2-semibold text-left ${
                currentStep == item.step
                  ? "text-color-primary"
                  : "text-color-low"
              }`}
            >
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SignupStepBar;
