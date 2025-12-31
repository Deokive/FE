import { useEffect, useState } from "react";
import vectorIcon from "@/assets/icon/VectorGray.svg";
import { twMerge } from "tailwind-merge";
import CheckboxIcon from "@/assets/Icon/CheckboxIcon";

interface ArchiveCardProps {
  archiveId?: number;
  userId?: number;
  title?: string;
  bannerUrl?: string;
  image?: string;
  viewCount?: number;
  likeCount?: number;
  onClick?: () => void;
}
// 편집 모드일 때 카드에 클릭 버튼 추가하기 위한 props
type Props = ArchiveCardProps & {
  isEditMode?: boolean;
};
const ArchiveCard = ({
  archiveId,
  userId,
  title,
  bannerUrl,
  image,
  onClick,
  isEditMode = false,
}: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // 편집 모드가 해제되면 선택 상태도 초기화
  useEffect(() => {
    if (!isEditMode) {
      setIsSelected(false);
    }
  }, [isEditMode]);

  const hasImage = !!image;
  const isLoading = hasImage && !imageLoaded && !imageError;
  const showFallbackIcon = !hasImage || imageError;

  // 편집 모드일 때 카드 클릭 시 체크박스 토글
  const handleCardClick = () => {
    if (isEditMode) {
      setIsSelected((prev) => !prev);
    } else {
      onClick?.();
    }
  };

  return (
    <div
      data-archive-id={archiveId}
      data-user-id={userId}
      data-banner-url={bannerUrl}
      onClick={handleCardClick}
      className="pt-[25px] px-5 flex flex-col items-center justify-center w-90 h-75 rounded-[10px] bg-brand-blue-400 cursor-pointer"
    >
      {/* 이미지 영역 */}
      <div className="relative w-[321px] h-[179px] rounded-t-[10px] bg-white flex items-center justify-center overflow-hidden">
        {/* 편집 모드일 때 왼쪽 위 체크박스 */}
        {isEditMode && (
          <div className="absolute top-4 left-5 z-10">
            <CheckboxIcon checked={isSelected} disabled={false} size={24} />
          </div>
        )}
        {/* 1) 이미지가 있고, 로딩 성공 */}
        {hasImage && imageLoaded && !imageError && (
          <>
            <img
              src={image}
              alt="image"
              className={twMerge(
                "w-full h-full object-cover rounded-t-[10px] transition-opacity pointer-events-none",
                isSelected && "opacity-50 select-none"
              )}
            />
            {/* 선택 시 오버레이 (linear-gradient 효과) */}
            {isSelected && (
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent rounded-t-[10px] pointer-events-none" />
            )}
          </>
        )}

        {/* 2) 이미지가 있고, 로딩 중 */}
        {isLoading && <p className="typo-body2 text-color-mid">로딩중...</p>}

        {/* 3) 이미지가 없거나 로딩 실패 */}
        {showFallbackIcon && !isLoading && (
          <div className="relative">
            <img
              src={vectorIcon}
              alt="icon"
              className="w-[43px] h-[31px] select-none "
            />
            {/* 선택 시 오버레이 */}
            {isSelected && (
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent rounded-t-[10px]" />
            )}
          </div>
        )}
        {/* 4) 이미지가 있고, 로딩 성공 후 숨김 처리 */}
        {hasImage && (
          <img
            src={image}
            alt="preload"
            className="hidden pointer-events-none"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <div className="bottom-0 w-90 h-24 rounded-b-[10px] bg-brand-blue-300">
        <p className="flex items-center h-24 px-5 typo-body1-semibold text-color-highest">
          {title ? title : "사용자가 지정한 아카이브 파일명"}
        </p>
      </div>
    </div>
  );
};

export default ArchiveCard;
