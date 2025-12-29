import GalleryCard from "./GalleryCard";

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
      {/* 갤러리 헤더부분 */}
      <div className="w-full flex gap-[10px]">
        <p className="flex-1 typo-h1 text-color-highest">덕질 갤러리</p>
        <button
          onClick={() => {
            console.log("더보기 클릭");
          }}
          className="h-[29px] flex items-start justify-end typo-h2-semibold text-color-high cursor-pointer"
        >
          + 더보기
        </button>
      </div>
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
