import { CalendarDays, Clock } from "lucide-react";
import React, { useMemo, useState } from "react";

type DateInputProps = {
  value: Date | null;
  onChange: (v: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  showTime?: boolean; // 시간 표시 여부
};

function toDigits(s: string) {
  return s.replace(/\D/g, "").slice(0, 8);
}

function toTimeDigits(s: string) {
  return s.replace(/\D/g, "").slice(0, 4);
}

function formatYYYYMMDD(digits: string) {
  const y = digits.slice(0, 4);
  const m = digits.slice(4, 6);
  const d = digits.slice(6, 8);
  if (!m) return y;
  if (!d) return `${y}.${m}`;
  return `${y}.${m}.${d}`;
}

function formatHHMM(digits: string) {
  const h = digits.slice(0, 2);
  const m = digits.slice(2, 4);
  if (!m) return h;
  return `${h}:${m}`;
}

function parseAndValidate(digits: string): {
  date: Date | null;
  error: string | null;
} {
  if (digits.length === 0) return { date: null, error: null };
  if (digits.length < 8)
    return { date: null, error: "YYYY.MM.DD 형식으로 입력해주세요." };

  const y = Number(digits.slice(0, 4));
  const m = Number(digits.slice(4, 6));
  const d = Number(digits.slice(6, 8));

  if (y < 1000 || y > 9999)
    return { date: null, error: "연도가 올바르지 않습니다." };
  if (m < 1 || m > 12)
    return { date: null, error: "월은 01~12 사이여야 합니다." };

  const dt = new Date(y, m - 1, d);
  const isValid =
    dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;

  if (!isValid) return { date: null, error: "존재하지 않는 날짜입니다." };

  return { date: dt, error: null };
}

function parseTimeAndValidate(digits: string): {
  hours: number | null;
  minutes: number | null;
  error: string | null;
} {
  if (digits.length === 0) return { hours: null, minutes: null, error: null };
  if (digits.length < 4)
    return {
      hours: null,
      minutes: null,
      error: "HH:MM 형식으로 입력해주세요.",
    };

  const h = Number(digits.slice(0, 2));
  const m = Number(digits.slice(2, 4));

  if (h < 0 || h > 23)
    return {
      hours: null,
      minutes: null,
      error: "시간은 00~23 사이여야 합니다.",
    };
  if (m < 0 || m > 59)
    return { hours: null, minutes: null, error: "분은 00~59 사이여야 합니다." };

  return { hours: h, minutes: m, error: null };
}

export default function DateInput({
  value,
  onChange,
  placeholder = "YYYY.MM.DD",
  showTime = true,
}: DateInputProps) {
  const [raw, setRaw] = useState<string>(() => {
    if (!value) return "";
    const y = String(value.getFullYear());
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    return `${y}${m}${d}`;
  });

  const [timeRaw, setTimeRaw] = useState<string>(() => {
    if (!value) return "";
    const h = String(value.getHours()).padStart(2, "0");
    const m = String(value.getMinutes()).padStart(2, "0");
    return `${h}${m}`;
  });

  // ✅ 에러 표시 여부를 관리하는 state 추가
  const [showDateError, setShowDateError] = useState(false);
  const [showTimeError, setShowTimeError] = useState(false);

  const formatted = useMemo(() => formatYYYYMMDD(raw), [raw]);
  const timeFormatted = useMemo(() => formatHHMM(timeRaw), [timeRaw]);
  const { error } = useMemo(() => parseAndValidate(raw), [raw]);
  const { error: timeError } = useMemo(
    () => parseTimeAndValidate(timeRaw),
    [timeRaw]
  );

  const updateDateTime = (dateDigits: string, timeDigits: string) => {
    const parsedDate = parseAndValidate(dateDigits);
    const parsedTime = parseTimeAndValidate(timeDigits);

    if (parsedDate.date && !parsedDate.error) {
      const newDate = new Date(parsedDate.date);
      if (
        parsedTime.hours !== null &&
        parsedTime.minutes !== null &&
        !parsedTime.error
      ) {
        newDate.setHours(parsedTime.hours, parsedTime.minutes);
      }
      onChange(newDate);
    } else {
      onChange(null);
    }
  };

  // ✅ Enter 키 핸들러
  const handleDateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowDateError(true);
    }
  };

  const handleTimeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowTimeError(true);
    }
  };

  return (
    <div className="w-full flex items-start gap-5">
      {/* 날짜 입력 칸 */}
      <div className="flex flex-col items-start gap-1">
        <div className="relative w-40 h-10 p-2.5 flex items-center justify-center gap-2.5 border border-border-mid rounded-lg focus-within:border-brand-blue-500">
          <input
            value={formatted}
            placeholder={placeholder}
            inputMode="numeric"
            onChange={(e) => {
              const digits = toDigits(e.target.value);
              setRaw(digits);
              setShowDateError(false); // ✅ 입력 중에는 에러 숨김
              updateDateTime(digits, timeRaw);
            }}
            onKeyDown={handleDateKeyDown} // ✅ Enter 키 이벤트 추가
            onBlur={() => setShowDateError(true)}
            className={[
              "w-full typo-body1",
              "text-color-highest placeholder:text-color-mid",
            ].join(" ")}
          />
          <CalendarDays className="text-color-high pointer-events-none" />
        </div>
        {/* ✅ showDateError가 true일 때만 에러 표시 */}
        {showDateError && error && (
          <p className="typo-body2 text-[#FF0000]">{error}</p>
        )}
      </div>

      {/* 시간 입력 칸 */}
      {showTime && (
        <div className="flex flex-col items-start gap-1">
          <div className="relative w-28 h-10 p-2.5 flex items-center justify-center gap-2.5 border border-border-mid rounded-lg focus-within:border-brand-blue-500">
            <input
              value={timeFormatted}
              placeholder="HH:MM"
              inputMode="numeric"
              onChange={(e) => {
                const digits = toTimeDigits(e.target.value);
                setTimeRaw(digits);
                setShowTimeError(false); // ✅ 입력 중에는 에러 숨김
                updateDateTime(raw, digits);
              }}
              onKeyDown={handleTimeKeyDown} // ✅ Enter 키 이벤트 추가
              onBlur={() => setShowTimeError(true)}
              className={[
                "w-full typo-body1",
                "text-color-highest placeholder:text-color-mid",
              ].join(" ")}
            />
            <Clock className="w-5 h-5 text-color-high pointer-events-none" />
          </div>
          {/* ✅ showTimeError가 true일 때만 에러 표시 */}
          {showTimeError && timeError && (
            <p className="typo-body2 text-[#FF0000]">{timeError}</p>
          )}
        </div>
      )}
    </div>
  );
}
