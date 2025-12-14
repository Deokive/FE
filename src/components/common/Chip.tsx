export default function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "h-[44px] px-[20px] py-[10px] rounded-[34px] cursor-pointer",
        active
          ? "bg-brand-blue-400 text-text-lowest typo-body2-semibold"
          : "bg-brand-blue-100 text-text-mid typo-body2",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
