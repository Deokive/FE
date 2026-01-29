import { GetArchiveFeed } from "@/apis/queries/archive/getArchive";
import ArchiveTitle from "@/components/archive/ArchiveTitle";
import FeedCard from "@/components/feed/FeedCard";
import { Sort } from "@/enums/sort";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const { data: hotFeedData } = useQuery({
    queryKey: ["hotFeed"],
    queryFn: () => GetArchiveFeed({
      page: 0,
      size: 3,
      sort: Sort.HOT_SCORE,
      direction: "DESC",
    })
  });

  const hotFeed = hotFeedData?.content ?? [];
  console.log(hotFeed);
  return (
    <div className="flex flex-col items-center justify-center my-15">
      <div className="max-w-[1920px] mx-auto flex flex-col items-center gap-[60px]">
        <div className="w-310">
          <div className="flex flex-col items-center justify-between gap-[60px] my-[60px]">
            {/* 아카이브 만들기 */}
            <ArchiveTitle
              title="아카이브 만들기"
              isEditable={true}
              onClick={() => {
                navigate("/archive");
              }}
            />
            {/* 지금 핫한 피드 */}
            <ArchiveTitle
              title="지금 핫한 피드"
              isEditable={false}
              onClick={() => {
                navigate("/feed");
              }}
            />
            <div className="w-full flex gap-20 ">
              {hotFeed.map((hotFeed) => (
                <FeedCard
                  key={hotFeed.archiveId}
                  id={hotFeed.archiveId}
                  image={hotFeed.thumbnailUrl}
                  title={hotFeed.title}
                  onClick={() => {
                    navigate(`/feed/${hotFeed.archiveId}`);
                    console.log(hotFeed.archiveId + "번 피드 클릭");
                  }}
                />
              ))}
            </div>
            {/* 지금 핫한 커뮤니티 게시글 */}
            <ArchiveTitle
              title="지금 핫한 커뮤니티 게시글"
              isEditable={false}
              onClick={() => {
                navigate("/community");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
