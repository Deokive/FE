import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FriendRow from "@/components/mypage/FriendRow";
import footerImage from "../../assets/images/footer.png";
import { TabContentWrapper } from "@/components/mypage/TabContentWrapper";
import { FriendTabId } from "@/enums/friendTabId";
import { FRIEND_TABS } from "@/constants/friendTabs";
import { useFriendsData } from "@/hooks/useFriendsData";

export default function FriendsPage() {
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<FriendTabId>(FriendTabId.REQUESTS);

  const { tabDataMap } = useFriendsData();
  const currentTab = tabDataMap[activeTab];

  // 무한스크롤
  useEffect(() => {
    const { hasNextPage, isFetchingNextPage, fetchNextPage } = currentTab.query;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [currentTab.query]);

  const handleViewProfile = (id: string) => navigate(`/profile/${id}`);

  const activeTabConfig = FRIEND_TABS.find((t) => t.id === activeTab)!;

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

        {/* 탭 버튼 */}
        <div className="flex">
          {FRIEND_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 rounded-t-2xl ${
                activeTab === tab.id
                  ? "typo-h3-semibold bg-brand-blue-200 text-color-highest"
                  : "typo-h3 bg-brand-blue-100 text-color-high border-t border-x border-[#E9ECF1]"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* 탭 컨텐츠 */}
        <TabContentWrapper label={activeTabConfig.label}>
          <div className="divide-y divide-[#E9ECF1]">
            {currentTab.data.length === 0 ? (
              <div className="mt-50 text-color-mid text-center">
                {activeTabConfig.emptyMessage}
              </div>
            ) : (
              currentTab.data.map((item) => (
                <FriendRow
                  key={item.userId}
                  id={String(item.userId)}
                  avatarUrl={undefined}
                  displayName={item.nickname}
                  role={currentTab.role}
                  onViewProfile={handleViewProfile}
                  {...currentTab.handlers}
                />
              ))
            )}
          </div>
        </TabContentWrapper>

        {/* 무한스크롤 감지 */}
        <div ref={observerRef} className="h-10">
          {currentTab.query.isFetchingNextPage && (
            <div className="text-center text-color-mid py-4">로딩 중...</div>
          )}
        </div>
      </div>
    </div>
  );
}
