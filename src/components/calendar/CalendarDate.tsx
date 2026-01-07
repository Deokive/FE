import { useEffect, useState } from "react";
import DateInput from "@/utils/dateValidate";
import CheckboxIcon from "@/assets/Icon/CheckboxIcon";

type CalendarDateProps = {
  startDateValue: Date | null;
  onDateChange?: (data: {
    startDate: Date | null;
    endDate: Date | null;
    isAllDay: boolean;
  }) => void;
};

const CalendarDate = ({ startDateValue, onDateChange }: CalendarDateProps) => {
  const [startDate, setStartDate] = useState<Date | null>(startDateValue);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isAllDay, setIsAllDay] = useState<boolean>(false);

  // ✅ 값이 변경될 때마다 부모에게 알림
  useEffect(() => {
    onDateChange?.({ startDate, endDate, isAllDay });
  }, [startDate, endDate, isAllDay, onDateChange]);

  return (
    <div className="flex flex-col items-start gap-5">
      {/* 일정 시작 */}
      <div className="w-165 flex itmes-center gap-5">
        <p className="py-1.5 typo-h2-semibold text-color-highest">일정 시작</p>
        <div className="w-[550px]">
          <DateInput
            value={startDate}
            onChange={(date) => setStartDate(date)}
            placeholder="YYYY.MM.DD"
            showTime={!isAllDay}
          />
        </div>
      </div>
      {/* 일정 종료 */}
      <div className="w-165 flex itmes-center gap-5">
        <p className="py-1.5 typo-h2-semibold text-color-highest">일정 종료</p>
        <div className="w-[550px]">
          <DateInput
            value={endDate}
            onChange={(date) => setEndDate(date)}
            placeholder="YYYY.MM.DD"
            showTime={!isAllDay}
          />
        </div>
      </div>
      {/* 하루종일 버튼 */}
      <div className="flex items-center gap-3 justify-center">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => setIsAllDay(!isAllDay)}
        >
          <CheckboxIcon checked={isAllDay} size={24} />
        </div>
        <p className="typo-body1 text-color-highest text-center">하루 종일</p>
      </div>
    </div>
  );
};

export default CalendarDate;
