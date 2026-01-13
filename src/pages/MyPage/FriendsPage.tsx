import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FriendRow from "@/components/mypage/FriendRow";
import { v4 as uuidv4 } from "uuid";
import { usePolling } from "@/hooks/usePolling";
import footerImage from "../../assets/images/footer.png";
import { TabContentWrapper } from "@/components/mypage/TabContentWrapper";

/* 샘플 더미 데이터 (초기) */
const sampleRequests = Array.from({ length: 5 }).map(() => ({
  id: uuidv4(),
  displayName: "닉네임1",
  avatarUrl: undefined,
}));

const sampleFriends = Array.from({ length: 4 }).map(() => ({
  id: uuidv4(),
  displayName: "닉네임2",
  avatarUrl: undefined,
}));

const samplePending = Array.from({ length: 2 }).map(() => ({
  id: uuidv4(),
  displayName: "닉네임3",
  avatarUrl: undefined,
}));

export default function FriendsPage() {
  const navigate = useNavigate();
  // tabs state
  const [requests, setRequests] = useState(sampleRequests);
  const [friends, setFriends] = useState(sampleFriends);
  const [pending, setPending] = useState(samplePending);

  // 탭 키
  const tabs = useMemo(
    () => [
      { id: "requests", title: "친구 요청" },
      { id: "friends", title: "친구 목록" },
      { id: "pending", title: "요청 목록" },
    ],
    []
  );
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // 폴링 샘플(실제: fetch API로 갱신)
  usePolling(
    async () => {
      // 예시: 서버에서 새 요청 목록 가져오기
      // const res = await api.fetchFriendRequests();
      // setRequests(res);
      // 현재는 더미 유지 (no-op)
    },
    10000,
    true
  );

  // Handlers (API 연결 시 이 부분을 대체)
  const handleAccept = (id: string) => {
    // 실제 API 호출: await api.acceptRequest(id)
    // 로컬 반영: 요청 -> 친구 목록으로 이동
    const item = requests.find((r) => r.id === id);
    if (!item) return;
    setRequests((p) => p.filter((r) => r.id !== id));
    setFriends((p) => [
      { id: item.id, displayName: item.displayName, avatarUrl: item.avatarUrl },
      ...p,
    ]);
  };

  const handleDecline = (id: string) => {
    // 거절: 요청 목록에서 제거 (또는 서버 호출)
    setRequests((p) => p.filter((r) => r.id !== id));
  };

  const handleDeleteFriend = (id: string) => {
    // 친구 삭제: 서버 호출 후 로컬 반영
    setFriends((p) => p.filter((f) => f.id !== id));
  };

  const handleCancelRequest = (id: string) => {
    // 내가 보낸 요청 취소
    setPending((p) => p.filter((it) => it.id !== id));
  };

  // 탭 컨텐츠 렌더러
  const renderTabContent = (tabId: string) => {
    if (tabId === "requests")
      return (
        <TabContentWrapper label="친구 요청 목록">
          <div className="divide-y divide-[#E9ECF1]">
            {requests.length === 0 ? (
              <div className="mt-50 text-color-mid text-center">
                받은 친구 요청이 없습니다.
              </div>
            ) : null}
            {requests.map((r) => (
              <FriendRow
                key={r.id}
                id={r.id}
                avatarUrl={r.avatarUrl}
                displayName={r.displayName}
                role="request"
                onViewProfile={(id) => {
                  // 방문프로필 이동
                  navigate(`/profile/${id}`);
                }}
                onAccept={(id) => handleAccept(id)}
                onDecline={(id) => handleDecline(id)}
              />
            ))}
          </div>
        </TabContentWrapper>
      );

    if (tabId === "friends")
      return (
        <TabContentWrapper label="친구 목록">
          <div className="divide-y divide-[#E9ECF1]">
            {friends.length === 0 ? (
              <div className="mt-50 text-color-mid text-center">
                친구가 없습니다.
              </div>
            ) : null}
            {friends.map((f) => (
              <FriendRow
                key={f.id}
                id={f.id}
                avatarUrl={f.avatarUrl}
                displayName={f.displayName}
                role="friend"
                onViewProfile={(id) => navigate(`/profile/${id}`)}
                onDelete={(id) => handleDeleteFriend(id)}
              />
            ))}
          </div>
        </TabContentWrapper>
      );

    if (tabId === "pending")
      return (
        <TabContentWrapper label="요청 목록">
          <div className="divide-y divide-[#E9ECF1]">
            {pending.length === 0 ? (
              <div className="mt-50 text-color-mid text-center">
                친구 요청한 내역이 없습니다.
              </div>
            ) : null}
            {pending.map((p) => (
              <FriendRow
                key={p.id}
                id={p.id}
                avatarUrl={p.avatarUrl}
                displayName={p.displayName}
                role="pending"
                onViewProfile={(id) => navigate(`/profile/${id}`)}
                onDecline={(id) => handleCancelRequest(id)}
              />
            ))}
          </div>
        </TabContentWrapper>
      );

    return null;
  };

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
        <div className="typo-h1 text-color-highest my-15">내 친구 관리</div>
        <div className="flex">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-6 py-4 rounded-t-2xl ${
                activeTab === t.id
                  ? "typo-h3-semibold bg-brand-blue-200 text-color-highest"
                  : "typo-h3 bg-brand-blue-100 text-color-high border-t border-x border-[#E9ECF1]"
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        <div>{renderTabContent(activeTab)}</div>
      </div>
    </div>
  );
}
