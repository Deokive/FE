import { X } from "lucide-react";

type EventProps = {
  onClose: () => void;
};

const Event = ({ onClose }: EventProps) => {
  return (
    <div className="flex flex-col gap-4 items-start">
      {/* 일정 이름 */}
      <div className="w-full flex items-center justify-between">
        <p className="typo-h1 text-color-mid text-left">| 일정 이름</p>
        <X
          className="w-12 h-12 text-color-highest cursor-pointer"
          onClick={onClose}
        />
      </div>
      {/* 일정 기간 */}
      {/* 태그 설정 */}
      {/* 색상설정 */}
      {/* 확인버튼 */}
    </div>
  );
};

export default Event;
