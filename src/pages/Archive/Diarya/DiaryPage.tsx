import { useState, useEffect } from "react";
import EmptyList from "@/components/archive/Empty/EmptyList";
import DiaryCard from "@/components/common/Card/DiaryCard";
import { BtnIcon } from "@/components/common/Button/Btn";
import Pagination from "@/components/common/Pagination";
import { useGetDiaryBook } from "@/apis/queries/diary/useGetDiary";
import { Pencil, Plus, X, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const DiaryPage = () => {
  const params = useParams();
  const archiveId = Number(params.archiveId);
  const navigate = useNavigate();

  // ✅ 편집 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ 선택된 다이어리 ID들
  const [selectedDiaryIds, setSelectedDiaryIds] = useState<number[]>([]);

  // ✅ 페이지네이션 상태
  const [page, setPage] = useState(0);
  const pageSize = 9;

  // ✅ API로 다이어리북 데이터 가져오기
  const { data, isLoading } = useGetDiaryBook({
    archiveId,
    page,
    size: pageSize,
  });

  const diaryList = data?.content ?? [];
  const totalItems = data?.page?.totalElements ?? 0;
  const diaryBookTitle = data?.title ?? "덕질 일기";

  // ✅ 페이지 변경 시 스크롤 맨 위로 (1-based로 변환해서 표시)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // ✅ 편집 모드 종료 시 선택 초기화
  useEffect(() => {
    if (!isEditMode) {
      setSelectedDiaryIds([]);
    }
  }, [isEditMode]);

  // ✅ 페이지 변경 핸들러 (Pagination은 1-based, API는 0-based)
  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1);
  };

  // ✅ 편집 모드 토글
  const handleEditToggle = () => {
    setIsEditMode((prev) => !prev);
  };

  // ✅ 편집 취소
  const handleCancel = () => {
    setIsEditMode(false);
    setSelectedDiaryIds([]);
  };

  // ✅ 다이어리 선택/해제
  const handleDiarySelect = (diaryId: number) => {
    setSelectedDiaryIds((prev) =>
      prev.includes(diaryId)
        ? prev.filter((id) => id !== diaryId)
        : [...prev, diaryId]
    );
  };

  // ✅ 삭제 핸들러
  const handleDelete = () => {
    if (selectedDiaryIds.length === 0) return;

    // TODO: 삭제 API 호출
    console.log("삭제할 다이어리:", selectedDiaryIds);

    // 삭제 후 편집 모드 종료
    setIsEditMode(false);
    setSelectedDiaryIds([]);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[1920px] mx-auto flex flex-col items-start mt-15 gap-15">
        <div className="w-310 flex flex-col gap-15">
          <p className="w-full typo-h1 text-color-highest">{diaryBookTitle}</p>

          {diaryList.length > 0 ? (
            <div className="w-full flex flex-col gap-10">
              {/* 버튼 영역 */}
              <div className="w-full flex justify-end gap-4">
                {isEditMode ? (
                  <>
                    <BtnIcon
                      startIcon={<X className="w-6 h-6 text-color-high" />}
                      onClick={handleCancel}
                    >
                      취소하기
                    </BtnIcon>
                    <BtnIcon
                      startIcon={<Trash2 className="w-6 h-6 text-color-high" />}
                      onClick={handleDelete}
                      disabled={selectedDiaryIds.length === 0}
                    >
                      삭제하기
                    </BtnIcon>
                  </>
                ) : (
                  <>
                    <BtnIcon
                      startIcon={<Plus className="w-6 h-6 text-color-high" />}
                      onClick={() => {
                        navigate(`/archive/${archiveId}/diary/new`);
                      }}
                    >
                      일기 추가
                    </BtnIcon>
                    <BtnIcon
                      startIcon={<Pencil className="w-6 h-6 text-color-high" />}
                      onClick={handleEditToggle}
                    >
                      편집 하기
                    </BtnIcon>
                  </>
                )}
              </div>

              {/* ✅ DiaryCard 목록 */}
              <div className="w-full flex flex-col items-start gap-[60px]">
                <div className="flex flex-wrap items-start justify-between gap-[80px]">
                  {diaryList.map((diary) => (
                    <DiaryCard
                      key={diary.diaryId}
                      archiveId={archiveId}
                      diaryId={diary.diaryId}
                      title={diary.title}
                      image={diary.thumbnailUrl ?? undefined}
                      date={diary.recordedAt}
                      isEditMode={isEditMode}
                      isSelected={selectedDiaryIds.includes(diary.diaryId)}
                      onSelect={() => handleDiarySelect(diary.diaryId)}
                      onClick={() => {
                        if (!isEditMode) {
                          navigate(`/archive/${archiveId}/diary/${diary.diaryId}`);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* 페이지네이션 */}
              {totalItems > pageSize && (
                <div className="flex justify-center pt-5 pb-15">
                  <Pagination
                    totalItems={totalItems}
                    pageSize={pageSize}
                    visiblePages={5}
                    currentPage={page + 1}
                    onChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          ) : (
            <EmptyList
              title="일기 추가"
              description="아직 작성된 일기가 없어요."
              className="w-full h-135"
              onClick={() => {
                navigate(`/archive/${archiveId}/diary/new`);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
