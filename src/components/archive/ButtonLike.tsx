// src/components/archive/ButtonLike.tsx
import HeartIcon from "@/assets/icon/HeartIcon";

interface ButtonLikeProps {
  liked?: boolean;
  likeCount?: number;
  onClick: () => void;
}

const ButtonLike = ({
  liked = false,
  likeCount = 0,
  onClick,
}: ButtonLikeProps) => {
  return (
    <div className="w-full flex flex-col items-end py-10">
      <button
        type="button"
        className="flex items-center justify-center h-11 gap-2.5 rounded-lg bg-surface-container-10 p-2.5 cursor-pointer"
        onClick={onClick}
      >
        <HeartIcon filled={liked} disabled={liked} />
        <span className="typo-body2-mid text-color-highest">좋아요</span>
        <div className="w-0.5 h-[16px] bg-surface-container-30" />
        <span className="typo-body2-mid text-color-highest">
          {likeCount}
        </span>
      </button>
    </div>
  );
};

export default ButtonLike;