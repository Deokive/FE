import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BtnIcon } from "@/components/common/Button/Btn";
import type { User } from "@/types/user";
import profileImage from "../../assets/Images/profile.png";
import { PlusIcon } from "lucide-react";
import footerImage from "../../assets/Images/footer.png";

// 더미 (테스트용)
const mockUser: User = {
  id: "u-123",
  nickname: "방문 닉네임",
  avatarUrl: undefined,
  isFriend: false,
};

export default function VisitProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [requesting, setRequesting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  // useUser(userId) 같은 훅으로 교체
  useEffect(() => {
    // TODO: 실제 API 호출 (예: fetch user by userId)
    // setUser(await api.fetchUser(userId));
    setUser(mockUser); // 임시 더미
  }, [userId]);

  const handleSendFriendRequest = async () => {
    if (!user) return;
    setRequesting(true);
    try {
      // TODO: 실제 API 호출로 친구 요청 보내기
      // await api.sendFriendRequest(user.id);
      await new Promise((r) => setTimeout(r, 700)); // mock delay
      setRequestSent(true);
    } catch (err) {
      console.error(err);
      alert("친구 요청에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setRequesting(false);
    }
  };

  if (!user) {
    return (
      <div className="px-8 py-12">
        <div className="w-310 mx-auto">로딩 중...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-surface-container-10"
      style={{
        backgroundImage: `url(${footerImage})`,
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="w-310 mx-auto">
        <div className="typo-h1 text-color-highest my-15">
          {user.nickname} 님의 페이지
        </div>

        {/* 프로필 영역 */}
        <div className="flex items-center gap-5 mb-15">
          <img src={profileImage} className="size-30" />
          <div className="flex flex-col gap-5">
            <div className="typo-h1 text-high">{user.nickname}</div>
            <div className="flex flex-col gap-3">
              {/* 친구 추가 버튼: 친구 요청 보낸 상태이면 Disabled/완료 텍스트 노출 */}
              <BtnIcon
                variant={requestSent ? "gray" : "blue"}
                onClick={handleSendFriendRequest}
                disabled={requesting || requestSent}
                className={
                  requestSent ? "opacity-80" : "w-30 border-2 border-border-low"
                }
                startIcon={<PlusIcon className="w-6 h-6 text-color-high" />}
              >
                {requestSent ? "요청 전송됨" : "친구 추가"}
              </BtnIcon>
            </div>
          </div>
        </div>
        {/* 아카이브 방문 버튼 */}
        <button
          type="button"
          onClick={() => navigate(`/profile/${user.id}/archives`)}
          className={`w-full flex items-center justify-between px-30 py-25 bg-white rounded-xl hover:bg-surface-container-20 focus:outline-none`}
        >
          <div className={"typo-h2-semibold text-color-mid"}>
            {user.nickname} 님의 아카이브 방문하기
          </div>

          {/* 다음 화살표 */}
          <svg
            className="size-8 text-color-mid"
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
  );
}
