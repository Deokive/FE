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
        date: payload.dateTime || null,
        location: payload.place || null,
        seat: payload.seat || null,
        casting: payload.casting || null,
        score: payload.rating,
        review: payload.review || null,
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
