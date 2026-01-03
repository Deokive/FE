import TrashIcon from "@/assets/Icon/TrashIcon";
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
  const archiveData = archiveDataMock.filter(
    (archive) => archive.userId === user.userId
  );

  const [isEditMode, setIsEditMode] = useState<boolean>(false); // 편집 모드 여부

  const handleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Banner />
      <div className="w-310 h-10 my-15">
        <p className="typo-h1 text-color-highest">마이 아카이브</p>
      </div>
      <div className="max-w-[1920px] mx-auto mb-40">
        {/* 아카이브가 존재하면 아카이브 카드를 보여줍니다. */}
        {archiveData.length > 0 ? (
          <div className="flex flex-col gap-10">
            {isEditMode ? (
              <div className="flex items-center justify-end gap-5">
                <BtnIcon
                  startIcon={<TrashIcon className="w-6 h-6 text-color-high" />}
                  onClick={() => {
                    console.log("삭제 버튼 클릭");
                  }}
                >
                  삭제하기
                </BtnIcon>
                <BtnIcon
                  startIcon={<SquareX className="w-6 h-6 text-color-high" />}
                  onClick={() => {
                    console.log("취소 버튼 클릭");
                    setIsEditMode(false);
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
                  onClick={() => {
                    handleEditMode();
                    console.log(isEditMode);
                  }}
                >
                  편집하기
                </BtnIcon>
              </div>
            )}

            <ArchiveList archive={archiveData} isEditMode={isEditMode} />
          </div>
        ) : (
          <EmptyArchive />
        )}
      </div>
    </div>
  );
};

export default Archive;
