import { twMerge } from "tailwind-merge";

interface CheckboxIconProps {
  /** 체크박스 선택 상태 (true: 체크됨, false: 체크 안 됨) */
  checked?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 아이콘 크기 (기본: 24px) */
  size?: number;
  /** 커스텀 클래스명 */
  className?: string;
}

const CheckboxIcon = ({
  checked = false,
  disabled = false,
  size = 24,
  className,
}: CheckboxIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={twMerge(
        "transition-all",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* 체크박스 배경 */}
      <rect
        width="24"
        height="24"
        rx="4"
        fill={checked ? "#82BEF5" : "#CBD5DF"}
        className={twMerge(
          "transition-colors rounded-sm ",
          !disabled && !checked && "hover:fill-[#7D9AB2]"
        )}
      />
      {/* 체크 마크 (선택되었을 때만 표시) */}

      <path
        d="M4.80078 10.5964L10.3433 15.9L19.2008 6"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CheckboxIcon;
