import React from "react";
type Props = {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
};
export default function RequiredLabel({
  children,
  required = false,
  className = "",
}: Props) {
  return (
    <label className={`flex gap-1 ${className} mb-3`}>
      <span className="typo-h3-semibold text-color-highest">{children}</span>
      {required && (
        <span className="text-2.5 text-[#FF0000] font-bold leading-none">
          ＊
        </span>
      )}
    </label>
  );
}
