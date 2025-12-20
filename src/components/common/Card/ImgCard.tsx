import { useState } from "react";
import { twMerge } from "tailwind-merge";
import vectorIcon from "@/assets/icon/Vector.svg";
import { X } from "lucide-react";

type CardType = "representative" | "normal";

interface ImgCardProps {
  onClick: () => void;
  selected?: boolean;
  onDelete?: () => void; // 대표이미지 삭제 시 호출
  img?: string;
  // children: React.ReactNode;
  type?: CardType; //default: normal
  className?: string;
}

const ImgCard = ({
  onClick,
  selected = false,
  onDelete,
  img,
  type = "normal",
  className,
}: ImgCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const base =
    "w-[360px] h-[180px] rounded-[8px] text-color-lowest flex items-center justify-center relative overflow-hidden cursor-pointer";
  const representative =
    "bg-surface-container-20 border-2 border-color-primary border-solid";
  const normal = "bg-surface-container-10";
  const enabled = "bg-surface-container-20";
  const hover = "hover:bg-surface-container-30";
  const selectedCls = "border-2 border-color-primary border-solid ";

  const typeCls = type === "representative" ? representative : normal;

  // 이미지가 없거나 로드 실패했거나 아직 로딩 중일 때 벡터 아이콘 표시
  const showIcon = !img || !imageLoaded || imageError;

  return (
    <div
      onClick={onClick}
      className={twMerge(
        base,
        typeCls,
        enabled,
        selected ? selectedCls : enabled,
        type === "representative" ? "cursor-default" : hover,
        className
      )}
    >
      {type === "representative" && (
        <div className="absolute top-0 left-0 bg-brand-blue-400 text-text-lowest px-4 py-2 rounded-tl-[6px]">
          <p className="typo-body2-semibold">대표</p>
        </div>
      )}
      {/* X 버튼 - 오른쪽 상단 */}
      {type === "representative" && onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
            onDelete();
          }}
          className="absolute flex flex-col items-center justify-center top-[12px] right-[19px] w-[30px] h-[30px] 
          rounded-[20px] opacity-50 bg-[#7D9AB2] z-20 hover:opacity-70"
          aria-label="삭제"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      )}
      {img && (
        <img
          src={img}
          alt="img"
          className={twMerge(
            "w-full h-full object-cover absolute inset-0",
            imageLoaded && !imageError ? "block" : "hidden"
          )}
          onLoad={() => {
            setImageLoaded(true);
            setImageError(false);
          }}
          onError={() => {
            setImageError(true);
            setImageLoaded(false);
          }}
        />
      )}
      {/* 벡터 아이콘: 이미지가 없거나 로드 실패했거나 로딩 중일 때만 표시 */}
      {showIcon && (
        <div className="flex items-center justify-center">
          <img src={vectorIcon} alt="icon" className="w-[43px] h-[31px]" />
        </div>
      )}
    </div>
  );
};

export default ImgCard;
