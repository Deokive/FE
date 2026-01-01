import GalleryCard from "../common/Card/GalleryCard";

interface Gallery {
  id?: number;
  archiveId?: number;
  image?: string;
  onClick?: () => void;
}
interface GalleryListProps {
  gallery?: Gallery[];
}

const GalleryList = ({ gallery }: GalleryListProps) => {
  return (
    <div className="w-full flex flex-col items-start gap-[60px]">
      {/* 갤러리 리스트부분 */}
      <div className="flex items-start justify-between gap-[80px]">
        {gallery?.slice(0, 3).map((gallery) => (
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
  );
};

export default GalleryList;
