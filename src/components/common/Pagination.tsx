import { useMemo, useState } from "react";
import FirstIcon from "../../assets/icon/FirstIcon";
import PrevIcon from "../../assets/icon/PrevIcon";
import NextIcon from "../../assets/icon/NextIcon";
import LastIcon from "../../assets/icon/LastIcon";
import clsx from "clsx";

type Props = {
  totalItems: number;
  pageSize?: number;
  visiblePages?: number; // 그룹 크기, 기본 5
  currentPage?: number; // controlled
  defaultPage?: number; // uncontrolled 초기값
  onChange?: (page: number) => void;
  disabled?: boolean;
  className?: string;
};

export default function Pagination({
  totalItems,
  pageSize = 1,
  visiblePages = 5,
  currentPage,
  defaultPage = 1,
  onChange,
  disabled = false,
  className = "",
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const [internalPage, setInternalPage] = useState<number>(
    Math.min(Math.max(1, defaultPage), totalPages)
  );
  const page = currentPage ?? internalPage;

  // 현재 페이지가 속한 그룹(visiblePages 단위)
  const groupIndex = Math.floor((page - 1) / visiblePages);
  const groupStart = groupIndex * visiblePages + 1;
  const groupEnd = Math.min(groupStart + visiblePages - 1, totalPages);

  // 마지막 그룹의 시작(예: totalPages=12, visiblePages=5 -> lastGroupStart = 11)
  const lastGroupStart =
    Math.floor((totalPages - 1) / visiblePages) * visiblePages + 1;

  const pages = useMemo(() => {
    const arr: number[] = [];
    for (let i = groupStart; i <= groupEnd; i++) arr.push(i);
    return arr;
  }, [groupStart, groupEnd]);

  const setPage = (p: number) => {
    if (disabled) return;
    const next = Math.min(Math.max(1, p), totalPages);
    if (currentPage == null) setInternalPage(next);
    onChange?.(next);
  };

  // 한 페이지 이동 (<, >)
  const goPrevOne = () => setPage(page - 1);
  const goNextOne = () => setPage(page + 1);

  // 그룹 이동: 현재 그룹 기준으로 다음/이전 그룹의 '첫 페이지'로 이동
  const nextGroupStart = Math.min(groupStart + visiblePages, lastGroupStart);
  const prevGroupStart = Math.max(groupStart - visiblePages, 1);

  const goPrevGroup = () => setPage(prevGroupStart); // << 이전 그룹의 첫 페이지
  const goNextGroup = () => setPage(nextGroupStart); // >> 다음 그룹의 첫 페이지

  // 처음/마지막 (선택적)
  // const goFirst = () => setPage(1);
  // const goLast = () => setPage(totalPages);

  const isDisabled = (cond: boolean) => (cond || disabled ? true : false);

  return (
    <nav
      className={clsx("inline-flex items-center", className)}
      aria-label="Pagination"
    >
      {/* << 이전 그룹 (FirstIcon) */}
      <button
        type="button"
        onClick={goPrevGroup}
        disabled={isDisabled(groupStart === 1)}
        aria-label={`이전 ${visiblePages}페이지 그룹`}
        className={clsx(
          "flex items-center mr-2.5",
          isDisabled(groupStart === 1)
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer hover:bg-surface-100"
        )}
      >
        <FirstIcon size={18} ariaHidden={false} ariaLabel="이전 그룹" />
      </button>

      {/* < 한 페이지 뒤로 (PrevIcon) */}
      <button
        type="button"
        onClick={goPrevOne}
        disabled={isDisabled(page === 1)}
        aria-label="한 페이지 뒤로"
        className={clsx(
          "flex items-center mr-5",
          isDisabled(page === 1)
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer hover:bg-surface-100"
        )}
      >
        <PrevIcon size={18} ariaHidden={false} ariaLabel="이전" />
      </button>

      {/* "이전" 텍스트 */}
      <span className="typo-body2-medium text-mid mx-2 select-none mr-12">
        이전
      </span>

      {/* 페이지 숫자들 */}
      <div className="inline-flex items-center gap-2.5">
        {pages.map((p) => {
          const active = p === page; // 현재 페이지만 활성화
          return (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              aria-current={active ? "page" : undefined}
              aria-label={`페이지 ${p}`}
              disabled={disabled}
              className={clsx(
                "min-w-[36px] h-8 flex items-center justify-center rounded-md text-sm transition-colors duration-150",
                disabled
                  ? "opacity-40 cursor-not-allowed"
                  : active
                  ? "cursor-pointer text-color-primary typo-body1-semibold"
                  : "cursor-pointer text-color-low typo-body1 hover:text-color-primary"
              )}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* "다음" 텍스트 */}
      <span className="typo-body2-medium text-mid mx-2 select-none ml-12">
        다음
      </span>

      {/* > 한 페이지 앞으로 (NextIcon) */}
      <button
        type="button"
        onClick={goNextOne}
        disabled={isDisabled(page === totalPages)}
        aria-label="한 페이지 앞으로"
        className={clsx(
          "flex items-center ml-5",
          isDisabled(page === totalPages)
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer hover:bg-surface-100"
        )}
      >
        <NextIcon size={18} ariaHidden={false} ariaLabel="다음" />
      </button>

      {/* >> 다음 그룹 (LastIcon) */}
      <button
        type="button"
        onClick={goNextGroup}
        disabled={isDisabled(
          groupStart === lastGroupStart ||
            groupStart + visiblePages > totalPages
        )}
        aria-label={`다음 ${visiblePages}페이지 그룹`}
        className={clsx(
          "flex items-center ml-2.5",
          isDisabled(
            groupStart === lastGroupStart ||
              groupStart + visiblePages > totalPages
          )
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer hover:bg-surface-100"
        )}
      >
        <LastIcon size={18} ariaHidden={false} ariaLabel="다음 그룹" />
      </button>
    </nav>
  );
}
