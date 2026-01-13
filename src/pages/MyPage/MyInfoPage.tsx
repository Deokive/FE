import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileBadge from "@/components/common/ProfileBadge";
import ConfirmModal from "@/components/common/ConfirmModal";
import footerImage from "../../assets/Images/footer.png";

function maskEmail(email?: string | null) {
  if (!email) return "";
  // 간단 마스킹: 앞 2글자 보이고 그 뒤 5개 * 표시 후 끝 2자리 보이기
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const prefix = local.slice(0, Math.min(2, local.length));
  const suffix = local.length > 2 ? local.slice(-2) : "";
  const maskedMiddle =
    local.length > 4
      ? "*".repeat(5)
      : "*".repeat(Math.max(1, local.length - prefix.length - suffix.length));
  return `${prefix}${maskedMiddle}${suffix}@${domain}`;
}

export default function MyInfoPage() {
  const currentUser = {
    id: "u3",
    nickname: "테스트",
    avatarUrl: "undefiend",
    email: "testtest@gmail.com",
  };

  const navigate = useNavigate();

  // 닉네임 편집
  const [isEditingName, _setIsEditingName] = useState(false);
  const [_nameInput, setNameInput] = useState<string>(
    currentUser?.nickname ?? ""
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 모달 제어(로그아웃, 회원탈퇴)
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  // API 호출
  useEffect(() => {
    setNameInput(currentUser?.nickname ?? "");
  }, [currentUser?.nickname]);

  useEffect(() => {
    if (isEditingName) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isEditingName]);

  // const saveNickname = async (nextName: string) => {
  //   const trimmed = nextName.trim().slice(0, 10);
  //   if (!trimmed) {
  //     // 빈값은 무시하거나 에러 처리
  //     setNameInput(currentUser?.nickname ?? "");
  //     setIsEditingName(false);
  //     return;
  //   }

  //   if (trimmed === currentUser?.nickname) {
  //     setIsEditingName(false);
  //     return;
  //   }

  //   try {
  //     // TODO: 실제 API 호출로 닉네임 저장
  //     console.info("닉네임 저장 호출: ", trimmed);
  //     // r상태 업데이트
  //     //   await refetch?.();
  //   } catch (err) {
  //     console.error(err);
  //     alert("닉네임 저장 중 오류가 발생했습니다.");
  //   } finally {
  //     setIsEditingName(false);
  //   }
  // };

  // const handleNameKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
  //   e
  // ) => {
  //   if (e.key === "Enter") {
  //     saveNickname(nameInput);
  //   } else if (e.key === "Escape") {
  //     setNameInput(currentUser?.nickname ?? "");
  //     setIsEditingName(false);
  //   }
  // };

  const handleLogoutConfirm = () => {
    // 로그아웃 로직: 토큰 삭제, 상태 초기화, 라우팅 등
    try {
      // clearAuth();
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleWithdrawConfirm = async () => {
    try {
      // TODO: 회원탈퇴 API 호출
      // clearAuth();
      localStorage.removeItem("accessToken");
      navigate("/signup");
    } catch (err) {
      console.error(err);
      alert("탈퇴 처리 중 오류가 발생했습니다.");
    }
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
      <div className="w-310">
        <div className="my-15">
          <h1 className="typo-h1 text-color-highest">내 정보</h1>
        </div>

        {/* 프로필 배지 + 닉네임(편집) */}
        <div className="flex items-center gap-6 mb-8">
          <ProfileBadge
            avatarUrl={undefined}
            displayName={currentUser?.nickname}
            size="lg"
            className="gap-5"
            nameClassName="typo-h1 text-color-high"
            editable={true}
            onRename={async (_next) => {
              // 프로젝트 API 함수로 교체
              try {
                // await api.updateNickname(next);
                // 성공하면 사용자 정보 갱신(refetch)
                // await refetchUser();
              } catch (err) {
                // 에러 처리
                console.error(err);
                throw err; // ProfileBadge가 alert을 띄울 수 있도록 예외 재전달
              }
            }}
          />
        </div>

        {/* 이메일 블록 */}
        <div className="bg-white rounded-xl px-30 py-25 mb-15">
          <div className="flex items-center gap-25 typo-h2-semibold">
            <div className="text-color-high">이메일</div>
            <div className="text-color-mid">
              {maskEmail(currentUser?.email)}
            </div>
          </div>
        </div>

        <div className="flex gap-15 justify-end items-center">
          {/* 로그아웃 */}
          <ConfirmModal
            trigger={
              <button
                type="button"
                onClick={() => setLogoutModalOpen(true)}
                className="typo-body2-semibold text-color-low hover:underline"
              >
                로그아웃
              </button>
            }
            open={logoutModalOpen}
            onOpenChange={(v) => setLogoutModalOpen(v)}
            title="로그아웃하시겠습니까?"
            description={null}
            confirmLabel="확인"
            cancelLabel="취소"
            onConfirm={handleLogoutConfirm}
            onCancel={() => setLogoutModalOpen(false)}
          ></ConfirmModal>

          {/* 회원탈퇴 */}
          <ConfirmModal
            trigger={
              <button
                type="button"
                onClick={() => setWithdrawModalOpen(true)}
                className="typo-body2-semibold text-color-low hover:underline"
              >
                회원탈퇴
              </button>
            }
            open={withdrawModalOpen}
            onOpenChange={(v) => setWithdrawModalOpen(v)}
            title="정말 탈퇴하시겠습니까?"
            description={
              <div>
                탈퇴시 모든 이용 기록과 작성하신 내용은 삭제되며 복구할 수
                없습니다.
              </div>
            }
            confirmLabel="확인"
            cancelLabel="취소"
            confirmVariant="blue"
            onConfirm={handleWithdrawConfirm}
            onCancel={() => setWithdrawModalOpen(false)}
            ariaLabel="회원탈퇴 확인"
          />
        </div>
      </div>
    </div>
  );
}
