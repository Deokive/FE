import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BtnBasic } from "@/components/common/Button/Btn";
import type { CreateDiaryRequest } from "@/types/diary";
import ColorChange from "@/components/common/ColorChange";
import DiaryImage from "@/components/diary/DiaryImage";
import DatePicker from "@/components/ticket/DatePicker";
import DiaryText from "@/components/diary/DiaryText";

type DiaryFormData = {
  CreateDiaryRequest: CreateDiaryRequest;
};

type Color = {
  name: string;
  color: string;
};

const DiaryWritePage = () => {
  const { archiveId, diaryId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!diaryId;

  const colors: Color[] = [
    { name: "pink", color: "#FFDFE7" },
    { name: "red", color: "#FFABAB" },
    { name: "orange", color: "#FFDEBF" },
    { name: "yellow", color: "#FFEEBB" },
    { name: "green", color: "#CEEBCC" },
    { name: "blue", color: "#82BEF5" },
    { name: "purple", color: "#DFDFFF" },
    { name: "gray", color: "#DFDCDC" },
  ];

  const { register, handleSubmit, watch, setValue } = useForm<DiaryFormData>({
    defaultValues: {
      CreateDiaryRequest: {
        title: "",
        content: "",
        recordedAt: "",
        color: "",
        visibility: "",
        files: [],
      },
    },
  });

  const [selectedColor, setSelectedColor] = useState<Color>(colors[5]);
  const recordedAt = watch("CreateDiaryRequest.recordedAt");

  const onSubmit = async (data: DiaryFormData) => {
    // TODO: API 호출
    console.log("다이어리 저장:", data);
    navigate(`/archive/${archiveId}`);
  };

  return (
    <div className="w-full h-screen bg-[#EEF7FC]">
      <div className="flex flex-col items-center justify-center max-w-[1920px] mx-auto py-15 gap-15 ">
        <div className="w-310 flex justify-start">
          <ColorChange
            initialColor={selectedColor}
            onColorChange={(color) => setSelectedColor(color || colors[5])}
            className="font-hakgyoansim-b"
          />
        </div>

        {/* 이미지 첨부 영역 */}
        <div className="w-full">
          <DiaryImage />
        </div>

        <div className="w-310 flex flex-col gap-15">
          {/* ✅ 날짜 선택 - DatePicker 사용 */}
          <div className="flex gap-5 items-center w-full">
            <p className="text-center typo-h1 text-color-high">날짜 : </p>
            <DatePicker
              value={recordedAt}
              onChange={(date) => {
                setValue("CreateDiaryRequest.recordedAt", date || "");
              }}
              placeholder="날짜 입력"
              className="flex-1 w-50 justify-center items-center"
            />
          </div>
          {/* 일기 내용 */}
          <DiaryText
            value={watch("CreateDiaryRequest.content")}
            onChange={(content) => {
              setValue("CreateDiaryRequest.content", content || "");
            }}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-4 justify-end">
        <BtnBasic variant="gray" onClick={() => navigate(-1)} className="px-8">
          취소
        </BtnBasic>
        <BtnBasic
          variant="blue"
          onClick={handleSubmit(onSubmit)}
          className="px-8"
        >
          {isEdit ? "수정" : "저장"}
        </BtnBasic>
      </div>
    </div>
  );
};

export default DiaryWritePage;
