import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "@/components/common/ConfirmModal";

const DiaryDetailPage = () => {
  const { archiveId, diaryId } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);

  // TODO: 실제 API로 다이어리 데이터 가져오기
  // const { data: diary } = useQuery({
  //   queryKey: ["diary", diaryId],
  //   queryFn: () => getDiary(diaryId),
  // });

  // 임시 데이터 (실제로는 API에서 가져옴)
  const diary = {
    id: Number(diaryId),
    archiveId: Number(archiveId),
    title: "사용자가 입력한 일기 제목",
    content: "Lorem ipsum dolor sit amet...",
    date: "2023.12.12",
    images: [],
    authorId: 1, // 작성자 ID
  };

  // ✅ 작성자 여부 확인
  const isOwner = currentUser?.id === diary.authorId;

  // 삭제 모달 상태
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 삭제 핸들러
  const handleDelete = () => {
    // TODO: 삭제 API 호출
    console.log("다이어리 삭제");
    navigate(`/archive/${archiveId}`);
  };

  // 수정 핸들러
  const handleEdit = () => {
    navigate(`/archive/${archiveId}/diary/${diaryId}/edit`);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="typo-h2 text-color-highest">날짜: {diary.date}</p>
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
