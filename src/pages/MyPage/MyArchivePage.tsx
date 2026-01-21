import { useMemo, useState } from "react";
import TrashIcon from "@/assets/icon/TrashIcon";
import ArchiveList from "@/components/archive/List/ArchiveList";
import EmptyArchive from "@/components/archive/Empty/EmptyArchive";
import { BtnIcon } from "@/components/common/Button/Btn";
import Banner from "@/components/community/Banner";
import { archiveDataMock } from "@/mockData/archiveData";
import { Pencil, SquareX } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const MyArchivePage = () => {
  // 현재 로그인한 사용자 ID
  const user = useAuthStore((state) => state.user);

  // 초기 데이터(서버 대신 mock에서 초기화)
  const initialData = archiveDataMock.filter(
    (archive) => archive.userId === user?.id
  );

  // 아카이브 목록 상태를 컴포넌트가 직접 관리
  const [archives, setArchives] = useState(() => initialData);

  const [isEditMode, setIsEditMode] = useState<boolean>(false); // 편집 모드 여부
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  // const handleEditMode = () => {
  //   setIsEditMode((prev) => !prev);
  //   if (isEditMode) setCheckedMap({});
  // };

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

    // TODO: 서버 연동 시 서버에 삭제 요청하고 성공 시 setArchives 호출
    // 예: await api.deleteArchives(checkedIds.map(id => Number(id)))

    // 로컬 상태에서 필터링 (archiveId를 string으로 비교)
    setArchives((prev) =>
      prev.filter((a) => !checkedIds.includes(String(a.archiveId)))
    );

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
        {archives.length > 0 ? (
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
                  onClick={() => {
                    setIsEditMode(true);
                  }}
                >
                  편집하기
                </BtnIcon>
              </div>
            )}

            <ArchiveList
              archive={archives}
              isEditMode={isEditMode}
              checkedMap={checkedMap}
              onToggleCheck={toggleCheck}
            />
          </div>
        ) : (
          <EmptyArchive />
        )}
      </div>
    </div>
  );
};

export default MyArchivePage;
