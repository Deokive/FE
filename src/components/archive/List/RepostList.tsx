import RepostCard from "@/components/common/Card/RepostCard";

interface Repost {
  id?: number;
  archiveId?: number;
  tabId?: number;
  title?: string;
  image?: string;
  onClick?: () => void;
}

interface RepostListProps {
  repost?: Repost[];
}
const RepostList = ({ repost }: RepostListProps) => {
  return (
    <div className="w-full flex flex-col items-start gap-[60px]">
      {/* 덕질 리포스트 리스트부분 */}
      <div className="flex items-start justify-between gap-[80px]">
        {repost?.slice(0, 3).map((repost) => (
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
