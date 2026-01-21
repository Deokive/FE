import { GetArchiveFeed } from "@/apis/queries/archive/getArchive";
import type { SelectBoxOption } from "@/components/common/Button/SelectBox";
import SelectBox from "@/components/common/Button/SelectBox";
import Pagination from "@/components/common/Pagination";
import FeedCard from "@/components/feed/FeedCard";
import { Sort } from "@/enums/sort";
import { feedDataMock } from "@/mockData/feedData";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FEED_OPTIONS: SelectBoxOption[] = [
  { label: "조회수 순", value: "popular" },
  { label: "좋아요 순", value: "like" },
];

const Feed = () => {
  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  // const feedData = feedDataMock;

  // ✅ 페이지 상태 (1부터 시작)
  const [page, setPage] = useState(1);
  const pageSize = 9;
  // const navigate = useNavigate();

  const { data: feedData, isLoading, isError } = useQuery({
    queryKey: ["feed", page, pageSize],
    queryFn: () => GetArchiveFeed({
      page: page - 1,
      size: pageSize,
      sort: Sort.CREATED_AT,
      direction: "DESC",
    }),
  });

  const feed = feedData?.content ?? [];
  console.log(feed);

  const navigate = useNavigate();

  const [option, setOption] = useState<string>("popular");
  return (
    <div className="flex flex-col items-center justify-center my-15">
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
          {feed.map((feed) => (
            <FeedCard
              key={feed.archiveId}
              id={feed.archiveId}
              image={feed.thumbnailUrl}
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
        className="w-310 flex justify-center items-center mx-auto"
        totalItems={feedData?.page.totalElements ?? 0}
        pageSize={pageSize}
        currentPage={page}
        visiblePages={5}
        onChange={(nextPage) => {
          setPage(nextPage);
        }}
      />
    </div>
  );
};

export default Feed;
