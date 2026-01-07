const CalendarDate = () => {
  return (
    <div className="flex flex-col items-start gap-5">
      {/* 일정 시작 */}
      <div className="w-full flex itmes-start">
        <p className="typo-h2-semibold text-color-highest">일정 시작</p>
      </div>
      {/* 일정 종료 */}
      <div className="w-full flex itmes-start">
        <p className="typo-h2-semibold text-color-highest">일정 종료</p>
      </div>
      {/* 하루종일 버튼 */}
    </div>
  );
};

export default CalendarDate;
