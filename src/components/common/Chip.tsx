// src/components/common/Chip.tsx
type ChipProps = {
  selected?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function Chip({
  selected = false,
  onClick,
  children,
}: ChipProps) {
  const base =
    "h-[44px] px-[20px] py-[10px] rounded-[34px] cursor-pointer typo-body2 transition-colors";
  const enabled = "bg-brand-blue-100 text-color-mid";
  const selectedCls = "bg-brand-blue-400 text-color-lowest font-semibold";

  // 선택되지 않은 경우에만 hover/active 스타일 부여
  const hoverActive =
    "hover:bg-brand-blue-200 hover:text-color-lowest hover:font-semibold active:bg-brand-blue-300 active:text-color-primary";

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={[
        base,
        selected ? selectedCls : enabled,
        !selected ? hoverActive : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
