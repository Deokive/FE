import CheckboxIcon from "@/assets/Icon/CheckboxIcon";
import { useState } from "react";
import type { Agreement } from "@/types/auth/signup";
import { BtnBasic } from "@/components/common/Button/Btn";

// 약관 데이터
const agreements: Agreement[] = [
  { id: "all", label: "전체 동의", required: false },
  { id: "terms", label: "(필수) 만 14세 이상입니다.", required: true },
  {
    id: "privacy",
    label: "(필수) 개인 정보 수집 및 이용 동의",
    required: true,
  },
];

type SignupStep1Props = {
  checkedAgreements: Record<string, boolean>;
  onAgreementChange: (id: string) => void;
  onClick: () => void;
};

const SignupStep1 = ({
  checkedAgreements,
  onAgreementChange,
  onClick,
}: SignupStep1Props) => {
  return (
    <div className="w-[711px] flex flex-col gap-15 items-start">
      {/* 약관 목록 */}
      <div className="w-full flex flex-col gap-10">
        {agreements.map((agreement, index) => (
          <div key={agreement.id}>
            {/* 전체 동의 (첫 번째 항목) */}

            {index === 0 ? (
              <div className="w-full flex flex-col ">
                <div className="flex items-center gap-2.5">
                  <div onClick={() => onAgreementChange(agreement.id)}>
                    <CheckboxIcon
                      checked={checkedAgreements[agreement.id]}
                      size={24}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="typo-h2 text-color-mid">
                    {agreement.label}
                  </span>
                </div>
                <div className="pt-10">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="711"
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
              </div>
            ) : (
              /* 개별 약관 */
              <div
                className="w-full flex items-center gap-2.5"
                onClick={() => onAgreementChange(agreement.id)}
              >
                <div className="flex items-center gap-5">
                  <CheckboxIcon
                    checked={checkedAgreements[agreement.id]}
                    size={24}
                  />
                  <span className="typo-h2 text-color-mid">
                    {agreement.label}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
        <div>
          <span className="typo-h2 text-color-low">
            다음 단계로 이동하려면 필수 약관에 모두 동의해 주세요.
          </span>
        </div>
        <BtnBasic
          onClick={onClick}
          disabled={!checkedAgreements.all}
          className="w-full h-[65px]"
          variant="blue"
        >
          <p className="typo-h3-semibold text-color-highest">정보 입력</p>
        </BtnBasic>
      </div>
    </div>
  );
};

export default SignupStep1;
