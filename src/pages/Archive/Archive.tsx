import { useMemo } from "react";
import TrashIcon from "@/assets/icon/TrashIcon";
import ArchiveList from "@/components/archive/List/ArchiveList";
import EmptyArchive from "@/components/archive/Empty/EmptyArchive";
import { BtnIcon } from "@/components/common/Button/Btn";
import Banner from "@/components/community/Banner";
import { archiveDataMock } from "@/mockData/archiveData";
import { Pencil, Plus, SquareX } from "lucide-react";
import { useState } from "react";


const Archive = () => {
  // 현재 로그인한 사용자 ID (test용) => 실제로는 API에서 가져올 데이터
  // userID = 1,2 은 존재하는 아카이브를 가지고 있는 사용자 ID 나머지는 빈 아카이브
  const user = {
    userId: 1,
    nickname: "홍길동",
  };

  // 아카이브 데이터 조회 (test용) => 실제로는 API에서 가져올 데이터
  const initialData = archiveDataMock.filter(
    (archive) => archive.userId === user.userId
  );

  const [archives, setArchives] = useState(() => initialData);
  const [isEditMode, setIsEditMode] = useState<boolean>(false); // 편집 모드 여부
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  const handleEditMode = () => {
    setIsEditMode((prev) => {
      const next = !prev;
      if (!next) setCheckedMap({}); // 편집 종료 시 선택 초기화
      return next;
    });
  };

  // 체크 토글: ArchiveCard 또는 체크버튼에서 호출
  const toggleCheck = (id: string, checked: boolean) => {
    setCheckedMap((prev) => {
      const next = { ...prev };
      if (checked) next[id] = true;
      else delete next[id];
      return next;
    });
  };

  // 체크된 id 배열
  const checkedIds = useMemo(
    () => Object.keys(checkedMap).filter((k) => checkedMap[k]),
    [checkedMap]
  );

  // 선택 삭제
  const handleDeleteSelected = () => {
    if (checkedIds.length === 0) {
      alert("삭제할 아카이브를 선택하세요.");
      return;
    }
    if (!confirm(`${checkedIds.length}개의 아카이브를 삭제하시겠어요?`)) return;

    // TODO: 서버 연동 시 서버 요청 후 성공 시 상태 갱신
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
        {/* 아카이브가 존재하면 아카이브 카드를 보여줍니다. */}
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
                  startIcon={<Plus className="w-6 h-6 text-color-high" />}
                  onClick={() => {
                    console.log("덕카이브 추가 버튼 클릭");
                  }}
                >
                  덕카이브
                </BtnIcon>
                <BtnIcon
                  startIcon={<Pencil className="w-6 h-6 text-color-high" />}
                  onClick={handleEditMode}
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

export default Archive;
