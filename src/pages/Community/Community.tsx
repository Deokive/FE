import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import CommunityTab from "@/components/community/CommunityTab";
import CommunityCard from "@/components/community/CommunityCard";
import Pagination from "@/components/common/Pagination";
import { BtnBasic, BtnIcon } from "@/components/common/Button/Btn";
import SelectBox from "@/components/common/Button/SelectBox";

type ListOption = { label: string; value: string };

const LIST_OPTIONS: ListOption[] = [
  { label: "전체", value: "all" },
  { label: "좋아요 순", value: "like" },
  { label: "조회수 순", value: "popular" },
];

const Community = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState("all");
  const [page, setPage] = useState(1);

  const posts = [
    {
      id: 1,
      title: "아이돌 게시물 테스트",
      categoryLabel: "아이돌",
      categoryValue: "idol",

      content:
        "게시글 본문은 최대 1줄까지만 노출됩니다. 긴 본문은 말줄임 처리되어야 합니다. 이 문장은 테스트용 더미 텍스트입니다.",
      img: undefined,
    },
    {
      id: 2,
      title: "배우 게시물 테스트",
      categoryLabel: "배우",
      categoryValue: "actor",
      content:
        "게시글 본문은 최대 1줄까지만 노출됩니다. 긴 본문은 말줄임 처리되어야 합니다. 이 문장은 테스트용 더미 텍스트입니다.",
      img: undefined,
    },
    {
      id: 3,
      title: "기타 게시물 테스트",
      categoryLabel: "기타",
      categoryValue: "etc",
      content:
        "게시글 본문은 최대 1줄까지만 노출됩니다. 긴 본문은 말줄임 처리되어야 합니다. 이 문장은 테스트용 더미 텍스트입니다.",
      img: undefined,
    },
  ];

  const filteredPosts = posts.filter((p) => {
    if (category === "all") return true;
    return (
      String(p.categoryValue).toLowerCase() === String(category).toLowerCase()
    );
  });

  const totalItems = filteredPosts.length;
  const pageSize = 9; // 한 페이지에 보여줄 아이템 수
  // 현재 페이지에 보여줄 아이템
  const start = (page - 1) * pageSize;
  const currentItems = filteredPosts.slice(start, start + pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [category]);

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
              value={sortBy}
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
                      onClick={() => navigate("/community/${post.id}")}
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
            onChange={(p) => setPage(p)}
            className="fixed-bottom-20"
          />
        </div>
      )}
    </div>
  );
};

export default Community;
