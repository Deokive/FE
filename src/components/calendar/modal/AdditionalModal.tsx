import { CalendarDays, Sticker, Volleyball } from "lucide-react";

type AdditionalModalProps = {
  open: boolean;
  onClose: () => void;
  date?: Date;
  onEventModalOpen: () => void;
  onStickerModalOpen: () => void;
  onSportsModalOpen: () => void;
};

const AdditionalModal = ({
  open = false,
  onClose,
  date,
  onEventModalOpen,
  onStickerModalOpen,
  onSportsModalOpen,
}: AdditionalModalProps) => {
  if (!open) return null;

  return (
    <div
      className="w-60 h-53 flex px-10 pt-8 pb-6 flex-col items-start rounded-lg shadow-2xl bg-white"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="typo-h2-semibold text-color-highest">활동 기록</p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            className="flex gap-2 items-center pl-1 py-1 hover:bg-brand-blue-100 active:bg-brand-blue-200"
            onClick={() => {
              onEventModalOpen();
              console.log("이벤트 등록", date);
            }}
          >
            <CalendarDays className="w-5 h-5 text-color-high" />
            이벤트 등록
          </button>
          <button
            className="flex gap-2 items-center pl-1 py-1 hover:bg-brand-blue-100 active:bg-brand-blue-200"
            onClick={() => {
              onStickerModalOpen();
              console.log("스티커 추가", date);
            }}
          >
            <Sticker className="w-5 h-5 text-color-high" />
            스티커 추가
          </button>
          <button
            className="flex gap-2 items-center pl-1 py-1 hover:bg-brand-blue-100 active:bg-brand-blue-200"
            onClick={() => {
              onSportsModalOpen();
              console.log("스포츠 경기 기록", date);
            }}
          >
            <Volleyball className="w-5 h-5 text-color-high" />
            스포츠 경기 기록
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalModal;
