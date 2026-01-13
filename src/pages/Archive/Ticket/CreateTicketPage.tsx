import TicketForm from "@/components/ticket/TicketForm";
import { useTickets } from "@/hooks/useTickets";
import { useNavigate } from "react-router-dom";
import type { Ticket } from "@/types/ticket";

export default function CreateTicketPage() {
  const { addTicket } = useTickets(); // 실제는 상위에서 context or api 사용 권장
  const navigate = useNavigate();

  const handleSave = (payload: Ticket) => {
    addTicket(payload);
    // 페이지 이동 혹은 토스트
    navigate(-1);
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
