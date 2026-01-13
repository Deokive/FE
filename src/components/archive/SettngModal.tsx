// src/components/archive/SettngModal.tsx
import { useState } from "react";
import RadioButton from "../common/Button/RadioButton";
import { BtnBasic } from "../common/Button/Btn";

type PrivacyOption = "public" | "friend" | "private";

const SettngModal = () => {
  const [privacy, setPrivacy] = useState<PrivacyOption>("public");

  return (
    <div
      className="w-75 px-10 pt-8 pb-6 flex flex-col gap-8 items-start bg-surface-bg rounded-lg shadow-2xl z-50"
      onClick={(e) => {
        e.stopPropagation(); // 모달 클릭 시 이벤트 전파 방지
      }}
    >
      {/* 공개 기준 설정 */}
      <div className="w-55 flex flex-col items-start gap-4">
        <p className="typo-h2-semibold text-color-highest">공개 기준 설정</p>
        <div className="w-full flex flex-col gap-4">
          <RadioButton
            label="전체 공개"
            checked={privacy === "public"}
            onClick={() => {
              setPrivacy("public");
              console.log("전체 공개");
            }}
          />
          <RadioButton
            label="친구 공개"
            checked={privacy === "friend"}
            onClick={() => {
              setPrivacy("friend");
              console.log("친구 공개");
            }}
          />
          <RadioButton
            label="비공개"
            checked={privacy === "private"}
            onClick={() => {
              setPrivacy("private");
              console.log("비공개");
            }}
          />
        </div>
      </div>
      {/* 아카이브 삭제 */}
      <div className="flex flex-col items-start gap-2.5 ">
        <p className="typo-h2-semibold text-color-highest pb-4">
          아카이브 삭제
        </p>
        <BtnBasic
          variant="gray"
          onClick={() => {
            console.log("삭제하기");
          }}
          className="w-55 bg-surface-container-30"
        >
          삭제하기
        </BtnBasic>
        <BtnBasic
          variant="gray"
          onClick={() => {
            console.log("취소하기");
          }}
          className="w-55"
        >
          취소하기
        </BtnBasic>
      </div>
    </div>
  );
};

export default SettngModal;
