import type { SelectBoxOption } from "@/components/common/Button/SelectBox";
import SelectBox from "@/components/common/Button/SelectBox";
import Pagination from "@/components/common/Pagination";
import FeedCard from "@/components/feed/FeedCard";
import { feedDataMock } from "@/mockData/feedData";
import { useState } from "react";

const FEED_OPTIONS: SelectBoxOption[] = [
  { label: "조회수 순", value: "popular" },
  { label: "좋아요 순", value: "like" },
];

const Feed = () => {
  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  const feedData = feedDataMock;

  const [option, setOption] = useState<string>("popular");
  return (
    <div className="my-[60px]">
      <div className="h-full w-full px-[340px] my-[60px] flex flex-col items-start justify-center">
        {/* SelectBox를 오른쪽으로 정렬 */}
        <div className="flex items-center justify-end w-full mb-[40px]">
          <SelectBox
            options={FEED_OPTIONS}
            value={option}
            onChange={setOption}
          />
        </div>

        <div className="flex flex-wrap gap-x-[80px] gap-y-[60px] w-[1240px]">
          {feedData.map((feed) => (
            <FeedCard
              key={feed.id}
              image={feed.image}
              title={feed.title}
              onClick={() => console.log("클릭:", feed.id)}
            />
          ))}
        </div>
      </div>
      <Pagination
        className="px-[340px] w-full flex justify-center items-center mb-[70px]"
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
