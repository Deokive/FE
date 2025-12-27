// src/components/Calendar.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css"; // 커스텀 CSS

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarProps {
  labelData?: Record<string, string[]>;
  stickerData?: Record<string, string>;
  stickerImage?: string;
}

const labelColors = ["#B9E2B6", "#99CCFF", "#D2D2FF", "#FFD1DC"];

const Calendar = ({ labelData, stickerData, stickerImage }: CalendarProps) => {
  const [value, onChange] = useState<Value>(new Date());
  const [activeDate, setActiveDate] = useState(new Date());

  const handleNextMonth = () => {
    const nextMonth = new Date(
      activeDate.getFullYear(),
      activeDate.getMonth() + 1,
      1
    );
    setActiveDate(nextMonth);
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      activeDate.getFullYear(),
      activeDate.getMonth() - 1,
      1
    );
    setActiveDate(prevMonth);
  };

  // 날짜 포맷팅 함수 (요일별 색상 적용을 위해)
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const day = date.getDay();
      const isCurrentMonth =
        date.getMonth() === activeDate.getMonth() &&
        date.getFullYear() === activeDate.getFullYear();

      let className = "calendar-day";
      if (!isCurrentMonth) {
        className += " calendar-day-other-month";
      } else if (day === 0) {
        className += " calendar-day-sunday";
      } else if (day === 6) {
        className += " calendar-day-saturday";
      } else {
        className += " calendar-day-weekday";
      }
      return className;
    }
    return "";
  };
  // ▼ [핵심] 타일 내부 렌더링 함수
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      // 날짜 포맷 (YYYY-MM-DD) - 데이터 매칭용
      const dateString = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      //라벨 더미 데이터 매칭
      const labels = labelData?.[dateString] || [];
      const sticker = stickerData?.[dateString] || "";
      return (
        <div className="flex flex-col items-start justify-start w-full h-full ">
          {/* 1. 커스텀 날짜 숫자 (우측 상단 배치 등 CSS로 제어) */}
          <div className="custom-date-number w-full h-[44px] px-[16px] text-right typo-h2">
            {date.getDate()}
          </div>

          {/* 2. 라벨 영역 */}
          <div className="w-full flex flex-col items-start gap-[10px]">
            {labels.map((text, idx) => (
              <div
                key={idx}
                className="w-full typo-body1 text-left px-2 py-1 rounded-[4px] text-color-highest truncate"
                style={{
                  backgroundColor:
                    idx % 4 === 0
                      ? labelColors[0]
                      : idx % 4 === 1
                      ? labelColors[1]
                      : idx % 4 === 2
                      ? labelColors[2]
                      : labelColors[3],
                }}
              >
                {text}
              </div>
            ))}
            {/* 예시: 1일인 경우 스티커 영역 표시 */}
            {sticker && (
              <div className="w-full h-[80px] bg-[#E9ECF1] rounded-[4px]">
                <img
                  src={stickerImage || ""}
                  alt="스티커영역"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-start">
      {/* 커스텀 헤더 */}
      <div className="flex items-start justify-center gap-[40px] py-[24px]">
        <button
          onClick={handlePrevMonth}
          className="flex items-center justify-center w-6 h-6 cursor-pointer"
        >
          <ChevronLeft size={24} className="text-color-high" />
        </button>
        <span className="typo-h2-semibold text-color-highest">
          {activeDate.getFullYear()}년 {activeDate.getMonth() + 1}월
        </span>
        <button
          onClick={handleNextMonth}
          className="flex items-center justify-center w-6 h-6 cursor-pointer"
        >
          <ChevronRight size={24} className="text-color-high" />
        </button>
      </div>

      {/* 달력 */}
      <div className="calendar-container w-[1240px]">
        <ReactCalendar
          onChange={onChange}
          value={value}
          activeStartDate={activeDate}
          onActiveStartDateChange={({ activeStartDate }) => {
            if (activeStartDate) {
              setActiveDate(activeStartDate);
            }
          }}
          calendarType="gregory" // [중요] 일요일부터 시작하도록 강제 설정
          showNeighboringMonth={true}
          showNavigation={false}
          tileClassName={tileClassName}
          // ▼ [중요] 커스텀 컨텐츠 활성화
          tileContent={tileContent}
          formatDay={() => ""}
          // tileContent={tileContent} // 날짜 내용 명시적 렌더링
          formatShortWeekday={(locale, date) => {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return days[date.getDay()];
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
