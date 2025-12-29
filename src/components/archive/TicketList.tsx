import TicketCard from "../common/Card/TicketCard";

interface Ticket {
  id?: number;
  archiveId?: number;
  title?: string;
  date?: string;
  onClick?: () => void;
}
interface TicketListProps {
  ticket?: Ticket[];
}

const TicketList = ({ ticket }: TicketListProps) => {
  return (
    <div className="w-full flex flex-col items-start gap-[60px]">
      {/* 갤러리 헤더부분 */}
      <div className="w-full flex gap-[10px]">
        <p className="flex-1 typo-h1 text-color-highest">티켓북</p>
        <button
          onClick={() => {
            console.log("더보기 클릭");
          }}
          className="h-[29px] flex items-start justify-end typo-h2-semibold text-color-high cursor-pointer"
        >
          + 더보기
        </button>
      </div>
      {/* 티켓 리스트부분 */}
      <div className="flex items-start justify-between gap-[80px]">
        {ticket?.slice(0, 3).map((ticket) => (
          <TicketCard
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
            date={ticket.date}
            onClick={() => {
              console.log(ticket.id + "번 티켓 클릭");
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
