import Pagination from "@/components/common/Pagination";
import FeedCard from "@/components/feed/FeedCard";

const Feed = () => {
  return (
    <div className="mb-[60px]">
      <div className="h-full px-[340px] my-[60px] flex flex-col items-start justify-center gap-[60px]">
        <FeedCard image="https://picsum.photos/200/300" onClick={() => {}} />
        <FeedCard onClick={() => {}} />
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
