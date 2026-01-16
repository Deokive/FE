import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { BtnBasic } from "@/components/common/Button/Btn";
import type { CreateDiaryRequest } from "@/types/diary";
import ColorChange from "@/components/common/ColorChange";
import DiaryImage from "@/components/diary/DiaryImage";
import DatePicker from "@/components/ticket/DatePicker";
import DiaryText from "@/components/diary/DiaryText";
import CheckboxIcon from "@/assets/icon/CheckboxIcon";
import { DiaryFooter } from "@/components/diary/DiaryFooter";

export type DiaryFormData = {
  CreateDiaryRequest: CreateDiaryRequest;
};

type Color = {
  name: string;
  color: string;
};

type ImageItem = {
  id: string;
  file: File;
  previewUrl: string;
};

const DiaryWritePage = () => {
  const { archiveId } = useParams();
  const navigate = useNavigate();

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

  const { register, handleSubmit, watch, setValue, reset } =
    useForm<DiaryFormData>({
      defaultValues: {
        CreateDiaryRequest: {
          title: "",
          content: "",
          recordedAt: "",
          color: colors[5].color,
          visibility: "PUBLIC",
          files: [],
        },
      },
    });

  // ✅ 이미지 파일 배열 상태 관리
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);

  // ✅ form에서 현재 색상 가져오기
  const currentColor = watch("CreateDiaryRequest.color");
  const selectedColor =
    colors.find((c) => c.color === currentColor) || colors[5];

  const recordedAt = watch("CreateDiaryRequest.recordedAt");
  const title = watch("CreateDiaryRequest.title");
  const content = watch("CreateDiaryRequest.content");

  // ✅ 필수 필드 검증 - title, content, recordedAt이 모두 입력되어야 함
  const isFormValid = useMemo(() => {
    return (
      title.trim().length > 0 &&
      content.trim().length > 0 &&
      recordedAt.trim().length > 0
    );
  }, [title, content, recordedAt]);

  // ✅ 이미지 추가 핸들러
  const handleImageAdd = (file: File) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const previewUrl = URL.createObjectURL(file);

    const newImageItem: ImageItem = {
      id,
      file,
      previewUrl,
    };

    setImageItems((prev) => [...prev, newImageItem]);

    // ✅ form에 파일 정보 저장
    const currentFiles = watch("CreateDiaryRequest.files");
    setValue("CreateDiaryRequest.files", [
      ...currentFiles,
      {
        fileId: 0,
        mediaRole: "IMAGE",
        sequence: currentFiles.length,
      },
    ]);
  };

  // ✅ 이미지 삭제 핸들러
  const handleImageDelete = (id: string) => {
    setImageItems((prev) => {
      const itemToDelete = prev.find((item) => item.id === id);
      if (itemToDelete) {
        URL.revokeObjectURL(itemToDelete.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });

    // ✅ form에서도 파일 정보 제거
    const currentFiles = watch("CreateDiaryRequest.files");
    const deletedIndex = imageItems.findIndex((item) => item.id === id);
    const updatedFiles = currentFiles.filter(
      (_, index) => index !== deletedIndex
    );
    setValue("CreateDiaryRequest.files", updatedFiles);
  };

  // ✅ 컴포넌트 언마운트 시 URL 정리
  useEffect(() => {
    return () => {
      imageItems.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, []);

  // ✅ 폼 초기화 함수
  const resetForm = () => {
    // ✅ 폼 데이터 초기화
    reset({
      CreateDiaryRequest: {
        title: "",
        content: "",
        recordedAt: "",
        color: colors[5].color,
        visibility: "PUBLIC",
        files: [],
      },
    });

    // ✅ 이미지 파일들 정리 및 초기화
    imageItems.forEach((item) => {
      URL.revokeObjectURL(item.previewUrl);
    });
    setImageItems([]);
  };

  // ✅ onSubmit - handleSubmit을 사용하여 모든 데이터 가져오기
  const onSubmit = async (data: DiaryFormData) => {
    // TODO: API 호출
    console.log("다이어리 저장:", data);
    resetForm();
    // TODO: API 호출 후 리다이렉트 => 작성자라면 수정페이지, 아니면 상세페이지
    navigate(`/archive/${archiveId}/diary`);
  };

  // ✅ handleSave - DiaryFooter에서 호출
  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="w-full h-full bg-[#EEF7FC]">
      <div className="flex flex-col items-center justify-center max-w-[1920px] mx-auto py-15 gap-15 ">
        {/* 색상 선택 */}
        <div className="w-310 flex justify-start">
          <ColorChange
            initialColor={selectedColor}
            onColorChange={(color) =>
              setValue(
                "CreateDiaryRequest.color",
                color?.color || colors[5].color
              )
            }
            className="font-hakgyoansim-b"
          />
        </div>

        {/* ✅ 이미지 첨부 영역 - 여러 이미지 업로드 지원 */}
        <div className="w-full">
          <DiaryImage
            images={imageItems}
            onImageAdd={handleImageAdd}
            onImageDelete={handleImageDelete}
          />
        </div>

        {/* ✅ 날짜 선택 - DatePicker 사용 */}
        <div className="w-310 flex flex-col gap-15">
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
            title={watch("CreateDiaryRequest.title")}
            onTitleChange={(title) => {
              setValue("CreateDiaryRequest.title", title || "");
            }}
            content={watch("CreateDiaryRequest.content")}
            onContentChange={(content) => {
              setValue("CreateDiaryRequest.content", content || "");
            }}
          />
        </div>
        {/* 비공개 버튼 */}
        <div className="w-310 flex items-center justify-end gap-3">
          <div
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              const currentVisibility = watch("CreateDiaryRequest.visibility");
              const newVisibility =
                currentVisibility === "PRIVATE" ? "PUBLIC" : "PRIVATE";
              setValue("CreateDiaryRequest.visibility", newVisibility);
            }}
          >
            <CheckboxIcon
              size={24}
              checked={watch("CreateDiaryRequest.visibility") === "PRIVATE"}
            />
          </div>
          <p className="typo-body1 text-color-highest text-center">비공개</p>
        </div>
      </div>
      <DiaryFooter
        onSave={handleSave}
        onCancel={() => navigate(-1)}
        isDisabled={!isFormValid} // ✅ 필수 필드 검증 결과 전달
      />
    </div>
  );
};

export default DiaryWritePage;
