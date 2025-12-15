import { twMerge } from "tailwind-merge";

type BtnProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

const BtnGray = ({ children, onClick, className }: BtnProps) => {
  const base =
    "h-[48px] px-[30px] py-[10px] rounded-[8px] cursor-pointer typo-body3-semibold transition-colors transition-colors";
  const enabled = "bg-surface-container-20 text-color-highest";
  const hoverActive =
    "hover:bg-surface-container-30 hover:text-color-highest" +
    "active:bg-surface-container-40 active:text-color-highest";

  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        base,
        enabled,
        hoverActive,
        className //사용자 커스텀 우선
      )}
    >
      {children}
    </button>
  );
};

export default BtnGray;
