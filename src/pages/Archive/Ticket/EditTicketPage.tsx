import { useMemo } from "react";
import TicketForm from "@/components/ticket/TicketForm";
import { useTickets } from "@/hooks/useTickets";
import { useNavigate, useParams } from "react-router-dom";
import type { Ticket } from "@/types/ticket";

export default function EditTicketPage() {
  const { id } = useParams();
  const { tickets, updateTicket } = useTickets();
  const navigate = useNavigate();

  const initial = useMemo(
    () => tickets.find((t) => t.id === id),
    [tickets, id]
  );

  if (!initial) {
    return <div>해당 티켓을 찾을 수 없습니다.</div>;
  }

  const handleSave = (payload: Ticket) => {
    updateTicket(payload.id, payload);
    navigate(-1);
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
