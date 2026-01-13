import type { KeyboardEvent } from "react";
import BackIcon from "../../assets/icon/BackIcon";

type Props = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: number;
  className?: string;
  labelHidden?: boolean;
  ariaLabel?: string;
};

export default function BackNavigator({
  label = "뒤로",
  onClick,
  disabled = false,
  size = 14,
  className = "",
  labelHidden = false,
  ariaLabel,
}: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <button
      type="button"
      onClick={() => !disabled && onClick?.()}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      className={`w-full h-15 group inline-flex items-center gap-5 px-5 py-4.5 bg-brand-blue-100 focus:outline-none ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${className}`}
    >
      <BackIcon
        size={size}
        className="text-high group-hover:text-primary group-active:text-highest transition-colors duration-150"
        ariaHidden={false}
        ariaLabel={label}
      />

      {!labelHidden && (
        <span className="text-typo-body1 select-none text-color-highest group-active:text-highest transition-colors duration-150">
          {label}
        </span>
      )}
    </button>
  );
}
