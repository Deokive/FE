import { X } from "lucide-react";
import CalendarDate from "../CalendarDate";
import CalendarTag from "../CalendarTag";
import ColorChange from "@/components/common/ColorChange";
import { BtnBasic } from "@/components/common/Button/Btn";
import { useState } from "react";
import type { ColorData, DateData } from "@/types/calendar";

type EventProps = {
  title?: string;
  onClose: () => void;
  startDate: Date | null;
};

const Event = ({ title, onClose, startDate }: EventProps) => {
  // ✅ 자식 컴포넌트들의 데이터를 저장할 state
  const [dateData, setDateData] = useState<DateData>({
    startDate: startDate,
    endDate: null,
    isAllDay: false,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [color, setColor] = useState<ColorData>(null);

  // 실제 API 연결 로직 추가
  const handleConfirm = () => {
    console.log("========== 일정 정보 ==========");
    console.log("일정 시작:", dateData.startDate);
    console.log("일정 종료:", dateData.endDate);
    console.log("하루 종일:", dateData.isAllDay);
    console.log("태그:", tags);
    console.log("색상:", color);
    console.log("================================");
    onClose();
  };

  return (
    <div className="flex flex-col gap-12 items-start">
      {/* 일정 이름 */}
      <div className="w-full flex items-center justify-between">
        <p className="typo-h1 text-color-mid text-left ">
          | {title || "일정 이름"}
        </p>
        <X
          className="w-12 h-12 text-color-highest cursor-pointer"
          onClick={onClose}
        />
      </div>
      {/* 일정 기간 */}
      <CalendarDate startDateValue={startDate} onDateChange={setDateData} />
      {/* 태그 설정 */}
      <CalendarTag onTagChange={(data) => setTags(data.tags)} />
      {/* 색상설정 */}
      <ColorChange onColorChange={(data) => setColor(data || null)} />
      {/* 확인버튼 */}
      <div className="w-full flex justify-end">
        <BtnBasic onClick={handleConfirm}>확인</BtnBasic>
      </div>
    </div>
  );
};

export default Event;
