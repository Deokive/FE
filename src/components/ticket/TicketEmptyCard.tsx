import ticketAdd from "@/assets/images/ticketAdd.png";

export default function TicketEmptyCard({
  onCreate,
}: {
  onCreate: () => void;
}) {
  return (
    <div
      className="ticketAdd-bg w-107.5 h-60 cursor-pointer"
      onClick={onCreate}
      role="button"
      aria-label="티켓 추가"
      style={{
        backgroundImage: `url(${ticketAdd})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    ></div>
  );
}
