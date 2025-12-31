import type { SelectBoxOption } from "@/components/common/Button/SelectBox";
import SelectBox from "@/components/common/Button/SelectBox";
import Pagination from "@/components/common/Pagination";
import FeedCard from "@/components/feed/FeedCard";
import { feedDataMock } from "@/mockData/feedData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FEED_OPTIONS: SelectBoxOption[] = [
  { label: "조회수 순", value: "popular" },
  { label: "좋아요 순", value: "like" },
];

const Feed = () => {
  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  const feedData = feedDataMock;

  const navigate = useNavigate();

  const [option, setOption] = useState<string>("popular");
  return (
    <div className="flex flex-col items-center justify-center my-[60px]">
      <div className="max-w-[1920px] mx-auto mb-[60px]">
        {/* SelectBox를 오른쪽으로 정렬 */}
        <div className="w-310 flex justify-end mb-[40px]">
          <SelectBox
            options={FEED_OPTIONS}
            value={option}
            onChange={setOption}
          />
        </div>

        <div className="w-310 flex flex-wrap gap-x-[80px] gap-y-[60px]">
          {feedData.map((feed) => (
            <FeedCard
              key={feed.id}
              image={feed.image}
              title={feed.title}
              onClick={() => {
                navigate(`/feed/${feed.archiveId}`);
                console.log(feed.archiveId + "번 피드 클릭");
              }}
            />
          ))}
        </div>
      </div>
      <Pagination
        className="w-310 flex justify-center items-center mx-auto mb-[70px]"
        totalItems={feedData.length}
        pageSize={10}
        visiblePages={5}
        currentPage={1}
        onChange={() => {}}
      />
    </div>
  );
};

export default Feed;
