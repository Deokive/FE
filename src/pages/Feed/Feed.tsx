import type { SelectBoxOption } from "@/components/common/Button/SelectBox";
import SelectBox from "@/components/common/Button/SelectBox";
import Pagination from "@/components/common/Pagination";
import FeedCard from "@/components/feed/FeedCard";
import { useState } from "react";

const FEED_OPTIONS: SelectBoxOption[] = [
  { label: "좋아요 순", value: "like" },
  { label: "조회수 순", value: "popular" },
];

const Feed = () => {
  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  const feedData = [
    {
      id: 1,
      image: "https://picsum.photos/201/300",
      title: "랜덤 이미지 1",
    },
    { id: 2, image: "", title: "빈 이미지 1" },
    {
      id: 3,
      image: "https://picsum.photos/202/300",
      title: "랜덤 이미지 2",
    },
    {
      id: 4,
      image: "https://picsum.photos/203/300",
      title: "랜덤 이미지 3",
    },
    { id: 5, image: "", title: "빈 이미지 2" },
    {
      id: 6,
      image: "https://picsum.photos/204/300",
      title: "랜덤 이미지 4",
    },
    { id: 7, image: "", title: "빈 이미지 3" },
    { id: 8, image: "", title: "빈 이미지 4" },
    { id: 9, image: "", title: "빈 이미지 5" },
    { id: 10, image: "", title: "빈 이미지 6" },
  ];

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
        className="px-[340px] w-full flex justify-center items-center"
        totalItems={10}
        pageSize={10}
        visiblePages={5}
        currentPage={1}
        onChange={() => {}}
      />
    </div>
  );
};

export default Feed;
