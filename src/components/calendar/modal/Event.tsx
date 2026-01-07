import { X } from "lucide-react";
import CalendarDate from "../CalendarDate";
import CalendarTag from "../CalendarTag";
import ColorChange from "@/components/common/ColorChange";
import { BtnBasic } from "@/components/common/Button/Btn";
import { useState } from "react";
import type { ColorData, DateData, LabelData } from "@/types/calendar";

type EventProps = {
  title?: string;
  onClose: () => void;
  startDate: Date | null;
  editData?: LabelData | null;
};

const Event = ({ title, onClose, startDate, editData }: EventProps) => {
  const isEditMode = !!editData;

  // ✅ editData가 있으면 해당 데이터로 초기화
  const [eventTitle, setEventTitle] = useState(editData?.title || "");
  const [dateData, setDateData] = useState<DateData>({
    startDate: editData ? new Date(editData.date) : startDate,
    endDate: null,
    isAllDay: editData ? !editData.hasTime : false,
  });
  const [tags, setTags] = useState<string[]>(editData?.hashtags || []);
  const [color, setColor] = useState<ColorData>(editData?.color || null);

  const handleConfirm = () => {
    console.log("========== 일정 정보 ==========");
    console.log("모드:", isEditMode ? "수정" : "등록");
    console.log("일정 이름:", eventTitle);
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
      <CalendarDate
        startDateValue={dateData.startDate}
        onDateChange={setDateData}
        initialTime={editData?.time} // ✅ 추가
        initialIsAllDay={editData ? !editData.hasTime : false} // ✅ 추가
      />
      {/* 태그 설정 */}
      <CalendarTag tags={tags} onTagChange={(data) => setTags(data.tags)} />
      {/* 색상설정 */}
      <ColorChange
        initialColor={color}
        onColorChange={(data) => setColor(data || null)}
      />
      {/* 확인버튼 */}
      <div className="w-full flex justify-end">
        <BtnBasic onClick={handleConfirm}>
          {isEditMode ? "수정" : "확인"}
        </BtnBasic>
      </div>
    </div>
  );
};

export default Event;
