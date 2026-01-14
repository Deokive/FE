import React from "react";
import { useNavigate } from "react-router-dom";

export type ProfileMenuItem = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  to?: string; // 내부 라우팅 경로가 있으면 navigate(to)
  onClick?: () => void;
  ariaLabel?: string;
};

type Props = {
  items: ProfileMenuItem[];
  className?: string;
};

export default function ProfileMenu({ items, className = "" }: Props) {
  const navigate = useNavigate();

  const handleItemClick = (item: ProfileMenuItem) => {
    if (item.onClick) {
      item.onClick();
      return;
    }
    if (item.to) {
      navigate(item.to);
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={() => handleItemClick(it)}
          aria-label={it.ariaLabel ?? it.title}
          className={`flex items-center justify-between px-30 py-13.5 bg-white rounded-xl hover:bg-surface-container-20 focus:outline-none`}
        >
          <div className={"typo-h2-semibold text-color-mid"}>{it.title}</div>

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
      ))}
    </div>
  );
}
