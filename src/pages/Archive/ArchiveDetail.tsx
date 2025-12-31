import ArchiveHeader from "@/components/archive/ArchiveHeader";
import Calendar from "@/components/calendar/Calendar";
import Banner from "@/components/community/Banner";
import { archiveDataMock } from "@/mockData/archiveData";
import { labelDataMock, stickerDataMock } from "@/mockData/calendarData";
import { useParams } from "react-router-dom";

const ArchiveDetail = () => {
  const urlParams = useParams();
  const archiveId = urlParams.id;

  const archive = archiveDataMock.find(
    (archive) => archive.archiveId === Number(archiveId)
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <Banner image={archive?.bannerUrl} />
      {/* 배너 밑부분 */}
      <div className="max-w-[1920px] mx-auto flex flex-col items-start mt-[60px] gap-[60px]">
        <div className="w-310">
          {/* 아카이브 헤더 */}
          <ArchiveHeader
            title={archive?.title}
            ownerNickname={archive?.ownerNickname}
            badge={archive?.badge}
            createdAt={archive?.createdAt}
          />
          {/* 아카이브 달력 */}
          <Calendar labelData={labelDataMock} stickerData={stickerDataMock} />
          {/* 덕질 일기 */}
          {/* 덕질 갤러리 */}
          {/* 티켓북 */}
          {/* 덕질 리포스트 */}
          {/* 좋아요 */}
        </div>
      </div>
    </div>
  );
};

export default ArchiveDetail;
