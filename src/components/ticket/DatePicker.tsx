import React, { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ko } from "date-fns/locale";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

type Props = {
  value?: string; // yyyy-mm-dd
  onChange?: (v?: string) => void;
  placeholder?: string;
  className?: string;
};

export default function DatePicker({
  value,
  onChange,
  placeholder = "날짜 선택",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(
    value ? dayjs(value, "YYYY-MM-DD").toDate() : undefined
  );
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // value prop 변경 동기화 (외부에서 값 변경될 때)
  useEffect(() => {
    setSelected(value ? dayjs(value, "YYYY-MM-DD").toDate() : undefined);
  }, [value]);

  const handleSelect = (day?: Date) => {
    setSelected(day);
    setOpen(false);
    if (day) {
      const iso = dayjs(day).format("YYYY-MM-DD");
      onChange?.(iso);
    } else {
      onChange?.(undefined);
    }
  };

  return (
    <div className={`relative inline-block ${className}`} ref={wrapperRef}>
      {/* 버튼: 선택된 날짜 또는 플레이스홀더 */}
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2.5 p-2.5 rounded-lg border-2 border-mid cursor-pointer hover:bg-surface-container-20 focus:outline-none"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span
          className={`typo-body1 ${
            selected ? "text-surface-container-50" : "text-surface-container-40"
          }`}
        >
          {selected ? dayjs(selected).format("YYYY.MM.DD") : placeholder}
        </span>

        {!selected && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 text-color-high"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>

      {/* 달력 팝업 */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          className="absolute z-50 mt-6 bg-white rounded-xl shadow-xl p-4"
          style={{ minWidth: 300 }}
        >
          {/* 컴포넌트 내부 스타일로 우선순위 확보 */}
          <style>{`
      rdp .rdp-nav button {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
        padding: 0.25rem !important;
      }
    
      /* svg 내부 선 색 강제 */
      .rdp .rdp-nav button svg path,
      .rdp .rdp-nav button svg { stroke: #001F33 !important; fill: #001F33 !important; }

      .my-selected {
        background: #A6BBCE !important;  
        color: #ffffff !important;      
        box-shadow: none !important;     
        border: none !important;        
        outline: none !important;    
      }
      .my-selected:focus, .my-selected:focus-visible {
        box-shadow: 0 0 0 2px rgba(166,187,206,0.3) !important;
        outline: none !important;
      }
     
    `}</style>

          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(d) => handleSelect(d ?? undefined)}
            locale={ko}
            pagedNavigation
            className="rdp"
            formatters={{
              formatCaption: (date: Date) => {
                return dayjs(date).format("YYYY년 M월");
              },
            }}
            // 기본 스타일
            styles={{
              caption: {
                fontSize: "16px",
                fontWeight: 700,
                padding: "6px 0 12px",
              },
              weekday: { fontSize: "14px", color: "#A6BBCE", fontWeight: 600 },
              day: {
                fontSize: "18px",
                color: "#001F33",
                fontWeight: 400,
                width: "44px",
                height: "44px",
                lineHeight: "44px",
              },
              nav_button: { color: "#C7D4DB", fontSize: "14px" },
              table: { width: "100%" },
            }}
            modifiersClassNames={
              {
                selected: "my-selected",
              } as unknown as any
            }
            // nav 아이콘 커스터마이징
            components={
              {
                IconLeft: () => (
                  <svg
                    width="8"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5742 11.7148L15.4082 16.5488L14.0273 17.9297L7.8125 11.7148L14.0273 5.5L15.4082 6.88086L10.5742 11.7148Z"
                      fill="#001F33"
                    />
                  </svg>
                ),
                IconRight: () => (
                  <svg
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.83398 6.21484L0 1.38086L1.38086 0L7.5957 6.21484L1.38086 12.4297L0 11.0488L4.83398 6.21484Z"
                      fill="#001F33"
                    />
                  </svg>
                ),
              } as unknown as any
            }
            modifiersStyles={{
              selected: {
                background: "transparent",
                color: "#ffffff",
                boxShadow: "none",
                outline: "none",
                borderRadius: "50%",
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
