import { useState } from "react";

import BtnGray from "@/components/common/Btn";

export default function ButtonsPlayground() {
  const [cnt, setCnt] = useState(0);

  return (
    <div className="px-10 py-8 space-y-8 bg-surface-bg text-text-highest">
      <h2 className="typo-h3-semibold">Btn 공용 컴포넌트 테스트</h2>

      <section className="space-y-3">
        <h3 className="typo-body2-semibold">1) 기본</h3>
        <BtnGray onClick={() => setCnt((c) => c + 1)}>
          기본 버튼 ({cnt})
        </BtnGray>
      </section>

      <section className="space-y-3">
        <h3 className="typo-body2-semibold">
          2) 사이즈/패딩 커스텀 (twMerge 동작 확인)
        </h3>
        <div className="flex gap-3 items-center">
          <BtnGray onClick={() => {}}>기본 버튼</BtnGray>
          <BtnGray
            onClick={() => {}}
            className="h-[56px] px-[40px] py-[14px] rounded-[10px]"
          >
            큰 버튼
          </BtnGray>
          <BtnGray onClick={() => {}} disabled>
            비활성화 버튼
          </BtnGray>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="typo-body2-semibold">3) 색상 커스텀 (토큰 활용)</h3>
        <div className="flex gap-3 items-center">
          <BtnGray
            onClick={() => {}}
            className="bg-brand-blue-400 text-text-lowest hover:bg-brand-blue-300"
          >
            Primary
          </BtnGray>
          <BtnGray
            onClick={() => {}}
            className="bg-surface-container-20 text-text-highest hover:bg-surface-container-30"
          >
            Neutral
          </BtnGray>
        </div>
      </section>
    </div>
  );
}
