import Pagination from "@/components/common/Pagination";
import FeedCard from "@/components/feed/FeedCard";

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
  return (
    <div className="mb-[60px]">
      <div className="h-full w-full px-[340px] my-[60px] flex flex-col items-start justify-center">
        {/* 3열 격자 레이아웃 */}
        <div className="grid grid-cols-3 gap-[50px] w-[1240px]">
          {feedData.map((feed) => (
            <div className="w-[360px] flex gap-auto justify-between items-start">
              <FeedCard
                key={feed.id}
                image={feed.image}
                title={feed.title}
                onClick={() => console.log("클릭:", feed.id)}
              />
            </div>
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
