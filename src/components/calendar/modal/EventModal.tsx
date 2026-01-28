import { useEffect } from "react";
import Event from "./Event";
import Sports from "./Sports";
import Sticker from "./Sticker";
import type { CreateEventRequest, LabelData, UpdateEventRequest } from "@/types/calendar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PatchCalendar, PostCalendar } from "@/apis/mutations/calendar/Calendar";

type ModalType = true | false | null;

interface EventModalProps {
  archiveId: number; //아카이브 ID
  open: boolean;
  onClose: () => void;
  type: ModalType;
  startDate: Date | null;
  editData?: LabelData | null;
}

const EventModal = ({
  archiveId,
  open,
  onClose,
  type,
  startDate,
  editData,
}: EventModalProps) => {
  const queryClient = useQueryClient();
  const isEditMode = !!editData && editData.id != null;

  // ✅ 일정 생성 mutation
  const createEventMutation = useMutation({
    mutationFn: (body: CreateEventRequest) => PostCalendar(archiveId, body),
    onSuccess: () => {
      // TODO: 월별 일정 refetch 필요하면 여기서 invalidateQueries
      queryClient.invalidateQueries({ queryKey: ["monthlyEvents", archiveId] });
      onClose();
    },
    onError: (error) => {
      console.error("일정 생성 실패:", error);
      alert("일정 생성에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // ✅ 일정 수정 mutation
  const updateEventMutation = useMutation({
    mutationFn: (body: UpdateEventRequest) => PatchCalendar(editData?.id as number, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monthlyEvents", archiveId] });
      onClose();
    },
    onError: (error) => {
      console.error("일정 수정 실패:", error);
      alert("일정 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // ✅ 자식에서 보내주는 기본 데이터 + 여기서 isSportType만 세팅
  const handleSubmit = (base: Omit<CreateEventRequest, "isSportType">) => {
    const payload = {
      ...base,
      isSportType: type === true,
    };

    if (isEditMode) {
      // 수정 모달일 때
      updateEventMutation.mutate(payload);
    } else {
      // 새로 등록할 때
      createEventMutation.mutate(payload);
    }
  };


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
        {type === false && (
          <Event onClose={onClose} startDate={startDate} editData={editData} onSubmit={handleSubmit} />
        )}
        {type === true && (
          <Sports onClose={onClose} startDate={startDate} editData={editData} onSubmit={handleSubmit} />
        )}
        {type === null && <Sticker onClose={onClose} />}
      </div>
    </div>
  );
};

export default EventModal;
