import { twMerge } from "tailwind-merge";
type ListProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
};

const List = ({
  onClick,
  children,
  className,
  selected = false,
}: ListProps) => {
  const base = "w-[110px] h-[27px] px-[10px] py-[4px";
  const enabled = "bg-brand-blue-100 text-color-mid";
  const hover = "hover:bg-brand-blue-200 hover:text-color-highest";
  const selectedCls =
    "bg-brand-blue-100 text-color-primary typo-body2-semibold";
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={twMerge(
        base,
        selected ? selectedCls : enabled,
        !selected ? hover : "",
        className
      )}
    >
      {children}
    </button>
  );
};

export default List;
