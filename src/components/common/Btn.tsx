import { twMerge } from "tailwind-merge";

type BtnProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
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
        disabled ? disabledCls : enabled + hoverActive,
        className
      )}
    >
      {children}
    </button>
  );
};

export default BtnGray;
