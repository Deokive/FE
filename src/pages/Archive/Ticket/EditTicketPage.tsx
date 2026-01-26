import TicketForm from "@/components/ticket/TicketForm";
import TicketFormSkeleton from "@/components/ticket/TicketFormSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import type { Ticket, UpdateTicketRequest } from "@/types/ticket";
import { useGetTicket } from "@/apis/queries/ticket/useGetTicket";
import { useUpdateTicket } from "@/apis/mutations/ticket/usePatchTicket";

export default function EditTicketPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();

  const {
    data: ticketData,
    isLoading,
    isError,
  } = useGetTicket({
    ticketId: Number(ticketId),
  });

  const { mutate: updateTicket } = useUpdateTicket();

  const initial: Ticket | undefined = ticketData
    ? {
        id: ticketData.id,
        eventName: ticketData.title,
        dateTime: ticketData.date,
        place: ticketData.location,
        seat: ticketData.seat,
        casting: ticketData.casting,
        rating: ticketData.score,
        review: ticketData.review,
        imageUrl: ticketData.file?.cdnUrl,
        fileId: ticketData.file?.fileId,
      }
    : undefined;

  if (isLoading) {
    return (
      <div className="p-8">
        <TicketFormSkeleton />
      </div>
    );
  }

  if (isError || !initial) {
    return <div>해당 티켓을 찾을 수 없거나 오류가 발생했습니다.</div>;
  }

  const handleSave = (payload: Ticket) => {
    const requestData: UpdateTicketRequest = {
      ticketId: payload.id,
      title: payload.eventName,
      date: payload.dateTime || new Date().toISOString(),
      location: payload.place,
      seat: payload.seat,
      casting: payload.casting,
      score: payload.rating,
      review: payload.review,
      fileId: payload.fileId,
      deleteFile: payload.fileId === null ? true : false,
    };
    updateTicket(requestData, {
      onSuccess: () => {
        navigate(-1);
      },
      onError: () => {
        alert("티켓 수정에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  return (
    <div className="p-8">
      <TicketForm
        initial={initial}
        onSave={handleSave}
        onCancel={() => navigate(-1)}
        submitLabel="수정"
      />
    </div>
  );
}
