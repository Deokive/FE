import RepostCard from "../common/Card/RepostCard";

interface Repost {
  id?: number;
  archiveId?: number;
  tabId?: number;
  title?: string;
  image?: string;
  onClick?: () => void;
}

interface RepostListProps {
  repost: Repost[];
}
const RepostList = ({ repost }: RepostListProps) => {
  return (
    <div className="w-full flex flex-col items-start gap-[60px]">
      {/* 덕질 리포스트 헤더부분 */}
      <div className="w-full flex gap-[10px]">
        <p className="flex-1 typo-h1 text-color-highest">덕질 리포스트</p>
        <button
          onClick={() => {
            console.log("더보기 클릭");
          }}
          className="h-[29px] flex items-start justify-end typo-h2-semibold text-color-high cursor-pointer"
        >
          + 더보기
        </button>
      </div>
      {/* 덕질 리포스트 리스트부분 */}
      <div className="flex items-start justify-between gap-[80px]">
        {repost.slice(0, 3).map((repost) => (
          <RepostCard
            key={repost.id}
            archiveId={repost.archiveId}
            title={repost.title}
            image={repost.image}
            onClick={() => {
              console.log(repost.id + "번 덕질 리포스트 클릭");
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RepostList;
