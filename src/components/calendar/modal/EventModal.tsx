import Event from "./Event";
import Sports from "./Sports";
import Sticker from "./Sticker";

type ModalType = "event" | "sticker" | "sports" | null;

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  type: ModalType;
}

const EventModal = ({ open, onClose, type }: EventModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] bg-black/50 flex items-center justify-center scroll-stop"
      onMouseDown={onClose} // 바깥 클릭 시 닫기
    >
      {/* ✅ 실제 모달 박스 (여기 클릭은 닫히지 않게) */}
      <div
        className="absolute w-200 flex flex-col items-end pl-20 py-[54px] pr-15 gap-12 rounded-xl bg-white"
        onMouseDown={(e) => e.stopPropagation()}
      >
        안녕
        {type === "event" && <Event />}
        {type === "sticker" && <Sticker />}
        {type === "sports" && <Sports />}
      </div>
    </div>
  );
};

export default EventModal;
