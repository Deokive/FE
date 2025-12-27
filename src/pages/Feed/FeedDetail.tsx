import Banner from "@/components/community/Banner";
import { feedDataMock } from "@/mockData/feedData";
import { useParams } from "react-router-dom";
import ArchiveHeader from "@/components/archive/ArchiveHeader";
import Calendar from "@/components/calendar/Calendar";
import { labelDataMock, stickerDataMock } from "@/mockData/calendarData";

const FeedDetail = () => {
  const urlParams = useParams();
  const feedId = urlParams.id;
  const feed = feedDataMock.find((feed) => feed.id === Number(feedId));
  if (!feed) {
    return <div>Feed not found</div>;
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
        {/* 덕질 갤러리 */}
        {/* 티켓북 */}
        {/* 덕질 리포스트 */}
        {/* 좋아요 */}
      </div>
    </div>
  );
};

export default FeedDetail;
