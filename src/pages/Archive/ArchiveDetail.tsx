import ArchiveHeader from "@/components/archive/ArchiveHeader";
import ArchiveTitle from "@/components/archive/ArchiveTitle";
import ButtonLike from "@/components/archive/ButtonLike";
import DiaryList from "@/components/archive/DiaryList";
import GalleryList from "@/components/archive/GalleryList";
import RepostList from "@/components/archive/RepostList";
import TicketList from "@/components/archive/TicketList";
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
          <div className="flex flex-col items-start justify-between gap-[60px] my-[60px]">
            {/* 덕질 일기 */}
            <ArchiveTitle
              title="덕질 일기"
              onClick={() => {
                console.log("덕질 일기 더보기 클릭");
              }}
            />
            <DiaryList diary={archive?.Diary} />
            {/* 덕질 갤러리 */}
            <ArchiveTitle
              title="덕질 갤러리"
              onClick={() => {
                console.log("덕질 갤러리 더보기 클릭");
              }}
            />
            <GalleryList gallery={archive?.Gallery} />
            {/* 티켓북 */}
            <ArchiveTitle
              title="티켓북"
              onClick={() => {
                console.log("티켓북 더보기 클릭");
              }}
            />
            <TicketList ticket={archive?.Ticket} />
            {/* 덕질 리포스트 */}
            <ArchiveTitle
              title="덕질 리포스트"
              onClick={() => {
                console.log("덕질 리포스트 더보기 클릭");
              }}
            />
            <RepostList repost={archive?.Repost} />
          </div>
          {/* 좋아요 */}
          <ButtonLike
            liked={archive?.liked}
            likeCount={archive?.likeCount}
            onClick={() => {
              console.log("좋아요 클릭");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArchiveDetail;
