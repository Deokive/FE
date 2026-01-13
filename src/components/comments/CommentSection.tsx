import React, { useMemo, useState } from "react";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import type { CommentModel } from "./CommentItem";
import ButtonLike from "../archive/ButtonLike";
import ProfileBadge from "../common/ProfileBadge";
import type { User } from "@/types/user";

type Props = {
  initialComments?: CommentModel[]; // 서버에서 받아온 댓글 리스트(원댓글만, replies 포함 가능)
  currentUserId?: string | null;
  currentUser?: User | null;
  onSubmitComment?: (text: string) => Promise<CommentModel | null>; // 서버 연동 시
  onDeleteCommentApi?: (id: string) => Promise<boolean>;
};

export default function CommentSection({
  initialComments = [],
  currentUserId = null,
  currentUser,
  onSubmitComment,
  onDeleteCommentApi,
}: Props) {
  // 로컬 상태(UI 확인용)
  const [comments, setComments] = useState<CommentModel[]>(initialComments);
  const [open, setOpen] = useState(true); // 댓글 섹션 기본 열림
  const [input, setInput] = useState("");

  const currentUserNickname = currentUser?.nickname ?? "사용자";

  // 댓글 개수 (원댓글 + 답글 모두 합산)
  const commentCount = useMemo(() => {
    let c = 0;
    comments.forEach((cm) => {
      c += 1;
      if (cm.replies) c += cm.replies.length;
    });
    return c;
  }, [comments]);

  const addCommentLocal = (text: string) => {
    const newComment: CommentModel = {
      id: `temp-${Date.now()}`,
      authorId: currentUserId ?? "me",
      authorName: currentUserNickname,
      text,
      createdAt: formatDateYMD(new Date()),
      replies: [],
    };
    setComments((s) => [...s, newComment]);
  };

  const formatDateYMD = (d: Date) =>
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
      d.getDate()
    ).padStart(2, "0")}`;

  const addReplyLocal = (parentId: string, text: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === parentId) {
          const r = {
            id: `temp-${Date.now()}`,
            authorId: currentUserId ?? "me",
            authorName: currentUserNickname,
            text,
            createdAt: formatDateYMD(new Date()),
          };
          return { ...c, replies: [...(c.replies ?? []), r] };
        }
        return c;
      })
    );
  };

  const handleSubmitComment = async () => {
    if (!input.trim()) return;
    if (onSubmitComment) {
      // optional: call API and use returned comment
      const res = await onSubmitComment(input.trim());
      if (res) setComments((s) => [res, ...s]);
    } else {
      addCommentLocal(input.trim());
    }
    setInput("");
  };

  const handleAddReply = async (parentId: string, text: string) => {
    // API integration optional; here local append
    if (onSubmitComment) {
      // implement server reply submit
    } else {
      addReplyLocal(parentId, text);
    }
  };

  const deleteImmediate = async (
    id: string,
    isReply: boolean,
    parentId?: string
  ) => {
    // optimistic UI: 로컬에서 먼저 삭제
    const prev = comments;

    if (isReply && parentId) {
      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === parentId
            ? { ...c, replies: (c.replies ?? []).filter((r) => r.id !== id) }
            : c
        )
      );
    } else {
      setComments((prevComments) => prevComments.filter((c) => c.id !== id));
    }

    // API 호출: 실패 시 롤백
    if (onDeleteCommentApi) {
      try {
        await onDeleteCommentApi(id);
      } catch (err) {
        // 롤백 및 사용자 알림
        setComments(prev);
        console.error("삭제 실패:", err);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between w-310 mb-5">
        <div>
          <ButtonLike
            onClick={() => {
              console.log("좋아요 클릭");
            }}
          />
        </div>

        <div>
          <button
            className="w-45 h-11 flex gap-2.5 p-2.5 justify-center items-center typo-body2-medium text-color-highest bg-surface-container-10 rounded-lg"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
          >
            <MessageCircle size={17} color="#7D9AB2" />
            <span>댓글</span>
            <span className="text-surface-container-30 font-medium">
              |
            </span>{" "}
            <span className="w-11">{commentCount}</span>
            <ChevronDown
              size={20}
              className={open ? "hidden" : "block"}
              color="#7D9AB2"
            />
            <ChevronUp
              size={20}
              className={open ? "block" : "hidden"}
              color="#7D9AB2"
            />
          </button>
        </div>
      </div>

      {open && (
        <div>
          <div aria-live="polite">
            {comments.length === 0 ? (
              <div className="mb-5 typo-h3 text-[#B6C6D5] bg-surface-container-10 w-full flex justify-center items-center h-26">
                아직 작성된 댓글이 없어요.
              </div>
            ) : (
              comments.map((c) => (
                <CommentItem
                  key={c.id}
                  comment={c}
                  currentUserId={currentUserId}
                  currentUser={currentUser}
                  onAddReply={handleAddReply}
                  onDeleteImmediate={deleteImmediate}
                />
              ))
            )}
          </div>

          <div className="mt-5 flex flex-col gap-2.5 bg-brand-blue-100 rounded-lg p-5">
            <ProfileBadge
              avatarUrl={undefined} // 기본 이미지 사용
              displayName={currentUser?.nickname ?? "사용자명"}
              size="sm"
              className="flex-shrink-0"
              nameClassName="typo-body2-semibold "
            />
            <CommentInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmitComment}
              placeholder="댓글을 입력해주세요."
              maxLength={3000}
            />
          </div>
        </div>
      )}
    </div>
  );
}
