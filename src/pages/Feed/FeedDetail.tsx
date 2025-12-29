import Banner from "@/components/community/Banner";
import { feedDataMock } from "@/mockData/feedData";
import { useParams } from "react-router-dom";
import ArchiveHeader from "@/components/archive/ArchiveHeader";
import Calendar from "@/components/calendar/Calendar";
import { labelDataMock, stickerDataMock } from "@/mockData/calendarData";
import { diaryDataMock } from "@/mockData/diaryData";
import DiaryList from "@/components/archive/DiaryList";
import GalleryList from "@/components/archive/GalleryList";
import { galleryDataMock } from "@/mockData/galleryData";

const FeedDetail = () => {
  const urlParams = useParams();
  const archiveId = urlParams.id;
  // 아카이브 데이터 조회
  const feed = feedDataMock.find(
    (feed) => feed.archiveId === Number(archiveId)
  );
  // 덕질 일기 데이터 조회
  const diary = diaryDataMock.filter(
    (diary) => diary.archiveId === Number(archiveId)
  );
  // 덕질 갤러리 데이터 조회
  const gallery = galleryDataMock.filter(
    (gallery) => gallery.archiveId === Number(archiveId)
  );
  if (!feed) {
    return <div>Feed not found</div>;
  }
  if (!diary) {
    return <div>Diary not found</div>;
  }
  return (
    <div>
      <Banner />
      {/* 배너 밑부분 */}
      <div className="w-full flex flex-col items-start mt-[60px] pb-[100px] gap-[60px] px-[340px]">
        {/* 아카이브 헤더 */}
        <ArchiveHeader
          title={feed.title}
          ownerNickname={feed.ownerNickname}
          badge={feed.badge}
          createdAt={feed.createdAt}
        />
        {/* 아카이브 달력 */}
        <Calendar labelData={labelDataMock} stickerData={stickerDataMock} />
        {/* 덕질 일기 */}
        <DiaryList diary={diary} />
        {/* 덕질 갤러리 */}
        <GalleryList gallery={gallery} />
        {/* 티켓북 */}
        {/* 덕질 리포스트 */}
        {/* 좋아요 */}
      </div>
    </div>
  );
};

export default FeedDetail;
