import clsx from "clsx";

type Props = {
  className?: string;
  size?: number | string;
  ariaLabel?: string;
  ariaHidden?: boolean;
};

export default function FirstIcon({
  className,
  size = 24,
  ariaLabel,
  ariaHidden = true,
}: Props) {
  const style =
    typeof size === "number"
      ? { width: size, height: size }
      : { width: size, height: size };

  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
      style={style}
      fill="none"
      role={ariaHidden ? undefined : "img"}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    >
      <path
        d="M12 6L6 12L12 18"
        stroke="#A6BBCE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 6L12 12L18 18"
        stroke="#A6BBCE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
