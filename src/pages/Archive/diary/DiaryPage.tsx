import { useState, useMemo, useEffect } from "react";
import EmptyList from "@/components/archive/Empty/EmptyList";
import DiaryList from "@/components/archive/List/DiaryList";
import { BtnIcon } from "@/components/common/Button/Btn";
import Pagination from "@/components/common/Pagination";
import { diaryDataMock } from "@/mockData/diaryData";
import { Pencil, Plus, X, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const DiaryPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  // ✅ 편집 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ 선택된 다이어리 ID들
  const [selectedDiaryIds, setSelectedDiaryIds] = useState<number[]>([]);

  // ✅ 페이지네이션 상태
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // ✅ 전체 다이어리 필터링
  const allDiary = diaryDataMock.filter(
    (diary) => diary.archiveId === Number(params.id)
  );

  // ✅ 현재 페이지에 해당하는 다이어리만 추출
  const currentPageDiary = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return allDiary.slice(start, end);
  }, [allDiary, page, pageSize]);

  // ✅ 페이지 변경 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // ✅ 편집 모드 종료 시 선택 초기화
  useEffect(() => {
    if (!isEditMode) {
      setSelectedDiaryIds([]);
    }
  }, [isEditMode]);

  // ✅ 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
          <p className="w-full typo-h1 text-color-highest">일기 제목</p>

          {allDiary.length > 0 ? (
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
                        if (params.id) {
                          navigate(`/archive/${params.id}/diary/new`);
                        }
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

              {/* ✅ 편집 모드와 선택 상태 전달 */}
              <DiaryList
                diary={currentPageDiary}
                isEditMode={isEditMode}
                selectedIds={selectedDiaryIds}
                onSelect={handleDiarySelect}
              />

              {/* 페이지네이션 */}
              {allDiary.length > pageSize && (
                <div className="flex justify-center pt-5 pb-15">
                  <Pagination
                    totalItems={allDiary.length}
                    pageSize={pageSize}
                    visiblePages={5}
                    currentPage={page}
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
                if (params.id) {
                  navigate(`/archive/${params.id}/diary/new`);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
