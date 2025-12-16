import { twMerge } from "tailwind-merge";

type BtnProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  startIcon?: React.ReactNode; // 왼쪽 아이콘
  endIcon?: React.ReactNode; // 오른쪽 아이콘
  selected?: boolean; // 선택된 상태인지 여부
  selectable?: boolean; // 기본 true, false면 토글/선택 개념 없음
};

const BtnGray = ({
  children,
  onClick,
  className,
  disabled = false,
}: BtnProps) => {
  const base =
    "w-[180px] h-[48px] px-[30px] py-[10px] rounded-[8px] cursor-pointer typo-body3-semibold transition-colors transition-colors";
  const enabled = "bg-surface-container-20 text-color-highest";
  const hoverActive =
    "hover:bg-surface-container-30 hover:text-color-highest active:bg-surface-container-40 active:text-color-highest";
  const disabledCls =
    "bg-surface-container-30 text-color-highest cursor-not-allowed";
  return (
    <button
      type="button"
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={twMerge(
        base,
        disabled ? disabledCls : enabled,
        disabled ? "" : hoverActive,
        className
      )}
    >
      {children}
    </button>
  );
};

const BtnBlue = ({
  children,
  onClick,
  className,
  disabled = false,
}: BtnProps) => {
  const base =
    "w-[180px] h-[48px] px-[30px] py-[10px] rounded-[8px] cursor-pointer typo-body3-semibold transition-colors transition-colors";
  const enabled = "bg-brand-blue-400 text-color-lowest";
  const hoverActive =
    "hover:bg-brand-blue-300 hover:text-color-lowest active:bg-brand-blue-200  active:text-color-lowest";
  const disabledCls =
    "bg-surface-container-30 text-color-highest cursor-not-allowed";
  return (
    <button
      type="button"
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={twMerge(
        base,
        disabled ? disabledCls : enabled,
        disabled ? "" : hoverActive,
        className
      )}
    >
      {children}
    </button>
  );
};

const BtnIcon = ({
  selected = false,
  children,
  onClick,
  disabled = false,
  className,
  startIcon,
  endIcon,
}: BtnProps) => {
  const base =
    "w-[110px] h-[44px] p-[10px] flex items-center justify-center rounded-[8px] gap-[10px] cursor-pointer typo-body2-semibold transition-colors";

  const enabled = "bg-brand-blue-100 text-color-highest";
  const hoverActive =
    "hover:bg-brand-blue-200 hover:text-high active:bg-brand-blue-300 active:text-primary";
  const disabledCls = "bg-brand-blue-200 text-color-mid cursor-not-allowed";

  const selectedCls = "bg-brand-blue-100 text-color-highest";
  return (
    <button
      type="button"
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      aria-pressed={selected}
      className={twMerge(
        base,
        disabled ? disabledCls : enabled,
        disabled ? "" : hoverActive,
        selected ? selectedCls : "",
        !selected ? hoverActive : "",
        className
      )}
    >
      {startIcon && (
        <span aria-hidden className="w-6 h-6 flex items-center justify-center">
          {startIcon}
        </span>
      )}
      {children}
      {endIcon && (
        <span aria-hidden className="w-6 h-6 flex items-center justify-center">
          {endIcon}
        </span>
      )}
    </button>
  );
};

export { BtnGray, BtnBlue, BtnIcon };
