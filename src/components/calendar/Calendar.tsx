// src/components/Calendar.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css"; // 커스텀 CSS

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarProps {
  /** 날짜별 라벨 데이터 (키: "YYYY-MM-DD" 형식, 값: 라벨 텍스트 배열) */
  labelData?: Record<string, string[]>;
  /** 날짜별 스티커 데이터 (키: "YYYY-MM-DD" 형식, 값: 스티커 ID 또는 식별자) */
  stickerData?: Record<string, string>; //스티커는 날짜당 한개로 생각해서 string으로 처리
  /** 스티커 이미지 URL (스티커 영역에 표시할 이미지) */
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
        <div className="flex flex-col items-start justify-start w-full h-full gap-1">
          {/* 1. 커스텀 날짜 숫자 (우측 상단 배치 등 CSS로 제어) */}
          <div className="custom-date-number w-full h-[36px] px-[16px] text-right typo-h2">
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
  const handleClickDate = (date: Date) => {
    console.log(
      String(date.getFullYear()) +
        "년 " +
        String(date.getMonth() + 1).padStart(2, "0") +
        "월 " +
        String(date.getDate()).padStart(2, "0") +
        "일에 일정 추가 api 호출"
    );
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
          /** 날짜 클릭 시 실행되는 콜백 함수 */
          onClickDay={handleClickDate}
          /** 선택된 날짜가 변경될 때 호출되는 콜백 함수 */
          onChange={onChange}
          /** 현재 선택된 날짜 값 */
          value={value}
          /** 달력이 표시할 시작 날짜 (현재 보여지는 월의 기준 날짜) */
          activeStartDate={activeDate}
          /** activeStartDate가 변경될 때 호출되는 콜백 (월 변경 시) */
          onActiveStartDateChange={({ activeStartDate }) => {
            if (activeStartDate) {
              setActiveDate(activeStartDate);
            }
          }}
          /** 달력 타입 설정 ("gregory": 일요일부터 시작하는 그레고리안 달력) */
          calendarType="gregory"
          /** 이전/다음 달의 날짜도 표시할지 여부 */
          showNeighboringMonth={true}
          /** 기본 네비게이션 헤더 표시 여부 (false: 커스텀 헤더 사용) */
          showNavigation={false}
          /** 각 날짜 타일에 적용할 CSS 클래스를 반환하는 함수 (요일별 색상 등) */
          tileClassName={tileClassName}
          /** 각 날짜 타일 내부에 렌더링할 커스텀 컨텐츠를 반환하는 함수 (라벨, 스티커 등) */
          tileContent={tileContent}
          /** 날짜 숫자 포맷팅 함수 (빈 문자열 반환: 기본 날짜 숫자 숨김, tileContent에서 커스텀 렌더링) */
          formatDay={() => ""}
          /** 요일 약어 포맷팅 함수 (Sun, Mon, Tue 등) */
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
