import { useMemo, useState } from "react";
import TrashIcon from "@/assets/icon/TrashIcon";
import ArchiveList from "@/components/archive/List/ArchiveList";
import EmptyArchive from "@/components/archive/Empty/EmptyArchive";
import { BtnIcon } from "@/components/common/Button/Btn";
import Banner from "@/components/community/Banner";
import { Pencil, SquareX } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { GetUserArchive } from "@/apis/queries/archive/getArchive";
import Pagination from "@/components/common/Pagination";

const MyArchivePage = () => {
  // 현재 로그인한 사용자 정보
  const user = useAuthStore((state) => state.user);

  // ✅ 페이지 상태 (1부터 시작)
  const [page, setPage] = useState(1);
  const pageSize = 9;


  // ✅ 실제 API로 아카이브 목록 조회
  const {
    data: archivesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myArchives", user?.id, page, pageSize],
    queryFn: () =>
      GetUserArchive(Number(user?.id), {
        page: page - 1, // 0-based
        size: pageSize,
        sort: "createdAt",
        direction: "DESC",
      }),
    enabled: !!user?.id, // 로그인 유저 있을 때만 호출
  });

  // ✅ 서버에서 받아온 실제 아카이브 리스트
  const archives = archivesData?.content ?? [];

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  const handleEditMode = () => {
    setIsEditMode((prev) => {
      const next = !prev;
      if (!next) setCheckedMap({});
      return next;
    });
  };

  // 체크 토글: ArchiveCard에서 호출
  const toggleCheck = (id: string, checked: boolean) => {
    setCheckedMap((prev) => {
      const next = { ...prev };
      if (checked) next[id] = true;
      else delete next[id];
      return next;
    });
  };

  // 체크된 id 배열 (string ID)
  const checkedIds = useMemo(
    () => Object.keys(checkedMap).filter((k) => checkedMap[k]),
    [checkedMap]
  );

  // 삭제
  const handleDeleteSelected = () => {
    if (checkedIds.length === 0) {
      alert("삭제할 아카이브를 선택하세요.");
      return;
    }
    if (!confirm(`${checkedIds.length}개의 아카이브를 삭제하시겠어요?`)) return;

    // TODO: 서버에서 삭제 API 호출 후 성공 시 refetch
    // 예: await deleteArchives(checkedIds.map(id => Number(id)))
    // 성공 시:
    // queryClient.invalidateQueries({ queryKey: ["myArchives", user?.id] });

    // 초기화 / 편집 모드 종료
    setCheckedMap({});
    setIsEditMode(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Banner />
      <div className="w-310 h-10 my-15">
        <p className="typo-h1 text-color-highest">마이 아카이브</p>
      </div>
      <div className="max-w-[1920px] mx-auto mb-40">
        {/* ✅ 로딩 / 에러 / 데이터 없는 경우 처리 */}
        {isLoading ? (
          <p className="typo-h2 text-color-mid">아카이브 불러오는 중...</p>
        ) : isError ? (
          <p className="typo-h2 text-color-accent">
            아카이브를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
          </p>
        ) : archives.length > 0 ? (
          <div className="flex flex-col gap-10">
            {isEditMode ? (
              <div className="flex items-center justify-end gap-5">
                <BtnIcon
                  startIcon={<TrashIcon className="w-6 h-6 text-color-high" />}
                  onClick={handleDeleteSelected}
                >
                  삭제하기
                </BtnIcon>
                <BtnIcon
                  startIcon={<SquareX className="w-6 h-6 text-color-high" />}
                  onClick={() => {
                    setIsEditMode(false);
                    setCheckedMap({});
                  }}
                >
                  취소하기
                </BtnIcon>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-5">
                <BtnIcon
                  startIcon={<Pencil className="w-6 h-6 text-color-high" />}
                  onClick={handleEditMode}
                >
                  편집하기
                </BtnIcon>
              </div>
            )}

            {/* ✅ 실제 API 응답으로 리스트 렌더링 */}
            <ArchiveList
              archive={archives}
              isEditMode={isEditMode}
              checkedMap={checkedMap}
              onToggleCheck={toggleCheck}
            />

            {/* ✅ 페이지네이션 */}
            {archivesData?.page.totalElements &&
              archivesData.page.totalElements > pageSize && (
                <div className="flex justify-center mt-12">
                  <Pagination
                    totalItems={archivesData.page.totalElements}
                    pageSize={archivesData.page.size ?? pageSize}
                    currentPage={page}
                    visiblePages={5}
                    onChange={(nextPage) => setPage(nextPage)}
                  />
                </div>
              )}
          </div>
        ) : (
          <EmptyArchive />
        )}
      </div>
    </div>
  );
};

export default MyArchivePage;