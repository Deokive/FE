import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Trash2, Edit2, X, Check } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import ConfirmModal from "@/components/common/ConfirmModal";
import ColorChange from "@/components/common/ColorChange";
import DiaryImage from "@/components/diary/DiaryImage";
import DatePicker from "@/components/ticket/DatePicker";
import DiaryText from "@/components/diary/DiaryText";
import CheckboxIcon from "@/assets/icon/CheckboxIcon";
import { DiaryFooter } from "@/components/diary/DiaryFooter";
import type { CreateDiaryRequest } from "@/types/diary";
// TODO: API 함수 import
// import { useQuery } from "@tanstack/react-query";
// import { getDiary, updateDiary, deleteDiary } from "@/apis/...";

type DiaryFormData = {
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

const DiaryDetailPage = () => {
  const { archiveId, diaryId } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);

  // ✅ 편집 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);

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

  // TODO: 실제 API로 다이어리 데이터 가져오기
  // const { data: diary, isLoading } = useQuery({
  //   queryKey: ["diary", diaryId],
  //   queryFn: () => getDiary(diaryId!),
  // });

  // 임시 데이터 (실제로는 API에서 가져옴)
  const diary = {
    id: Number(diaryId),
    archiveId: Number(archiveId),
    title: "사용자가 입력한 일기 제목",
    content: "Lorem ipsum dolor sit amet...",
    recordedAt: "2023-12-12",
    images: [],
    color: colors[5].color,
    visibility: "PUBLIC",
    authorId: currentUser?.id || 1,
  };

  // ✅ 작성자 여부 확인
  const isOwner = currentUser?.id === diary.authorId;

  // ✅ 폼 관리
  const { handleSubmit, watch, setValue, reset } = useForm<DiaryFormData>({
    defaultValues: {
      CreateDiaryRequest: {
        title: diary.title,
        content: diary.content,
        recordedAt: diary.recordedAt,
        color: diary.color,
        visibility: diary.visibility,
        files: [],
      },
    },
  });

  const title = watch("CreateDiaryRequest.title");
  const content = watch("CreateDiaryRequest.content");
  const recordedAt = watch("CreateDiaryRequest.recordedAt");
  const currentColor = watch("CreateDiaryRequest.color");
  const selectedColor =
    colors.find((c) => c.color === currentColor) || colors[5];

  // ✅ 필수 필드 검증
  const isFormValid = useMemo(() => {
    return (
      title?.trim().length > 0 &&
      content?.trim().length > 0 &&
      recordedAt?.trim().length > 0
    );
  }, [title, content, recordedAt]);

  // ✅ 편집 모드 진입 시 폼 초기화
  useEffect(() => {
    if (isEditMode && diary) {
      reset({
        CreateDiaryRequest: {
          title: diary.title,
          content: diary.content,
          recordedAt: diary.recordedAt,
          color: diary.color,
          visibility: diary.visibility,
          files: [],
        },
      });
    }
  }, [isEditMode, diary, reset]);

  // ✅ 편집 모드 진입
  const handleEdit = () => {
    setIsEditMode(true);
  };

  // ✅ 편집 취소
  const handleCancelEdit = () => {
    setIsEditMode(false);
    // 폼을 원래 데이터로 복원
    reset({
      CreateDiaryRequest: {
        title: diary.title,
        content: diary.content,
        recordedAt: diary.recordedAt,
        color: diary.color,
        visibility: diary.visibility,
        files: [],
      },
    });
    // 이미지 초기화
    imageItems.forEach((item) => {
      URL.revokeObjectURL(item.previewUrl);
    });
    setImageItems([]);
  };

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
  };

  // ✅ 수정 저장
  const onSubmit = async (data: DiaryFormData) => {
    try {
      // TODO: 수정 API 호출
      // await updateDiary(diaryId!, data.CreateDiaryRequest);
      console.log("다이어리 수정:", data);

      // ✅ 수정 성공 시 편집 모드 종료
      setIsEditMode(false);

      // TODO: 데이터 다시 불러오기
      // queryClient.invalidateQueries(["diary", diaryId]);
    } catch (error) {
      console.error("다이어리 수정 실패:", error);
    }
  };

  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  // 삭제 모달 상태
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 삭제 핸들러
  const handleDelete = async () => {
    try {
      // TODO: 삭제 API 호출
      // await deleteDiary(diaryId!);
      console.log("다이어리 삭제");
      navigate(`/archive/${archiveId}`);
    } catch (error) {
      console.error("다이어리 삭제 실패:", error);
    }
  };

  // ✅ 편집 모드일 때는 작성 페이지 UI 표시
  if (isEditMode && isOwner) {
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

          {/* 이미지 첨부 영역 */}
          <div className="w-full">
            <DiaryImage
              images={imageItems}
              onImageAdd={handleImageAdd}
              onImageDelete={handleImageDelete}
            />
          </div>

          {/* 날짜 선택 */}
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
                const currentVisibility = watch(
                  "CreateDiaryRequest.visibility"
                );
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
          onCancel={handleCancelEdit}
          isEdit={true}
          isDisabled={!isFormValid}
        />
      </div>
    );
  }

  // ✅ 읽기 모드 (기존 UI)
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="typo-h2 text-color-highest">날짜: {diary.recordedAt}</p>
        </div>

        {/* ✅ 작성자만 수정/삭제 버튼 표시 */}
        {isOwner && (
          <div className="flex gap-4">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-blue-400 text-color-highest hover:bg-brand-blue-300"
            >
              <Edit2 className="w-5 h-5" />
              <span className="typo-body2-semibold">수정</span>
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 className="w-5 h-5" />
              <span className="typo-body2-semibold">삭제</span>
            </button>
          </div>
        )}
      </div>

      {/* 이미지 영역 */}
      {diary.images && diary.images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {diary.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`다이어리 이미지 ${index + 1}`}
              className="w-full h-auto rounded-lg"
            />
          ))}
        </div>
      )}

      {/* 제목 */}
      <h1 className="typo-h1 text-color-highest mb-6">{diary.title}</h1>

      {/* 내용 */}
      <div className="prose max-w-none">
        <p className="typo-body1 text-color-high whitespace-pre-wrap">
          {diary.content}
        </p>
      </div>

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="삭제하시겠습니까?"
        description="삭제된 다이어리는 복구할 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        confirmVariant="gray"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default DiaryDetailPage;
