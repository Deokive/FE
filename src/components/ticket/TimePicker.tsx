import React, { useEffect, useRef, useState } from "react";
import { Clock8Icon } from "lucide-react";

type Props = {
  value?: string; // "HH:MM" (24h) or undefined
  onChange?: (v?: string) => void;
  placeholder?: string;
  className?: string;
  use12Hour?: boolean; // default true: AM/PM 토글 보임
  koreanLabel?: boolean; // true면 "오전/오후 11:00" 형식, false면 "AM 11:00"
};

function pad(v: number) {
  return String(v).padStart(2, "0");
}

function format24ToLabel(value: string | undefined, korean = false) {
  if (!value) return "";
  const [Hs, Ms] = value.split(":");
  const H = Number(Hs ?? "0");
  const M = Ms ?? "00";
  const isPM = H >= 12;
  const ampm = korean ? (isPM ? "오후" : "오전") : isPM ? "PM" : "AM";
  let hh12 = H % 12;
  if (hh12 === 0) hh12 = 12;
  return `${ampm} ${String(hh12)}:${M}`;
}

export default function TimePicker({
  value,
  onChange,
  placeholder = "시간 선택",
  className = "",
  use12Hour = true,
  koreanLabel = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState<number | null>(null);
  const [minute, setMinute] = useState<number | null>(null);
  const [amPm, setAmPm] = useState<"AM" | "PM">("AM");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // prop -> state 동기화
  useEffect(() => {
    if (value) {
      const [H, M] = value.split(":").map((s) => Number(s));
      setHour(Number.isFinite(H) ? H : null);
      setMinute(Number.isFinite(M) ? M : 0);
      setAmPm(H >= 12 ? "PM" : "AM");
    } else {
      setHour(null);
      setMinute(null);
      setAmPm("AM");
    }
  }, [value]);

  // 외부 클릭 닫기
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // 입력 핸들러 (hour/minute은 raw 숫자 상태)
  const onHourInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setHour(null);
      return;
    }
    let num = Number(raw);
    if (use12Hour) {
      if (num < 1) num = 1;
      if (num > 12) num = 12;
      if (num === 12) num = amPm === "AM" ? 0 : 12;
      else num = amPm === "PM" ? num + 12 : num;
    } else {
      if (num > 23) num = 23;
    }
    setHour(num);
  };

  const onMinuteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setMinute(null);
      return;
    }
    let num = Number(raw);
    if (!Number.isFinite(num) || Number.isNaN(num)) {
      setMinute(0);
      return;
    }
    if (num > 59) num = 59;
    setMinute(num);
  };

  const toggleAmPm = () => {
    const prev = amPm;
    const next = prev === "AM" ? "PM" : "AM";
    setAmPm(next);
    if (hour === null) return;
    let h = hour;
    if (prev === "AM" && next === "PM") {
      if (h < 12) h = (h + 12) % 24;
    } else if (prev === "PM" && next === "AM") {
      if (h >= 12) h = h - 12;
    }
    setHour(h);
  };

  const hourDisplay = () => {
    if (hour === null) return "";
    if (use12Hour) {
      const h = hour % 12;
      return String(h === 0 ? 12 : h);
    }
    return pad(hour);
  };

  const minuteDisplay = () => {
    if (minute === null) return "";
    return String(minute);
  };

  const onConfirm = () => {
    const h = hour ?? 0;
    const m = minute ?? 0;
    const formatted = `${pad(h)}:${pad(m)}`;
    onChange?.(formatted);
    setOpen(false);
  };

  const onCancel = () => {
    if (value) {
      const [H, M] = value.split(":").map((s) => Number(s));
      setHour(Number.isFinite(H) ? H : null);
      setMinute(Number.isFinite(M) ? M : 0);
      setAmPm(H >= 12 ? "PM" : "AM");
    } else {
      setHour(null);
      setMinute(null);
      setAmPm("AM");
    }
    setOpen(false);
  };

  // 버튼 표시 레이블
  const displayLabel = value ? format24ToLabel(value, false) : placeholder;
  const hasValue = !!value;

  return (
    <div className={`relative inline-block ${className}`} ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2.5 p-2.5 rounded-lg border-2 border-mid cursor-pointer hover:bg-surface-container-20 focus:outline-none"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span
          className={`typo-body1 ${
            hasValue ? "text-surface-container-50" : "text-surface-container-40"
          }`}
        >
          {displayLabel}
        </span>

        {!hasValue && (
          <svg
            className="size-5 text-color-high"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <Clock8Icon />
          </svg>
        )}
      </button>

      {/* 모달 */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="absolute z-50 mt-6 bg-white rounded-xl shadow-xl p-6"
          style={{ minWidth: 328 }}
        >
          <div className="mb-6">
            <div className="typo-body1 text-color-high">시간 설정</div>
          </div>

          <div className="flex items-center gap-3 mb-11">
            <div className="flex flex-col items-center">
              <input
                inputMode="numeric"
                value={hourDisplay()}
                onChange={onHourInput}
                className="w-24 h-20 text-center typo-h1 text-surface-container-50 rounded bg-surface-container-20 placeholder:text-high"
                aria-label="시 입력"
                placeholder={use12Hour ? "00" : "HH"}
                maxLength={2}
              />
            </div>

            <div className="text-4xl font-semibold text-surface-container-50">
              :
            </div>

            <div className="flex flex-col items-center">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={minuteDisplay()}
                onChange={onMinuteInput}
                className="w-24 h-20 text-center typo-h1 text-surface-container-50 rounded bg-surface-container-20 placeholder:text-high"
                aria-label="분 입력"
                placeholder={use12Hour ? "00" : "MM"}
                maxLength={2}
              />
            </div>

            {use12Hour && (
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={toggleAmPm}
                  aria-label="AM/PM 토글"
                  aria-pressed={amPm === "AM"}
                  className="w-13 h-20 flex flex-col items-center justify-center rounded border cursor-pointer typo-body2-semibold"
                  style={{
                    borderColor: "var(--color-low)",
                    background:
                      amPm === "AM"
                        ? "linear-gradient(to bottom, var(--color-low) 0 50%, #ffffff 50% 100%)"
                        : "linear-gradient(to bottom, #ffffff 0 50%, var(--color-low) 50% 100%)",
                  }}
                >
                  <div
                    className={`mb-5 ${
                      amPm === "AM" ? "text-color-high" : "text-color-low"
                    }`}
                  >
                    AM
                  </div>
                  <div
                    className={`${
                      amPm === "PM" ? "text-color-high" : "text-color-low"
                    }`}
                  >
                    PM
                  </div>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg bg-surface-container-20 typo-body1 text-color-highest"
            >
              취소
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-5 py-2.5 rounded-lg bg-high typo-body1 text-white"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
