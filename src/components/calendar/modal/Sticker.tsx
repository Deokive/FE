import { X } from "lucide-react";

type StickerProps = {
  onClose: () => void;
};

const Sticker = ({ onClose }: StickerProps) => {
  return (
    <div className="flex flex-col gap-4 items-start">
      {/* 일정 이름 */}
      <div className="w-full flex items-center justify-between">
        <p className="typo-h1 text-color-highest text-left">스티커</p>
        <X
          className="w-12 h-12 text-color-highest cursor-pointer"
          onClick={onClose}
        />
      </div>
      {/* 일정 기간 */}
    </div>
  );
};

export default Sticker;
