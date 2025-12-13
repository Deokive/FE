// src/components/community/CommunityTab.tsx
import React from "react";

type Option = { label: string; value: string };

type CommunityTabProps = {
  value: string;
  onChange: (value: string) => void;
  options?: Option[];
  className?: string;
};

const DEFAULT_OPTIONS: Option[] = [
  { label: "전체", value: "all" },
  { label: "아이돌", value: "idol" },
  { label: "배우", value: "actor" },
  { label: "연주자", value: "performer" },
  { label: "스포츠", value: "sports" },
  { label: "아티스트", value: "artist" },
  { label: "애니메이션", value: "animation" },
  { label: "기타", value: "etc" },
];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const base = "h-[44px] px-[20px] py-[10px] rounded-[34px] cursor-pointer";
  const activeStyle = `bg-brand-blue-400 text-text-lowest typo-body2-semibold`;
  const inactiveStyle = "bg-brand-blue-100 text-text-mid typo-body2";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[base, active ? activeStyle : inactiveStyle].join(" ")}
    >
      {children}
    </button>
  );
}

export default function CommunityTab({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  className = "",
}: CommunityTabProps) {
  return (
    <div
      role="tablist"
      className={[
        "w-full flex items-center justify-center gap-[23px]",
        className,
      ].join(" ")}
    >
      {options.map((opt) => {
        const active = opt.value === value;

        return (
          <Chip
            key={opt.value}
            active={active}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </Chip>
        );
      })}
    </div>
  );
}
