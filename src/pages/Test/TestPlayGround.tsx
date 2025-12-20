import { useState } from "react";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { BtnBasic, BtnIcon } from "@/components/common/Button/Btn";
import SelectBox from "@/components/common/Button/SelectBox";
import BackNavigator from "@/components/common/BackNavigator";

type ListOption = { label: string; value: string };

const LIST_OPTIONS: ListOption[] = [
  { label: "전체", value: "all" },
  { label: "좋아요 순", value: "like" },
  { label: "조회수 순", value: "popular" },
];

export default function ButtonsPlayground() {
  const [cntGray, setCntGray] = useState(0);
  const [cntBlue, setCntBlue] = useState(0);
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("all");

  return (
    <div className="px-10 py-8 space-y-8 bg-surface-bg text-text-highest">
      <div>
        <BackNavigator label="커뮤니티 보기" onClick={() => history.back()} />
      </div>
      <h2 className="typo-h3-semibold">Btn 공용 컴포넌트 테스트</h2>

      <section className="space-y-3">
        <h3 className="typo-body2-semibold">1) 기본</h3>
        <div className="flex gap-3 items-center">
          <BtnBasic variant="gray" onClick={() => setCntGray((c) => c + 1)}>
            기본 버튼 ({cntGray})
          </BtnBasic>
          <BtnBasic variant="blue" onClick={() => setCntBlue((c) => c + 1)}>
            기본 버튼 ({cntBlue})
          </BtnBasic>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="typo-body2-semibold">
          2) 사이즈/패딩 커스텀 (twMerge 동작 확인)
        </h3>
        <div className="flex gap-3 items-center">
          <BtnBasic variant="gray" onClick={() => {}}>
            기본 버튼
          </BtnBasic>

          <BtnBasic
            variant="gray"
            onClick={() => {}}
            className="h-[56px] px-[40px] py-[14px] rounded-[10px]"
          >
            큰 버튼
          </BtnBasic>
          <BtnBasic variant="blue" onClick={() => {}}>
            기본 버튼
          </BtnBasic>
          <BtnBasic
            variant="blue"
            onClick={() => {}}
            className="h-[56px] px-[40px] py-[14px] rounded-[10px]"
          >
            큰 버튼
          </BtnBasic>
          <BtnBasic onClick={() => {}} disabled>
            기본 비활성화 버튼
          </BtnBasic>
          <BtnBasic onClick={() => {}} disabled>
            블루 비활성화 버튼
          </BtnBasic>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="typo-body2-semibold">3) 색상 커스텀 (토큰 활용)</h3>
        <div className="flex gap-3 items-center">
          <BtnBasic
            onClick={() => {}}
            className="bg-red-400 text-text-lowest hover:bg-red-300 active:bg-red-200"
          >
            Primary
          </BtnBasic>
          <BtnBasic
            onClick={() => {}}
            className="bg-surface-container-20 text-text-highest hover:bg-surface-container-30"
          >
            Neutral
          </BtnBasic>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="typo-body2-semibold">4) 아이콘 추가</h3>
        <div className="flex gap-3 items-center">
          <BtnIcon
            onClick={() => {}}
            startIcon={<Pencil className="w-[16.5px] h-[17.5px]" />}
          >
            버튼명
          </BtnIcon>
          <BtnIcon
            // selected={isSelected}
            onClick={() => setOpen((v) => !v)}
            endIcon={
              open ? (
                <ChevronUp className="w-[24px] h-[24px] text-color-primary" />
              ) : (
                <ChevronDown className="w-[24px] h-[24px]" />
              )
            }
            className={open ? "border-color-primary border-[2px]" : ""}
          >
            버튼명
          </BtnIcon>
          <BtnIcon
            disabled={true}
            onClick={() => {}}
            startIcon={<Pencil className="w-[16.5px] h-[17.5px]" />}
          >
            버튼명
          </BtnIcon>
        </div>
      </section>
      <section className="space-y-3">
        <h3 className="typo-body2-semibold">5) List</h3>
        <div className="flex gap-3 items-center">
          <SelectBox
            options={LIST_OPTIONS}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      </section>
    </div>
  );
}
