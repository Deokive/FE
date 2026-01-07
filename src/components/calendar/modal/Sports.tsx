import { X } from "lucide-react";

type SportsProps = {
  onClose: () => void;
};

const Sports = ({ onClose }: SportsProps) => {
  return (
    <div className="flex flex-col gap-4 items-start">
      {/* 일정 이름 */}
      <div className="w-full flex items-center justify-between">
        <p className="typo-h1 text-color-highest text-left">스포츠 결과 기록</p>
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

export default Sports;
