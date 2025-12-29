import Banner from "@/components/community/Banner";
import { feedDataMock } from "@/mockData/feedData";
import { useParams } from "react-router-dom";
import ArchiveHeader from "@/components/archive/ArchiveHeader";
import Calendar from "@/components/calendar/Calendar";
import { labelDataMock, stickerDataMock } from "@/mockData/calendarData";
import DiaryCard from "@/components/diary/DiaryCard";
import { diaryDataMock } from "@/mockData/diaryData";

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
  console.log(diary);
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
        <div className="w-full flex flex-col items-start gap-[60px]">
          {/* 덕질일기 헤더부분 */}
          <div className="w-full flex gap-[10px]">
            <p className="flex-1 typo-h1 text-color-highest">덕질 일기</p>
            <button
              onClick={() => {
                console.log("더보기 클릭");
              }}
              className="h-[29px] flex items-start justify-end typo-h2-semibold text-color-high cursor-pointer"
            >
              + 더보기
            </button>
          </div>
          {/* 덕질일기 리스트부분 */}
          <div className="flex items-start justify-between gap-[80px]">
            {/* 3개까지 보이게 설정 */}
            {diary.slice(0, 3).map((diary) => (
              <DiaryCard
                key={diary.id}
                archiveId={feed.archiveId}
                title={diary.title}
                image={diary.image}
                date={diary.date}
                onClick={() => {
                  console.log(diary.id + "번 덕질일기 클릭");
                }}
              />
            ))}
          </div>
        </div>
        {/* 덕질 갤러리 */}
        {/* 티켓북 */}
        {/* 덕질 리포스트 */}
        {/* 좋아요 */}
      </div>
    </div>
  );
};

export default FeedDetail;
