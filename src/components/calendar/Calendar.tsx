// src/components/Calendar.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css"; // 커스텀 CSS
import AdditionalModal from "./modal/AdditionalModal";
import EventModal from "./modal/EventModal";
import type { LabelData } from "@/types/calendar";
import EventListModal from "./modal/EventListModal";

interface CalendarProps {
  archiveId: number; //아카이브 ID
  /** 날짜별 라벨 데이터 (키: "YYYY-MM-DD" 형식, 값: 라벨 텍스트 배열) */
  labelData?: LabelData[];
  /** 날짜별 스티커 데이터 (키: "YYYY-MM-DD" 형식, 값: 스티커 ID 또는 식별자) */
  stickerData?: Record<string, string>; //스티커는 날짜당 한개로 생각해서 string으로 처리
  /** 스티커 이미지 URL (스티커 영역에 표시할 이미지) */
  stickerImage?: string;
  mode?: "interactive" | "readonly";
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type isSportType = true | false | null; //스포츠 타입 여부, null: 스티커 타입

const Calendar = ({
  archiveId,
  labelData,
  stickerData,
  stickerImage,
  mode = "interactive",
}: CalendarProps) => {
  const isReadonly = mode === "readonly";

  // 피그마처럼 초기에는 선택(Active) 상태가 없도록 null로 시작
  const [value, onChange] = useState<Value>(null);
  const [activeDate, setActiveDate] = useState(new Date());
  // ✅ 우클릭 모달 위치(달력 래퍼 기준 좌표)
  const [additionalPos, setAdditionalPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isAdditionalModalOpen, setIsAdditionalModalOpen] = useState(false);

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventModalType, setEventModalType] = useState<isSportType>(null); //스포츠 타입 여부 null: 스티커 타입
  const [clickDate, setClickDate] = useState<Date | null>(null);
  const [editLabelData, setEditLabelData] = useState<LabelData | null>(null); // ✅ 수정할 라벨 데이터
  const [isEventListModalOpen, setIsEventListModalOpen] = useState(false); //이벤트 목록 모달 열림 여부
  const [selectedDateEvents, setSelectedDateEvents] = useState<LabelData[]>([]); //선택된 날짜의 이벤트 목록

  const calendarRootRef = useRef<HTMLDivElement | null>(null); // ✅ 추가

  // ✅ 달력 바깥 클릭 시 active 해제 + 우클릭 모달 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const root = calendarRootRef.current;
      if (!root) return;

      const target = e.target as Node | null;
      const isInside = !!target && root.contains(target);

