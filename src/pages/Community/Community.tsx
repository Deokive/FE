import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import CommunityTab from "@/components/community/CommunityTab";
import CommunityCard from "@/components/community/CommunityCard";
import Pagination from "@/components/common/Pagination";
import { BtnIcon } from "@/components/common/Button/Btn";
import SelectBox from "@/components/common/Button/SelectBox";
import type { Sort } from "@/enums/sort";

type ListOption = { label: string; value: string };

const LIST_OPTIONS: ListOption[] = [
  { label: "최신 순", value: "newest" },
  { label: "조회수 순", value: "popular" },
  { label: "좋아요 순", value: "like" },
];

const Community = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("all");
  const [page, setPage] = useState<number>(1);

  // 테스트용 데이터 10개
  const posts = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        title: `테스트 제목 ${i + 1}`,
        categoryLabel: i % 2 === 0 ? "아이돌" : "기타",
        categoryValue: i % 2 === 0 ? "idol" : "etc",
        content: "테스트 본문",
        img: undefined,
      })),
    []
  );

  // 필터 적용 (category 비교를 소문자로 통일)
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (category === "all") return true;
      return (
        String(p.categoryValue).toLowerCase() === String(category).toLowerCase()
      );
    });
  }, [posts, category]);

  const totalItems = filteredPosts.length;
  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // category 또는 sortBy 변경 시 페이지 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [category, sortBy]);

  // totalPages 변화로 현재 page가 범위를 벗어나면 보정
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  // current page items: 반드시 선언되어 있어야 함
  const start = (page - 1) * pageSize;
  const currentItems = useMemo(() => {
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, start, pageSize]);

  // robust page change handler (Pagination이 0-based/1-based 중 어느걸 보내도 안전하게 처리)
  const handlePageChange = (p: number) => {
    if (typeof p !== "number" || Number.isNaN(p)) return;
    if (p === 0) {
      setPage(1);
      return;
    }
    if (p >= 1 && p <= totalPages) {
      setPage(p);
      return;
    }
    const maybeOneBased = p + 1;
    if (maybeOneBased >= 1 && maybeOneBased <= totalPages) {
      setPage(maybeOneBased);
      return;
    }
    const clamped = Math.max(1, Math.min(totalPages, Math.floor(p)));
    setPage(clamped);
  };

  return (
    <div>
      <div className="py-15 flex justify-center items-center">
        <CommunityTab value={category} onChange={setCategory} />
      </div>
      <div className="flex justify-center">
        <div className="max-w-310">
          <div className="flex flex-row gap-5 justify-end">
            <BtnIcon
              onClick={() => navigate("/community/new")}
              startIcon={
                <Pencil className="w-[16.5px] h-[17.5px] text-color-high" />
              }
            >
              글쓰기
            </BtnIcon>
            <SelectBox
              options={LIST_OPTIONS}
              value={sortBy as Sort}
              onChange={setSortBy}
            />
          </div>
          <div className="mt-5 mb-15">
            <div className="w-310">
              {totalItems === 0 ? (
                // 빈 상태: 카드 영역과 동일한 가로 중앙에 텍스트 배치
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-center justify-center"
                  style={{ minHeight: "480px" }}
                >
                  <p className="text-center typo-h2 text-color-low">
                    새로운 덕질 이야기를 기다리고 있어요.
                  </p>
                </div>
              ) : (
                <div
                  className="grid grid-cols-3 gap-x-20 gap-y-8"
                  style={{
                    gridTemplateColumns: "repeat(3, 360px)",
                    rowGap: "32px",
                  }}
                >
                  {currentItems.map((post) => (
                    <CommunityCard
                      key={post.id}
                      title={post.title}
                      categoryLabel={post.categoryLabel}
                      categoryValue={post.categoryValue}
                      content={post.content}
                      img={post.img}
                      onClick={() => navigate(`/community/${post.id}`)}
                      onClickShare={() => console.log(`${post.id} 공유`)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {totalItems > 0 && (
        <div className="flex justify-center mb-12">
          <Pagination
            totalItems={totalItems}
            pageSize={pageSize}
            visiblePages={5}
            currentPage={page}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Community;
