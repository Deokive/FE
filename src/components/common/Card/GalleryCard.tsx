import vectorIcon from "@/assets/icon/Vector.svg";
import { useState } from "react";

interface GalleryCardProps {
  id?: number;
  archiveId?: number;
  image?: string;
  onClick?: () => void;
}

const GalleryCard = ({ id, archiveId, image, onClick }: GalleryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasImage = !!image;
  const isLoading = hasImage && !imageLoaded && !imageError;
  const showFallbackIcon = !hasImage || imageError;
  return (
    <button
      data-gallery-id={id}
      data-archive-id={archiveId}
      onClick={onClick}
      type="button"
      className="flex flex-col items-center justify-center w-90 h-75 rounded-[10px] 
      bg-surface-container-20 cursor-pointer"
    >
      <div className="flex items-center justify-center w-full h-full">
        {hasImage && imageLoaded && !imageError && (
          <img
            src={image}
            alt="gallery"
            className="w-full h-full object-cover rounded-[10px]"
          />
        )}

        {isLoading && <p className="typo-body2 text-color-mid">로딩중...</p>}

        {showFallbackIcon && !isLoading && (
          <img src={vectorIcon} alt="gallery" className="w-[43px] h-[31px]" />
        )}

        {hasImage && (
          <img
            src={image}
            alt="preload"
            className="hidden"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>
    </button>
  );
};

export default GalleryCard;
