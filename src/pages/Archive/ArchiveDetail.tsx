import { useNavigate } from "react-router-dom";
import ArchiveHeader from "@/components/archive/ArchiveHeader";
import ArchiveTitle from "@/components/archive/ArchiveTitle";
import ButtonLike from "@/components/archive/ButtonLike";
import DiaryList from "@/components/archive/List/DiaryList";
import EmptyList from "@/components/archive/Empty/EmptyList";
import GalleryList from "@/components/archive/List/GalleryList";
import RepostList from "@/components/archive/List/RepostList";
import TicketList from "@/components/archive/List/TicketList";
import Calendar from "@/components/calendar/Calendar";
import Banner from "@/components/community/Banner";
import { archiveDataMock } from "@/mockData/archiveData";
import { labelDataMock, stickerDataMock } from "@/mockData/calendarData";
import type { LabelData } from "@/types/calendar";
import { Camera, Link } from "lucide-react";
import { useParams } from "react-router-dom";

const ArchiveDetail = () => {
  const navigate = useNavigate();

  const urlParams = useParams();
  const archiveId = urlParams.id;

  // 아카이브 데이터 조회 => 추후에 실제 API로 연결
  const archive = archiveDataMock.find(
    (archive) => archive.archiveId === Number(archiveId)
  );

  const hasTickets = (archive?.Ticket?.length ?? 0) > 0;

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
            isMenu={true}
          />
          {/* 아카이브 달력 */}
          <Calendar
            labelData={labelDataMock as LabelData[]}
            stickerData={stickerDataMock}
            mode="interactive"
          />
          <div className="flex flex-col items-start justify-between gap-[60px] my-[60px]">
            {/* 덕질 일기 */}
            <ArchiveTitle
              title="덕질 일기"
              onClick={() => {
                console.log("덕질 일기 더보기 클릭");
              }}
              isMore={(archive?.Diary?.length ?? 0) > 0}
            />
            {archive?.Diary?.length ?? 0 > 0 ? (
              <DiaryList diary={archive?.Diary} />
            ) : (
              <EmptyList
                title="일기 추가"
                description="아직 작성된 일기가 없어요."
                onClick={() => {
                  console.log("일기 추가 버튼 클릭");
                }}
              />
            )}
            {/* 덕질 갤러리 */}
            <ArchiveTitle
              title="덕질 갤러리"
              onClick={() => {
                if (!archiveId) return;
                navigate(`/archive/${archiveId}/gallery`);
              }}
              isMore={(archive?.Gallery?.length ?? 0) > 0}
            />
            {archive?.Gallery?.length ?? 0 > 0 ? (
              <GalleryList gallery={archive?.Gallery} />
            ) : (
              <EmptyList
                title="사진 추가"
                description="사진을 추가해서 덕질 기록을 남겨보세요."
                startIcon={<Camera className="w-6 h-6 text-color-high" />}
                onClick={() => {
                  if (!archiveId) return;
                  navigate(`/archive/${archiveId}/gallery`);
                }}
              />
            )}
            {/* 티켓북 */}
            <ArchiveTitle
              title="티켓북"
              onClick={() => {
                if (!archiveId) return;
                navigate(`/archive/${archiveId}/ticket-book`);
              }}
              isMore={hasTickets}
            />
            {hasTickets ? (
              <TicketList ticket={archive?.Ticket} />
            ) : (
              <EmptyList
                title="티켓 추가"
                description="새로운 티켓을 추가해보세요."
                onClick={() => {
                  if (!archiveId) return;
                  navigate(`/archive/${archiveId}/ticket-book`);
                }}
              />
            )}
            {/* 덕질 리포스트 */}
            <ArchiveTitle
              title="덕질 리포스트"
              onClick={() => {
                if (!archiveId) return;
                navigate(`/archive/${archiveId}/repost`);
              }}
              isMore={(archive?.Repost?.length ?? 0) > 0}
            />
            {archive?.Repost?.length ?? 0 > 0 ? (
              <RepostList repost={archive?.Repost} />
            ) : (
              <EmptyList
                title="링크 첨부"
                description="링크를 모아서 아카이브를 만들어보세요."
                startIcon={<Link className="w-6 h-6 text-color-high" />}
                onClick={() => {
                  if (!archiveId) return;
                  navigate(`/archive/${archiveId}/repost`);
                }}
              />
            )}
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
