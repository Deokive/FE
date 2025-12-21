import React from "react";

type Props = {
  size?: number | string;
  className?: string;
  ariaLabel?: string;
};

export default function ExclamationIcon({
  size = 60,
  className,
  ariaLabel = "경고",
}: Props) {
  const style =
    typeof size === "number"
      ? { width: size, height: size }
      : { width: size, height: size };
  return (
    <svg
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      role="img"
      aria-label={ariaLabel}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 0C46.5685 0 60 13.4315 60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0ZM30 40C27.2386 40 25 42.2386 25 45C25 47.7614 27.2386 50 30 50C32.7614 50 35 47.7614 35 45C35 42.2386 32.7614 40 30 40ZM30 10C27.2386 10 25 12.2386 25 15V25C25 27.7614 27.2386 30 30 30C32.7614 30 35 27.7614 35 25V15C35 12.2386 32.7614 10 30 10Z"
        fill="#D5E8F9"
      />
    </svg>
  );
}
