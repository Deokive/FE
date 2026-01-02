import HeartIcon from "@/assets/Icon/HeartIcon";
import { useState } from "react";

interface ButtonLikeProps {
  liked?: boolean;
  likeCount?: number;
  onClick: () => void;
}

const ButtonLike = ({
  liked: initialLiked = false,
  likeCount: initialLikeCount = 0,
  onClick,
}: ButtonLikeProps) => {
  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);

  const handleClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
    onClick?.();
  };

  return (
    <div className="w-full flex flex-col items-end">
      <button
        type="button"
        className="flex items-center justify-center h-11 gap-2.5 rounded-lg bg-surface-container-10 p-2.5 cursor-pointer"
        onClick={handleClick}
      >
        {liked ? (
          <HeartIcon filled={liked} disabled={true} />
        ) : (
          <HeartIcon filled={liked} disabled={false} />
        )}
        <span className="typo-body2-mid text-color-highest">좋아요</span>
        <div className="w-0.5 h-[16px] bg-surface-container-30" />
        <span className="typo-body2-mid text-color-highest">{likeCount}</span>
      </button>
    </div>
  );
};

export default ButtonLike;
