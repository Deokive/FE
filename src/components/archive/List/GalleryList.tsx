import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import GalleryCard from "@/components/common/Card/GalleryCard";
import ArchiveTitle from "@/components/archive/ArchiveTitle";
import EmptyList from "@/components/archive/Empty/EmptyList";
import EmptyFeedList from "@/components/feed/EmptyFeedList";
import { archiveDataMock } from "@/mockData/archiveData";

interface GalleryListProps {
  archiveId?: string;
  limit?: number;
  isOwner?: boolean;
  emptyDescription?: string;
}

const GalleryList = ({
  archiveId,
  limit = 3,
  isOwner = false,
  emptyDescription = "사진을 추가해서 덕질 기록을 남겨보세요.",
}: GalleryListProps) => {
  const navigate = useNavigate();

  // TODO: API 연동 시 교체
  const archivedData = archiveDataMock.find(
    (archived) => archived.archiveId === Number(archiveId)
  );
  const galleryList = archivedData?.Gallery?.slice(0, limit) ?? [];
  const hasGallery = galleryList.length > 0;

  const handleNavigateToGallery = () => {
    if (!archiveId) return;
    navigate(`/archive/${archiveId}/gallery`);
  };

  return (
    <>
      <ArchiveTitle
        title="덕질 갤러리"
        onClick={handleNavigateToGallery}
        isMore={hasGallery}
        isEditable={isOwner}
      />
      {hasGallery ? (
        <div className="w-full flex flex-col items-start gap-[60px]">
          <div className="flex items-start justify-between gap-[80px]">
            {galleryList.map((gallery) => (
              <GalleryCard
                key={gallery.id}
                id={gallery.id}
                archiveId={gallery.archiveId}
                image={gallery.image}
                onClick={() => {
                  console.log(gallery.id + "번 갤러리 클릭");
                }}
              />
            ))}
          </div>
        </div>
      ) : isOwner ? (
        <EmptyList
          title="사진 추가"
          description={emptyDescription}
          startIcon={<Camera className="w-6 h-6 text-color-high" />}
          onClick={handleNavigateToGallery}
        />
      ) : (
        <EmptyFeedList description={emptyDescription} />
      )}
    </>
  );
};

export default GalleryList;
