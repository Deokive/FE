import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "@/components/community/Banner";
import ArchiveList from "@/components/archive/List/ArchiveList";
import type { User } from "@/types/user";
import type { Archive } from "@/types/archive";
// import { useArchivesByUser, useUser } from "@/hooks";

// 더미 데이터(테스트)
const mockArchives: Archive[] = Array.from({ length: 12 }).map((_, i) => ({
  archiveId: i + 1,
  userId: 123,
  title: `사용자가 지정한 아카이브 파일명 ${i + 1}`,
  bannerUrl: "",
  image: "",
}));

const mockUser: User = {
  id: "u-123",
  nickname: "방문 닉네임",
  avatarUrl: undefined,
};

export default function VisitArchivePage() {
  const { userId } = useParams<{ userId: string }>();
  const [archives, setArchives] = useState<Archive[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // TODO: 실제 API로 대체
    setArchives(mockArchives);
    setUser(mockUser);
  }, [userId]);

  return (
    <div className="flex flex-col items-center">
      <Banner />
      <div className="w-310 mx-auto">
        <div className="typo-h1 text-color-highest my-15">
          {user?.nickname ?? "사용자"} 님의 아카이브
        </div>

        {/* 아카이브 리스트 영역: 높이 고정 + 내부 스크롤 */}
        <div
          role="region"
          aria-label={`${user?.nickname ?? "사용자"}의 아카이브 리스트`}
          className="overflow-auto mb-25"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {archives.length === 0 ? (
            <div className="w-full h-135 flex items-center justify-center border-2 rounded-lg border-border-low typo-h2 text-color-low">
              {user?.nickname} 님의 활동 내역이 아직 없습니다.
            </div>
          ) : (
            <ArchiveList archive={archives} />
          )}
        </div>
      </div>
    </div>
  );
}