      if (!isInside) {
        // ✅ 달력 바깥 클릭이면 active 해제
        onChange(null);
        setAdditionalPos(null);
        setIsAdditionalModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      // const label = labelData?.find((label) => label.date === dateString);

      //스티커 더미 데이터 매칭
      const sticker = stickerData?.[dateString] || "";

      return (
        <div
          className="flex flex-col items-start justify-start w-full h-full gap-1"
          // 좌클릭 시 일정 보기 api 호출
          onClick={(e) => {
            e.stopPropagation();
            // ✅ 좌클릭 액션
            if (isReadonly) return;
            onChange(date);
            setAdditionalPos(null);
            setIsAdditionalModalOpen(false);
            setClickDate(date);
            // ✅ 해당 날짜의 이벤트 필터링하여 모달 열기
            const dateString = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
            const dayEvents =
              labelData?.filter((l) => l.date === dateString) || [];
            setSelectedDateEvents(dayEvents);
            setIsEventListModalOpen(true);

            console.log("좌클릭:", dateString, "일정:", dayEvents);
          }}
          // 우클릭 시 일정 추가 api 호출
          onContextMenu={(e) => {
            e.preventDefault(); // ✅ 브라우저 우클릭 메뉴 막기
            e.stopPropagation();
            if (isReadonly) return;
            onChange(date);
            const root = calendarRootRef.current;
            if (!root) return;

            const rootRect = root.getBoundingClientRect();
            const tileRect = (
              e.currentTarget as HTMLElement
            ).getBoundingClientRect();
            // ✅ 달력 래퍼 기준으로 위치 계산 (타일 오른쪽/위쪽 근처에 띄우는 예시)
            setAdditionalPos({
              x: tileRect.right - rootRect.left - 85,
              y: tileRect.top - rootRect.top + 52,
            });

            setIsAdditionalModalOpen(true);
            setClickDate(date);
            // ✅ 우클릭 액션
            console.log(
              "우클릭:",
              String(date.getFullYear()) +
              "년 " +
              String(date.getMonth() + 1).padStart(2, "0") +
              "월 " +
              String(date.getDate()).padStart(2, "0") +
              "일에 일정 추가 api 호출",
              clickDate
            );
          }}
        >
          {/* 1. 커스텀 날짜 숫자 (우측 상단 배치 등 CSS로 제어) */}
          <div className="custom-date-number w-full h-[36px] px-[16px] text-right typo-h2">
            {date.getDate()}
          </div>

          {/* 2. 라벨 영역 */}
          <div className="w-full flex flex-col items-start gap-[10px]">
            {labelData
              ?.filter((l) => l.date === dateString) // ✅ 해당 날짜만 필터링
              .map((label, idx) => (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isReadonly) return;

                    if (label) {
                      setEditLabelData(label);
                      setEventModalType(label.isSportType ? true : false);
                      setClickDate(date);
                      setEventModalOpen(true);
                    }

                    console.log(
                      "라벨 클릭:",
                      label.title,
                      "라벨 데이터:",
                      label
                    );
                  }}
                  key={idx}
                  className="w-full typo-body1 text-left px-2 py-1 rounded-[4px] text-color-highest truncate cursor-pointer hover:opacity-80"
                  style={{
                    backgroundColor: label.color,
                  }}
                >
                  {label.title}
                </div>
              ))}
            {/* 예시: 1일인 경우 스티커 영역 표시 */}
            {sticker && (
              <div className="w-full h-[80px] bg-[#E9ECF1] rounded-[4px]">
                {stickerImage ? (
                  <img
                    src={stickerImage}
                    alt="스티커영역"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-color-mid">
                    스티커 영역
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  //여기서 API 호출
  // const handleClickDate = (date: Date) => {
  //   console.log(
  //     String(date.getFullYear()) +
  //       "년 " +
  //       String(date.getMonth() + 1).padStart(2, "0") +
  //       "월 " +
  //       String(date.getDate()).padStart(2, "0") +
  //       "일에 일정 추가 api 호출"
  //   );
  // };

  return (
    <div
      ref={calendarRootRef}
      className="flex flex-col items-start mb-10 relative"
    >
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
          tileDisabled={isReadonly ? () => true : undefined} // ✅ 타일 전부 클릭/포커스 불가
          /** 날짜 클릭 시 실행되는 콜백 함수 */
          // onClickDay={handleClickDate}
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
          formatShortWeekday={(_, date) => {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return days[date.getDay()];
          }}
        />
      </div>
      {isAdditionalModalOpen && additionalPos && (
        <div
          style={{
            position: "absolute",
            left: additionalPos.x,
            top: additionalPos.y,
            zIndex: 999999, // ✅ 최상단
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <AdditionalModal
            open
            date={value as Date}
            onClose={() => {
              setIsAdditionalModalOpen(false);
              setAdditionalPos(null);
            }}
            onEventModalOpen={() => {
              setIsAdditionalModalOpen(false);
              setEditLabelData(null); // ✅ 초기화 추가
              setEventModalType(false);
              setEventModalOpen(true);
            }}
            onStickerModalOpen={() => {
              setIsAdditionalModalOpen(false);
              setEditLabelData(null); // ✅ 초기화 추가
              setEventModalType(null);
              setEventModalOpen(true);
            }}
            onSportsModalOpen={() => {
              setIsAdditionalModalOpen(false);
              setEditLabelData(null); // ✅ 초기화 추가
              setEventModalType(true);
              setEventModalOpen(true);
            }}
          />
        </div>
      )}
      {eventModalOpen && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 999999, // ✅ 최상단
          }}
        >
          {/* 이벤트 등록 모달 */}
          <EventModal
            archiveId={archiveId}
            open={eventModalOpen}
            onClose={() => setEventModalOpen(false)}
            type={eventModalType}
            startDate={clickDate}
            editData={editLabelData}
          />
        </div>
      )}
      {isEventListModalOpen && (
        <EventListModal
          open={isEventListModalOpen}
          onClose={() => setIsEventListModalOpen(false)}
          date={clickDate}
          label={selectedDateEvents}
        />
      )}
    </div>
  );
};

export default Calendar;
