import React from "react";
import clsx from "clsx";

type Props = {
  className?: string;
  size?: number | string;
  ariaLabel?: string;
  ariaHidden?: boolean;
};

export default function BackIcon({
  className,
  size = 14,
  ariaLabel,
  ariaHidden = true,
}: Props) {
  const style =
    typeof size === "number"
      ? { width: size, height: size }
      : { width: size, height: size };

  return (
    <svg
      viewBox="0 0 8 14"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("stroke-current", className)}
      style={style}
      fill="none"
      role={ariaHidden ? undefined : "img"}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    >
      <path
        d="M7 1L1 7L7 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
