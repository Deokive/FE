import vectorIcon from "@/assets/icon/Vector.svg";
import shareIcon from "@/assets/icon/share.svg";

interface CommunityCardProps {
  title?: string;
  category?: string;
  content?: string;
  img?: string;
  onClick?: () => void; // 클릭 시 이벤트
  onClickShare?: () => void; // 공유 시 이벤트
}

const CommunityCard = ({
  title,
  category,
  content,
  img,
  onClick,
  onClickShare,
}: CommunityCardProps) => {
  return (
    <div
      onClick={(e) => {
        // 공유 버튼이나 그 자식 요소를 클릭한 경우 카드 클릭 이벤트 실행 안 함
        const target = e.target as HTMLElement;
        if (target.closest("button")) {
          return;
        }
        onClick?.();
      }}
      className="w-[360px] h-[315px] rounded-[8px] bg-surface-container-10 cursor-pointer"
    >
      {/* 타이틀 */}
      <div className="flex w-[360px] h-[58px] px-5 py-3 items-center ">
        <p className="typo-h3-semibold text-color-highest">
          {title ? title : "게시물 제목"}
        </p>
      </div>
      {/* 이미지 */}
      <div className="flex items-center justify-center w-[360px] h-[180px] bg-surface-container-20">
        {img && (
          <img src={img} alt="img" className="w-full h-full object-cover" />
        )}
        {!img && (
          <img src={vectorIcon} alt="icon" className="w-[43px] h-[31px]" />
        )}
      </div>
      {/* 카테코리 & 게시글 내용 */}
      <div className="flex flex-col w-[360px] h-[77px] px-5 py-3">
        <p className="typo-caption text-color-high">
          {category ? category : "카테고리"}
        </p>
        <div className="flex items-center w-[320px] h-[24px] gap-2">
          <p className="w-full typo-body2 text-color-highest">
            {content ? content : "게시글 내용"}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClickShare?.();
            }}
            className="cursor-pointer hover:opacity-70 active:opacity-50"
          >
            <img src={shareIcon} alt="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
