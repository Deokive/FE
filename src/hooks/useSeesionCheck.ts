import { useEffect } from "react";
import { useAuthStore, SESSION_EXPIRY_HOURS } from "@/store/useAuthStore";

/**
 * 앱 시작 시 세션 만료를 체크하는 Hook
 * App.tsx나 루트 컴포넌트에서 한 번만 호출
 */
export const useSessionCheck = () => {
  const { isAuthenticated, checkSessionExpiry, clearAuth, loginTime } = useAuthStore();

  useEffect(() => {
    console.log("🔍 [세션 체크] 시작");
    console.log("  - isAuthenticated:", isAuthenticated);
    console.log("  - loginTime:", loginTime);
    console.log("  - SESSION_EXPIRY_HOURS:", SESSION_EXPIRY_HOURS);
    
    // 로그인 상태가 아니면 체크 안 함
    if (!isAuthenticated) {
      console.log("  ❌ 로그인 상태 아님 - 체크 스킵");
      return;
    }

    if (!loginTime) {
      console.log("  ❌ loginTime 없음 - 체크 스킵");
      return;
    }

    // 경과 시간 계산
    const now = Date.now();
    const elapsedMs = now - loginTime;
    const elapsedHours = elapsedMs / (1000 * 60 * 60);
    const elapsedSeconds = elapsedMs / 1000;
    
    console.log("  - 경과 시간:", elapsedSeconds.toFixed(2), "초 /", elapsedHours.toFixed(4), "시간");
    console.log("  - 만료 기준:", SESSION_EXPIRY_HOURS, "시간");

    // 세션 만료 확인
    const isExpired = checkSessionExpiry(SESSION_EXPIRY_HOURS);
    console.log("  - isExpired:", isExpired);
    
    if (isExpired) {
      console.log("  ✅ 세션 만료 - 자동 로그아웃 실행");
      
      // 클라이언트 상태 정리
      clearAuth(); // Zustand Store 초기화
      localStorage.clear(); // 로컬스토리지 비우기
      
      // 알림 표시
      alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
      
      // 로그인 페이지로 리다이렉트
      window.location.href = "/login";
    } else {
      console.log("  ⏳ 세션 유효 - 로그아웃 안 함");
    }
  }, [isAuthenticated, checkSessionExpiry, clearAuth, loginTime]);
};