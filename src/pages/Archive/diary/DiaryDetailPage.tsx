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
import type { CreateDiaryRequest, DiaryDetailResponse } from "@/types/diary";
import { MediaType } from "@/enums/mediaType";
import { MediaRole } from "@/enums/mediaRole";
import dayjs from "dayjs";
// TODO: API 함수 import
// import { useQuery } from "@tanstack/react-query";
// import { getDiary, updateDiary, deleteDiary } from "@/apis/...";

type DiaryFormData = {
  CreateDiaryRequest: CreateDiaryRequest;
};

type ImageItem = {
  id: string;
  file: File;
  previewUrl: string;
};

const DiaryDetailPage = () => {
  const { archiveId, diaryId } = useParams();
  const navigate = useNavigate();
  // 현재 로그인된 사용자 정보
  const currentUser = useAuthStore((state) => state.user);

  // 임시 데이터 (실제로는 API에서 가져옴)
  const diary: DiaryDetailResponse = {
    id: Number(diaryId),
    title: "사용자가 입력한 일기 제목",
    content: "Lorem ipsum dolor sit amet...",
    recordedAt: "2023-12-12",
    color: "#82BEF5",
    visibility: "PUBLIC",
    diaryBookId: Number(archiveId),
    createdBy: currentUser?.id || 1, // ✅ 작성자 ID
    files: [
      {
        fileId: 1,
        filename: "example.jpg",
        cdnUrl: "https://example.com/example.jpg",
        fileSize: 1024,
        mediaType: MediaType.IMAGE,
        mediaRole: MediaRole.CONTENT,
        sequence: 1,
      },
      {
        fileId: 2,
        filename: "example2.jpg",
        cdnUrl: "https://example.com/example.jpg",
        fileSize: 1024,
        mediaType: MediaType.IMAGE,
        mediaRole: MediaRole.CONTENT,
        sequence: 2,
      },
    ],
  };
  // ✅ 작성자 여부 확인 => 작성자라면 수정 가능
  // const isOwner = currentUser?.id === diary.createdBy ? true : false;
  const isOwner = false;

  // ✅ 편집 모드 상태
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [imageItems, setImageItems] = useState<ImageItem[]>([]);

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
  const selectedColor = diary.color; // 임시 데이터의 색상.

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
    if (isEditMode) {
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
  }, [isEditMode, reset]);

  // ✅ 편집 모드 진입
  const handleEdit = () => {
    console.log("편집 모드 진입");
    setIsEditMode(true);
    console.log("isEditMode", isEditMode);
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

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    try {
      // TODO: 삭제 API 호출
      // await deleteDiary(diaryId!);
      console.log("다이어리 삭제");
      setDeleteModalOpen(true);
    } catch (error) {
      console.error("다이어리 삭제 실패:", error);
    }
  };

  // ✅ 다이어리가 작성자의 다이어리라면 수정 페이지 UI 표시
  if (isOwner) {
    return (
      <div className="w-full h-full bg-[#EEF7FC]">
        <div className="flex flex-col items-center justify-center max-w-[1920px] mx-auto py-15 gap-15 ">
          {/* 색상 선택 */}
          <div className="w-310 flex justify-start">
            {isEditMode && (
              <ColorChange
                initialColor={{ color: diary.color }}
                onColorChange={(color) =>
                  setValue(
                    "CreateDiaryRequest.color",
                    color?.color || diary.color
                  )
                }
                className="font-hakgyoansim-b"
              />
            )}
          </div>

          {/* 이미지 첨부 영역 */}
          <div className="w-full">
            <DiaryImage
              isEditMode={!isEditMode}
              images={imageItems}
              onImageAdd={handleImageAdd}
              onImageDelete={handleImageDelete}
            />
          </div>

          {/* 날짜 선택 */}
          <div className="w-310 flex flex-col gap-15">
            <div className="flex gap-5 items-center w-full">
              <p className="text-center typo-h1 text-color-high">날짜 : </p>
              {isEditMode ? (
                <DatePicker
                  value={recordedAt}
                  onChange={(date) => {
                    setValue("CreateDiaryRequest.recordedAt", date || "");
                  }}
                  placeholder="날짜 입력"
                  className="flex-1 w-50 justify-center items-center"
                />
              ) : (
                <p className="text-center text-[40px] font-light text-color-high">
                  {dayjs(recordedAt).format("YYYY.MM.DD")}
                </p>
              )}
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
              isEditable={isEditMode} // ✅ 편집 모드일 때만 입력 가능
            />
          </div>
          {/* 비공개 버튼 */}
          {isEditMode && (
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
              <p className="typo-body1 text-color-highest text-center">
                비공개
              </p>
            </div>
          )}
        </div>
        <ConfirmModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          title="해당 일기장을 삭제하시겠어요?"
          confirmLabel="확인"
          cancelLabel="취소"
          confirmVariant="blue"
          onConfirm={handleDelete}
          onCancel={() => setDeleteModalOpen(false)}
        />
        <DiaryFooter
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancelEdit}
          onDelete={handleDeleteModalOpen}
          isEdit={!isEditMode}
          isDisabled={!isFormValid}
        />
      </div>
    );
  }

  // ✅ 읽기 모드 (기존 UI)
  return (
    <div className="w-full h-full bg-[#EEF7FC]">
      <div className="flex flex-col items-center justify-center max-w-[1920px] mx-auto py-15 gap-15 ">
        {/* 이미지 첨부 영역 */}
        <div className="w-full">
          <DiaryImage
            isEditMode={!isEditMode}
            images={imageItems}
            onImageAdd={handleImageAdd}
            onImageDelete={handleImageDelete}
          />
        </div>
        {/* 날짜 선택 */}
        <div className="w-310 flex flex-col gap-15">
          <div className="flex gap-5 items-center w-full">
            <p className="text-center typo-h1 text-color-high">날짜 : </p>

            <p className="text-center text-[40px] font-light text-color-high">
              {dayjs(recordedAt).format("YYYY.MM.DD")}
            </p>
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
            isEditable={isEditMode} // ✅ 편집 모드일 때만 입력 가능
          />
        </div>
      </div>
      <DiaryFooter noBtn={true} />
    </div>
  );
};

export default DiaryDetailPage;
