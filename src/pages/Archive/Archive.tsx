import ArchiveCard from "@/components/archive/ArchiveCard";
import ArchiveList from "@/components/archive/ArchiveList";
import EmptyArchive from "@/components/archive/EmptyArchive";
import Banner from "@/components/community/Banner";
import { archiveDataMock } from "@/mockData/archiveData";

const Archive = () => {
  // 현재 로그인한 사용자 ID
  const user = {
    userId: 1,
    nickname: "홍길동",
  };

  // 아카이브 데이터 조회 (test용) => 실제로는 API에서 가져올 데이터
  const archiveData = archiveDataMock.filter(
    (archive) => archive.userId === user.userId
  );

  // 아카이브 데이터가 없는 경우 빈 배열을 반환 (test용) => 실제로는 API에서 가져올 데이터
  // const archiveData: any[] = [];

  return (
    <div className="flex flex-col items-center justify-center">
      <Banner />
      <div className="w-310 h-10 my-15">
        <p className="typo-h1 text-color-highest">마이 아카이브</p>
      </div>
      <div className="max-w-[1920px] mx-auto gap-15">
        {/* 아카이브가 존재하면 아카이브 카드를 보여줍니다. */}
        {archiveData.length > 0 ? (
          <ArchiveList archive={archiveData} />
        ) : (
          <EmptyArchive />
        )}
      </div>
    </div>
  );
};

export default Archive;
