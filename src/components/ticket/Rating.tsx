import React, { useMemo, useState } from "react";

type Props = {
  value?: number; // 0 ~ 5, 0.5 step
  onChange?: (v: number) => void;
  size?: number;
  className?: string;
  readOnly?: boolean;
};

const DEFAULT_COLOR = "#99CCFF";

export default function Rating({
  value = 0,
  onChange,
  size = 24,
  className = "",
  readOnly = false,
}: Props) {
  const [hoverVal, setHoverVal] = useState<number | null>(null);
  const display = hoverVal ?? value;

  const stars = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => {
      const fullThreshold = i + 1;
      const halfThreshold = i + 0.5;
      const filled = display >= fullThreshold;
      const half = !filled && display >= halfThreshold;
      const percent = filled ? 100 : half ? 50 : 0;
      return { index: i, filled, half, percent };
    });
  }, [display]);

  const handleClick = (idx: number, part: "half" | "full") => {
    if (readOnly) return; // 읽기전용이면 아무 동작 안 함
    const newVal = idx + (part === "half" ? 0.5 : 1);
    if (newVal === value) onChange?.(0);
    else onChange?.(newVal);
  };

  const handleKey = (
    e: React.KeyboardEvent,
    idx: number,
    part: "half" | "full"
  ) => {
    if (readOnly) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(idx, part);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role={readOnly ? undefined : "radiogroup"}
      aria-label={readOnly ? "평점 표시" : "평점"}
    >
      {stars.map((s) => {
        const percent = s.percent;
        return (
          <div
            key={s.index}
            className="relative"
            style={{ width: size, height: size }}
            onMouseLeave={() => !readOnly && setHoverVal(null)}
          >
            {/* 인터랙티브일 때만 클릭/호버 영역 렌더 */}
            {!readOnly && (
              <>
                <button
                  aria-label={`${s.index + 0.5}점`}
                  className="absolute left-0 top-0 z-30 w-1/2 h-full bg-transparent"
                  onMouseEnter={() => setHoverVal(s.index + 0.5)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(s.index, "half");
                  }}
                  onKeyDown={(e) => handleKey(e, s.index, "half")}
                  tabIndex={0}
                  type="button"
                />
                <button
                  aria-label={`${s.index + 1}점`}
                  className="absolute right-0 top-0 z-30 w-1/2 h-full bg-transparent"
                  onMouseEnter={() => setHoverVal(s.index + 1)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(s.index, "full");
                  }}
                  onKeyDown={(e) => handleKey(e, s.index, "full")}
                  tabIndex={0}
                  type="button"
                />
              </>
            )}

            {/* 채운 부분: overflow로 percent만큼 보이게 함 (표시용으로 동일하게 사용) */}
            <div
              aria-hidden
              className="absolute left-0 top-0 z-10 overflow-hidden"
              style={{ width: `${percent}%`, height: size }}
            >
              <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0107 0.5C12.4635 0.500248 13.0083 0.794384 13.3574 1.54199L15.8672 7.01855L15.9805 7.26562L16.249 7.30566L22.0957 8.16602C22.8623 8.27975 23.2976 8.71021 23.4424 9.1875C23.5889 9.67051 23.4691 10.3065 22.9004 10.8818L22.8994 10.8828L18.7012 15.1494L18.5225 15.332L18.5645 15.584L19.5771 21.5732C19.7165 22.3996 19.4487 22.9737 19.0732 23.2588C18.7037 23.5392 18.118 23.6246 17.4248 23.2432L17.4229 23.2422L12.251 20.4238L12.0098 20.293L11.7705 20.4248C10.5875 21.0771 7.21781 22.9005 6.59766 23.2432C5.9058 23.6243 5.32208 23.5392 4.95312 23.2588C4.57753 22.9733 4.30952 22.3979 4.44629 21.5713V21.5693L5.4209 15.5811L5.46191 15.3311L5.28418 15.1494L1.08594 10.8828C0.522637 10.3079 0.409871 9.67316 0.5625 9.18945C0.714196 8.70922 1.15864 8.2786 1.92578 8.16699L1.92773 8.16602L7.7373 7.30566L8.00391 7.26562L8.11719 7.02148L10.665 1.54102C11.0149 0.793842 11.5592 0.50007 12.0107 0.5Z"
                  fill={DEFAULT_COLOR}
                  stroke={DEFAULT_COLOR}
                  strokeWidth="0.9"
                />
              </svg>
            </div>

            {/* outline 항상 보이기 */}
            <div aria-hidden className="absolute left-0 top-0 z-20">
              <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0107 0.5C12.4635 0.500248 13.0083 0.794384 13.3574 1.54199L15.8672 7.01855L15.9805 7.26562L16.249 7.30566L22.0957 8.16602C22.8623 8.27975 23.2976 8.71021 23.4424 9.1875C23.5889 9.67051 23.4691 10.3065 22.9004 10.8818L22.8994 10.8828L18.7012 15.1494L18.5225 15.332L18.5645 15.584L19.5771 21.5732C19.7165 22.3996 19.4487 22.9737 19.0732 23.2588C18.7037 23.5392 18.118 23.6246 17.4248 23.2432L17.4229 23.2422L12.251 20.4238L12.0098 20.293L11.7705 20.4248C10.5875 21.0771 7.21781 22.9005 6.59766 23.2432C5.9058 23.6243 5.32208 23.5392 4.95312 23.2588C4.57753 22.9733 4.30952 22.3979 4.44629 21.5713V21.5693L5.4209 15.5811L5.46191 15.3311L5.28418 15.1494L1.08594 10.8828C0.522637 10.3079 0.409871 9.67316 0.5625 9.18945C0.714196 8.70922 1.15864 8.2786 1.92578 8.16699L1.92773 8.16602L7.7373 7.30566L8.00391 7.26562L8.11719 7.02148L10.665 1.54102C11.0149 0.793842 11.5592 0.50007 12.0107 0.5Z"
                  stroke="#99CCFF"
                  strokeWidth="0.9"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
