// src/components/common/Icon/HeartIcon.tsx
import { Heart } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface HeartIconProps {
  /** 좋아요 상태 (true: 채워진 하트, false: 빈 하트) */
  filled?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 아이콘 크기 (기본: 24px) */
  size?: number;
  /** 커스텀 클래스명 */
  className?: string;
}

const HeartIcon = ({
  filled = false,
  disabled = false,
  size = 24,
  className,
}: HeartIconProps) => {
  return (
    <Heart
      size={size}
      className={twMerge(
        "transition-colors",
        filled
          ? "fill-[#82BEF5] text-[#82BEF5]" // 채워진 하트 (빨간색)
          : "fill-[#CBD5DF] text-[#CBD5DF]", // 빈 하트 (회색)
        disabled && "opacity-50  pointer-events-none",
        !disabled && "hover:fill-[#7D9AB2] hover:text-[#7D9AB2]", // 호버 시 하트 색상 변경
        className
      )}
    />
  );
};

export default HeartIcon;
