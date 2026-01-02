import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentSection from "@/components/comments/CommentSection";
import BackNavigator from "@/components/common/BackNavigator";
import MediaCarousel from "@/components/media/MediaCarousel";
import type { MediaItem } from "@/types/media";

const mockPost = {
  id: "p1",
  category: "아이돌",
  title: "제목",
  content:
    "[1-2-1] 커뮤니티_커뮤니티 글 작성 에서 사용자가 작성한 본문 내용 노출",
  media: [
    {
      id: "m1",
      url: "/preview/rep.jpg",
      type: "image",
      isRepresentative: true,
    },
    { id: "m2", url: "/preview/2.jpg", type: "image" },
    { id: "m3", url: "/preview/3.mp4", type: "video" },
    { id: "m4", url: "/preview/2.jpg", type: "image" },
    { id: "m5", url: "/preview/2.jpg", type: "image" },
  ] as MediaItem[],
};

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
  const navigate = useNavigate();
  const { postId } = useParams();

  const CONTAINER_WIDTH = 1240;

  const sortedMedia = useMemo(() => {
    const items = [...mockPost.media];
    items.sort((a, b) => (a.isRepresentative ? -1 : 1));
    return items;
  }, [mockPost.media]);

  return (
    <div className="flex flex-col gap-10">
      <BackNavigator label="커뮤니티 보기" onClick={() => history.back()} />

      <div className="flex justify-center">
        <div className="max-w-310 flex flex-col gap-10">
          <div className="text-center typo-h1 text-color-highest">
            {mockPost.title}
          </div>
          <div className="">
            <MediaCarousel
              items={sortedMedia}
              readOnly // 클릭/편집/대표 변경 비활성
              showRepresentativeBadge={true} // 대표 표시 옵션
              windowWidth={CONTAINER_WIDTH}
              cardWidth={360}
              gap={20}
              prevOffset={-70}
            />
            <div className="prose max-w-none text-color-highest whitespace-pre-wrap mt-5">
              {mockPost.content}
            </div>
          </div>
          <CommentSection
            initialComments={mockComments}
            currentUserId={currentUser.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}
