import { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "@/components/comments/CommentSection";
import BackNavigator from "@/components/common/BackNavigator";
import MediaCarousel from "@/components/media/MediaCarousel";
import type { MediaItem } from "@/types/media";
import { MediaType } from "@/enums/mediaType";
import fetchPostDetail from "@/apis/queries/community/getDetailPost";
import type {
  PostDetailDto,
  PostFileDto,
} from "@/apis/queries/community/getDetailPost";

const mockComments = [
  {
    id: "c1",
    authorId: "u1",
    authorName: "닉네임1",
    text: "첫 댓글입니다",
    createdAt: "2025.01.01",
    replies: [
      {
        id: "r1",
        authorId: "u2",
        authorName: "닉네임2",
        text: "답글입니다",
        createdAt: "2025.01.02",
      },
    ],
  },
];

const currentUser = {
  id: "u3",
  nickname: "테스트",
  avatarUrl: "undefiend",
};

export default function CommunityDetail() {
  // const { postId } = useParams();

  const CONTAINER_WIDTH = 1240;

  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostDetailDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 임시: 서버에서 가져올 댓글 구조가 다르면 여기에 맞추기
  // const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (!postId) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPostDetail(postId);
        setPost(data);

        // 서버가 댓글을 함께 주지 않으면 별도 API로
        // setComments(data.comments ?? []);
      } catch (e: any) {
        console.error("게시글 조회 실패", e);
        setError(e?.message || "게시글을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [postId]);

  // 서버 files -> MediaItem 변환
  const mediaItems: MediaItem[] = useMemo(() => {
    if (!post?.files || post.files.length === 0) return [];
    return post.files
      .slice()
      .sort((a, b) => {
        const sa = typeof a.sequence === "number" ? a.sequence : 0;
        const sb = typeof b.sequence === "number" ? b.sequence : 0;
        return sa - sb;
      })
      .map((f: PostFileDto, idx) => {
        // mediaType 정규화
        const mt = String(f.mediaType ?? "")
          .toUpperCase()
          .includes("VIDEO")
          ? MediaType.VIDEO
          : MediaType.IMAGE;
        const isRep = String(f.mediaRole ?? "").toUpperCase() === "PREVIEW";
        return {
          id: String(f.fileId ?? `file-${idx}`),
          url: f.cdnUrl ?? "",
          role: undefined,
          mediaType: mt,
          mimeType: undefined,
          isRepresentative: isRep,
          sequence: typeof f.sequence === "number" ? f.sequence : idx,
          uploadStatus: undefined,

          serverId: f.fileId,
        } as MediaItem;
      });
  }, [post?.files]);

  // 대표 정렬
  const sortedMedia = useMemo(() => {
    const items = [...mediaItems];
    items.sort(
      (a, b) =>
        Number(b.isRepresentative ? 1 : 0) -
          Number(a.isRepresentative ? 1 : 0) ||
        (a.sequence ?? 0) - (b.sequence ?? 0)
    );
    return items;
  }, [mediaItems]);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div>로딩 중... (스켈레톤 컴포넌트로 교체 권장)</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center p-8">
        <div className="mb-4 text-color-highest">
          게시글을 불러오는 중 오류가 발생했습니다.
        </div>
        <div className="mb-4 text-sm text-color-sub">{error}</div>
        <button className="btn" onClick={() => window.location.reload()}>
          다시 시도
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center p-8">
        <div>게시글이 존재하지 않습니다.</div>
        <button className="btn mt-4" onClick={() => navigate(-1)}>
          뒤로
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <BackNavigator label="커뮤니티 보기" onClick={() => history.back()} />

      <div className="flex justify-center">
        <div className="max-w-310 flex flex-col">
          <div className="text-center typo-h1 text-color-highest mb-10">
            {post.title}
          </div>
          <div>
            <MediaCarousel
              items={sortedMedia}
              readOnly
              showRepresentativeBadge={true}
              windowWidth={CONTAINER_WIDTH}
              cardWidth={360}
              gap={20}
              prevOffset={-70}
            />
            <div className="prose max-w-none text-color-highest whitespace-pre-wrap mt-5">
              {post.content}
            </div>
          </div>
          <CommentSection
            postId={post.id}
            initialComments={mockComments}
            currentUserId={currentUser.id}
            currentUser={currentUser}
            initialLikeCount={post.likeCount ?? 0}
            initialIsLiked={post.isLiked ?? false}
          />
        </div>
      </div>
    </div>
  );
}
