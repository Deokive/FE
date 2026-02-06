import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getPosts,
  // mapCategoryToServer,
} from "@/apis/queries/community/getPost";
import type { PostItem } from "@/apis/queries/community/getPost";
import { mapCategoryToLabel } from "@/utils/categoryMapper";
import { Pencil } from "lucide-react";
import CommunityTab from "@/components/community/CommunityTab";
import CommunityCard from "@/components/community/CommunityCard";
import CommunityListSkeleton from "@/components/community/CommunityListSkeleton";
import Pagination from "@/components/common/Pagination";
import { BtnIcon } from "@/components/common/Button/Btn";
import SelectBox from "@/components/common/Button/SelectBox";
import { SORT_OPTIONS } from "@/constants/community";
import { CommunitySortBy } from "@/enums/communitySortBy";

const Community = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || undefined;
  const sortBy = (searchParams.get("sortBy") as CommunitySortBy) || CommunitySortBy.NEWEST;
  const page = Number(searchParams.get("page")) || 1;
  const size = 9;

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const updateSearchParams = (updates: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams);
  };

  const tabValueForUi = category ?? "ALL";
  const handleTabChange = (v: string) => {
    updateSearchParams({
      category: v === "ALL" ? undefined : v,
      page: "1",
    });
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPosts({ page, size, category, sortBy });
      setPosts(res.content ?? []);
      setTotalPages(res.page?.totalPages ?? 1);
      setTotalItems(res.page?.totalElements ?? res.content?.length ?? 0);
    } catch (err) {
      console.error("getPosts error", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, category, sortBy]);

  const handlePageChange = (p: number) => {
    const newPage = p <= 0 ? 1 : p;
    updateSearchParams({ page: String(newPage) });
  };

  const handleSortChange = (v: CommunitySortBy) => {
    updateSearchParams({ sortBy: v, page: "1" });
  };

  const handleShare = useCallback(async (postId: number | string) => {
    const SHARE_BASE = "https://deokive.hooby-server.com/share/posts";
    const id = encodeURIComponent(String(postId));
    const url = `${SHARE_BASE}/${id}`;

    try {
      // 클립보드 API 사용 시도
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // 폴백: textarea를 만들어 복사
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
        } catch {}
        document.body.removeChild(textarea);
      }

      // 기본 브라우저 알림 사용
      window.alert("공유 URL이 클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("복사 실패:", err);
      window.alert("URL 복사에 실패했습니다. 다시 시도해 주세요.");
    }
  }, []);

  return (
    <div>
      <div className="py-15 flex justify-center items-center">
        <CommunityTab value={tabValueForUi} onChange={handleTabChange} />
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
              options={SORT_OPTIONS}
              value={sortBy}
              onChange={handleSortChange}
            />
          </div>
          <div className="mt-5 mb-15">
            <div className="w-310">
              {loading ? (
                <CommunityListSkeleton count={size} />
              ) : error ? (
                <div className="min-h-[480px] flex items-center justify-center typo-h2 text-color-low">
                  게시물을 불러오지 못했습니다.
                </div>
              ) : totalItems === 0 ? (
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
                  {posts.map((post) => (
                    <CommunityCard
                      key={post.postId}
                      title={post.title}
                      categoryLabel={
                        mapCategoryToLabel(post.category) ?? post.category
                      }
                      categoryValue={post.category}
                      content={post.summary ?? ""}
                      img={post.thumbnailUrl ?? undefined}
                      onClick={() => navigate(`/community/${post.postId}`)}
                      onClickShare={() => handleShare(post.postId)}
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
            pageSize={size}
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
