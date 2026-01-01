import { labelDataMock, stickerDataMock } from "@/mockData/calendarData";
import { diaryDataMock } from "@/mockData/diaryData";
import { galleryDataMock } from "@/mockData/galleryData";
import { ticketDataMock } from "@/mockData/ticketData";
import Banner from "@/components/community/Banner";
import { feedDataMock } from "@/mockData/feedData";
import { useParams } from "react-router-dom";
import ArchiveHeader from "@/components/archive/ArchiveHeader";
import Calendar from "@/components/calendar/Calendar";
import DiaryList from "@/components/archive/List/DiaryList";
import GalleryList from "@/components/archive/List/GalleryList";
import TicketList from "@/components/archive/List/TicketList";
import RepostList from "@/components/archive/List/RepostList";
import { repostDataMock } from "@/mockData/repostData";
import ButtonLike from "@/components/archive/ButtonLike";
import ArchiveTitle from "@/components/archive/ArchiveTitle";
import EmptyFeedList from "@/components/feed/EmptyFeedList";

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
  // 티켓 데이터 조회
  const ticket = ticketDataMock.filter(
    (ticket) => ticket.archiveId === Number(archiveId)
  );
  // 덕질 리포스트 데이터 조회
  const repost = repostDataMock.filter(
    (repost) => repost.archiveId === Number(archiveId)
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <Banner image={feed?.bannerUrl} />
      {/* 배너 밑부분 */}
      <div className="max-w-[1920px] mx-auto flex flex-col items-start mt-[60px] gap-[60px]">
        {/* 아카이브 헤더 */}
        <ArchiveHeader
          title={feed?.title}
          ownerNickname={feed?.ownerNickname}
          badge={feed?.badge}
          createdAt={feed?.createdAt}
        />
        {/* 아카이브 달력 */}
        <Calendar labelData={labelDataMock} stickerData={stickerDataMock} />
        {/* 덕질 일기 */}
        <ArchiveTitle
          title="덕질 일기"
          onClick={() => {
            console.log("덕질 일기 더보기 클릭");
          }}
          isMore={(diary.length ?? 0) > 0}
        />
        {diary.length ?? 0 > 0 ? (
          <DiaryList diary={diary} />
        ) : (
          <EmptyFeedList description="아직 작성된 일기가 없어요." />
        )}
        {/* 덕질 갤러리 */}
        <ArchiveTitle
          title="덕질 갤러리"
          onClick={() => {
            console.log("덕질 갤러리 더보기 클릭");
          }}
          isMore={(gallery.length ?? 0) > 0}
        />
        {gallery.length ?? 0 > 0 ? (
          <GalleryList gallery={gallery} />
        ) : (
          <EmptyFeedList description="아직 작성된 갤러리가 없어요." />
        )}
        {/* 티켓북 */}
        <ArchiveTitle
          title="티켓북"
          onClick={() => {
            console.log("티켓북 더보기 클릭");
          }}
          isMore={(ticket.length ?? 0) > 0}
        />
        {ticket.length ?? 0 > 0 ? (
          <TicketList ticket={ticket} />
        ) : (
          <EmptyFeedList description="아직 작성된 티켓북이 없어요." />
        )}
        {/* 덕질 리포스트 */}
        <ArchiveTitle
          title="덕질 리포스트"
          onClick={() => {
            console.log("덕질 리포스트 더보기 클릭");
          }}
          isMore={(repost.length ?? 0) > 0}
        />
        {repost.length ?? 0 > 0 ? (
          <RepostList repost={repost} />
        ) : (
          <EmptyFeedList description="아직 작성된 리포스트가 없어요." />
        )}
        {/* 좋아요 */}
        <ButtonLike
          liked={feed?.liked}
          likeCount={feed?.likeCount ?? 0}
          onClick={() => {
            console.log("좋아요 클릭");
          }}
        />
      </div>
    </div>
  );
};

export default FeedDetail;
