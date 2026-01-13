import { BtnBasic } from "../common/Button/Btn";
import profileImage from "../../assets/Images/profile.png";

export type FriendRowProps = {
  id: string;
  avatarUrl?: string | null;
  displayName: string;
  role: "request" | "friend" | "pending"; // request: 다른사람이 보낸 요청, friend: 친구, pending: 내가 보낸 요청
  onViewProfile?: (id: string) => void;
  onAccept?: (id: string) => void; // 수락
  onDecline?: (id: string) => void; // 거절 / 취소
  onDelete?: (id: string) => void; // 친구 삭제
  className?: string;
};

export default function FriendRow({
  id,
  // avatarUrl,
  displayName,
  role,
  onViewProfile,
  onAccept,
  onDecline,
  onDelete,
  className = "",
}: FriendRowProps) {
  return (
    <div
      className={`w-full h-37.5 bg-white flex items-center justify-between px-30 py-10 ${className}`}
    >
      <div className="flex items-center gap-10">
        <img src={profileImage} />
        <div className="flex flex-col gap-3">
          <span className="typo-h2-semibold text-color-high">
            {displayName}
          </span>
          <button
            type="button"
            onClick={() => onViewProfile?.(id)}
            className="flex items-center typo-h2 text-color-mid hover:underline"
            aria-label={`${displayName}의 프로필 보기`}
          >
            프로필 보기
            <svg
              className="size-6 text-color-mid ml-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-5">
        {role === "request" && (
          <>
            <BtnBasic
              variant="blue"
              onClick={() => onAccept?.(id)}
              className="typo-h3-semibold"
            >
              수락
            </BtnBasic>
            <BtnBasic
              variant="gray"
              onClick={() => onDecline?.(id)}
              className="typo-h3-semibold"
            >
              거절
            </BtnBasic>
          </>
        )}

        {role === "friend" && (
          <>
            <BtnBasic
              variant="gray"
              onClick={() => onDelete?.(id)}
              className="typo-h3-semibold"
            >
              삭제
            </BtnBasic>
          </>
        )}

        {role === "pending" && (
          <>
            <BtnBasic
              variant="gray"
              onClick={() => onDecline?.(id)}
              className="typo-h3-semibold"
            >
              취소
            </BtnBasic>
          </>
        )}
      </div>
    </div>
  );
}
