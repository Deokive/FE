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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetArchiveDetail } from "@/apis/queries/archive/getArchive";
import { DeleteArchive, LikeArchive, UpdateArchive } from "@/apis/mutations/archive/archive";
import { Visibility, type UpdateArchiveRequest } from "@/types/archive";
import { useFileUpload } from "@/hooks/useFileUpload";
import { MediaRole } from "@/enums/mediaRole";
import { useRef } from "react";

const ArchiveDetail = () => {
  const navigate = useNavigate();

  const urlParams = useParams();
  const archiveId = urlParams.archiveId;
  const archiveIdNum = Number(archiveId);
  const queryClient = useQueryClient(); // ✅ 전역 인스턴스 가져오기

  // ✅ 업로드 중복 실행 방지
  const uploadInProgressRef = useRef(false);

  const { data: archive } = useQuery({
    queryKey: ["archive", archiveIdNum],
    queryFn: () => GetArchiveDetail(archiveIdNum),
  });

  const updateArchiveMutation = useMutation({
    mutationFn: (data: UpdateArchiveRequest) => UpdateArchive(Number(archiveId), data),
    onSuccess: (updatedArchive) => {
      // ✅ 쿼리 캐시 업데이트
      queryClient.setQueryData(["archive", archiveIdNum], updatedArchive);

      uploadInProgressRef.current = false;
    },
    onError: () => {
      uploadInProgressRef.current = false; // 업로드 실패 시 상태 초기화
    },
  });

  const deleteArchiveMutation = useMutation({
    mutationFn: () => DeleteArchive(archiveIdNum),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["archive", archiveIdNum] });
      navigate("/archive");
    },
    onError: (error) => {
      console.error("아카이브 삭제 실패:", error);
      alert("아카이브 삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const likeArchiveMutation = useMutation({
    mutationFn: () => LikeArchive(archiveIdNum),
    onSuccess: (likedArchive) => {
      queryClient.setQueryData(["archive", archiveIdNum], likedArchive);
    },
    onError: (error) => {
      console.error("좋아요 실패:", error);
      alert("좋아요에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // ✅ useFileUpload - onSuccess를 직접 정의
  const { upload } = useFileUpload({
    onSuccess: (response) => {
      // ✅ 중복 실행 방지
      if (uploadInProgressRef.current || !response?.fileId) return;

      uploadInProgressRef.current = true;
      updateArchiveMutation.mutate({
        title: null,
        visibility: null,
        bannerImageId: response.fileId,
      });
    },
    onError: (error) => {
      console.error("배너 이미지 업로드 실패:", error);
      alert("배너 이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      uploadInProgressRef.current = false;
    },
  });
  // ✅ 아카이브명 저장 핸들러
  const handleTitleSave = (title: string) => {
    updateArchiveMutation.mutate({ title: title ?? null, visibility: null, bannerImageId: null });
  };
  // ✅ 배너 저장 핸들러 (파일 업로드 시작)
  const handleBannerSave = async (file: File) => {
    // ✅ 이미 업로드 중이면 무시
    if (uploadInProgressRef.current) {
      console.log("이미 업로드 중입니다.");
      return;
    }
    try {
      await upload({
        file,
        mediaRole: MediaRole.CONTENT,
      });
    } catch (error) {
      console.error("배너 업로드 시작 실패:", error);
      uploadInProgressRef.current = false;
    }
  };
  // ✅ 공개 기준 저장 핸들러
  const handleVisibilitySave = (visibility: Visibility) => {
    updateArchiveMutation.mutate({ visibility: visibility, bannerImageId: null, title: null });
  };
  // ✅ 아카이브 삭제 핸들러
  const handleDeleteArchive = () => {
    const confirmed = confirm(
      "아카이브와 내부에 포함된 모든 데이터가 영구 삭제됩니다.\n" +
      "정말 삭제하시겠습니까?"
    );

    if (confirmed) {
      deleteArchiveMutation.mutate();
    }
  };

  const archivedData = archiveDataMock.find(
    (archived) => archived.archiveId === Number(archiveId)
  );

  const hasTickets = (archivedData?.Ticket?.length ?? 0) > 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <Banner image={archive?.bannerUrl}
        isEdit={archive?.isOwner}
        onBannerSave={handleBannerSave}
      />
      {/* 배너 밑부분 */}
      <div className="max-w-[1920px] mx-auto flex flex-col items-start mt-[60px] gap-[60px]">
        <div className="w-310">
          {/* 아카이브 헤더 */}
          <ArchiveHeader
            isFeed={false}
            onTitleSave={(title) => {
              handleTitleSave(title);
            }}
            title={archive?.title}
            ownerNickname={archive?.ownerNickname}
            badge={archive?.badge}
            createdAt={archive?.createdAt}
            isMenu={true}
            onVisibilitySave={handleVisibilitySave}
            visibility={archive?.visibility}
            onDeleteArchive={handleDeleteArchive}
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
                if (!archiveId) return;
                navigate(`/archive/${archiveId}/diary`);
              }}
              isMore={(archivedData?.Diary?.length ?? 0) > 0}
            />
            {archivedData?.Diary?.length ?? 0 > 0 ? (
              <DiaryList diary={archivedData?.Diary} limit={3} />
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
              isMore={(archivedData?.Gallery?.length ?? 0) > 0}
            />
            {archivedData?.Gallery?.length ?? 0 > 0 ? (
              <GalleryList gallery={archivedData?.Gallery} />
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
              <TicketList ticket={archivedData?.Ticket} />
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
              isMore={(archivedData?.Repost?.length ?? 0) > 0}
            />
            {archivedData?.Repost?.length ?? 0 > 0 ? (
              <RepostList repost={archivedData?.Repost} />
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
            liked={archive?.isLiked}
            likeCount={archive?.likeCount}
            onClick={() => {
              likeArchiveMutation.mutate();
              console.log("좋아요 클릭");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArchiveDetail;
