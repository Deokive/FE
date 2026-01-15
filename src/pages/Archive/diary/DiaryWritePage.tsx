import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BtnBasic } from "@/components/common/Button/Btn";

type DiaryFormData = {
  title: string;
  content: string;
  date: string;
};

const DiaryWritePage = () => {
  const { archiveId, diaryId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!diaryId;

  const { register, handleSubmit, watch } = useForm<DiaryFormData>({
    defaultValues: {
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const [selectedColor, setSelectedColor] = useState("blue");
  const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

  const onSubmit = async (data: DiaryFormData) => {
    // TODO: API 호출
    console.log("다이어리 저장:", data);
    navigate(`/archive/${archiveId}`);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto px-4 py-8">
      {/* 색상 선택 */}
      <div className="flex gap-4 mb-6">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-12 h-12 rounded-full bg-${color}-500 ${
              selectedColor === color
                ? "ring-4 ring-offset-2 ring-gray-400"
                : ""
            }`}
          />
        ))}
      </div>

      {/* 이미지 첨부 영역 */}
      <div className="mb-6">
        <div className="flex gap-4">
          <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-color-mid">이미지 추가</span>
          </div>
        </div>
      </div>

      {/* 날짜 선택 */}
      <div className="mb-6">
        <label className="typo-h2 text-color-highest mb-2 block">
          날짜: {watch("date") || "날짜 선택"}
        </label>
        <input
          {...register("date")}
          type="date"
          className="w-full h-[65px] p-5 rounded-xl border-2 border-border-mid"
        />
      </div>

      {/* 제목 */}
      <div className="mb-6">
        <input
          {...register("title")}
          type="text"
          placeholder="일기 제목을 입력해주세요"
          className="w-full h-[65px] p-5 rounded-xl border-2 border-border-mid typo-h2"
        />
      </div>

      {/* 내용 */}
      <div className="mb-6">
        <textarea
          {...register("content")}
          placeholder="일기 내용"
          rows={10}
          className="w-full p-5 rounded-xl border-2 border-border-mid typo-body1"
        />
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
