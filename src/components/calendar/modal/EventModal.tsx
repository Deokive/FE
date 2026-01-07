import { useEffect } from "react";
import Event from "./Event";
import Sports from "./Sports";
import Sticker from "./Sticker";

type ModalType = "event" | "sticker" | "sports" | null;

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  type: ModalType;
  startDate: Date | null;
}

const EventModal = ({ open, onClose, type, startDate }: EventModalProps) => {
  // ESC로 닫기
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);
  // 페이지 스크롤 잠굼
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // ✅ 페이지 스크롤 잠금

    return () => {
      document.body.style.overflow = prev; // ✅ 원복
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] bg-black/50 flex items-center justify-center scroll-stop"
      onMouseDown={onClose} // 바깥 클릭 시 닫기
    >
      {/* ✅ 실제 모달 박스 (여기 클릭은 닫히지 않게) */}
      <div
        className="absolute w-200 flex flex-col pl-20 py-[54px] pr-15 gap-12 rounded-xl bg-white"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {type === "event" && <Event onClose={onClose} startDate={startDate} />}
        {type === "sticker" && <Sticker onClose={onClose} />}
        {type === "sports" && (
          <Sports onClose={onClose} startDate={startDate} />
        )}
      </div>
    </div>
  );
};

export default EventModal;
