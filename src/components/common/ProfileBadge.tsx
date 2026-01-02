import React from "react";
import clsx from "clsx";
import UserIcon from "@/assets/icon/S.svg";

type Props = {
  avatarUrl?: string | null; // 서버에서 받은 URL(없으면 기본아이콘)
  displayName?: string | null; // 표시할 사용자명
  size?: "sm" | "md" | "lg"; // 크기 옵션 (기본 md)
  className?: string;
  onClick?: () => void; // 프로필 클릭 시 동작(선택)
  "aria-label"?: string;
};

export default function ProfileBadge({
  avatarUrl,
  displayName,
  size = "md",
  className,
  onClick,
  "aria-label": ariaLabel,
}: Props) {
  const sizeMap = {
    sm: "w-6 h-6 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  } as const;

  return (
    <div
      role={onClick ? "button" : "group"}
      onClick={onClick}
      aria-label={ariaLabel ?? `${displayName ?? "사용자명"} 프로필`}
      className={clsx("flex items-center gap-2.5", className)}
      tabIndex={onClick ? 0 : undefined}
    >
      <div
        className={clsx(
          "rounded-full overflow-hidden bg-surface-container-10 flex-shrink-0",
          sizeMap[size]
        )}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${displayName ?? "사용자명"}의 프로필 사진`}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <img
            src={UserIcon}
            alt="기본 프로필"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <p className="typo-body2-semibold text-color-highest">
        {displayName ?? "사용자명"}
      </p>
    </div>
  );
}
