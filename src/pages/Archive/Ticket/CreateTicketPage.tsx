import TicketForm from "@/components/ticket/TicketForm";
import { useNavigate, useParams } from "react-router-dom";
import type { Ticket } from "@/types/ticket";
import { useAddTicket } from "@/apis/mutations/ticket/usePostTicket";

export default function CreateTicketPage() {
  const { archiveId } = useParams<{ archiveId: string }>();
  const navigate = useNavigate();
  const { mutate: addTicket } = useAddTicket();

  const handleSave = (payload: Ticket) => {
    addTicket(
      {
        archiveId: Number(archiveId),
        title: payload.eventName,
        date: payload.dateTime ?? new Date().toISOString(),
        location: payload.place,
        seat: payload.seat,
        casting: payload.casting,
        score: payload.rating,
        review: payload.review,
        fileId: payload.fileId,
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  return (
    <div className="p-10">
      <TicketForm
        onSave={handleSave}
        onCancel={() => navigate(-1)}
        submitLabel="등록"
      />
    </div>
  );
}
