import React, { useMemo, useState } from "react";
import type { Ticket } from "@/types/ticket";
import TicketCard from "./TicketCard";
import TicketEmptyCard from "./TicketEmptyCard";
import { useNavigate } from "react-router-dom";
import ticketbook from "@/assets/images/ticketbook.png";
import { Pencil, PlusIcon, SquareX } from "lucide-react";
import { BtnBasic, BtnIcon } from "@/components/common/Button/Btn";
import TrashIcon from "@/assets/Icon/TrashIcon";

export default function TicketBook({
  tickets,
  onDeleteMany,
}: {
  tickets: Ticket[];
  onDeleteMany?: (ids: string[]) => void;
}) {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  const hasTickets = tickets.length > 0;

  const toggleCheck = (id: string, checked: boolean) => {
    setCheckedMap((p) => ({ ...p, [id]: checked }));
  };

  const checkedIds = useMemo(
    () => Object.keys(checkedMap).filter((k) => checkedMap[k]),
    [checkedMap]
  );

  const handleDeleteSelected = () => {
    if (checkedIds.length === 0) {
      alert("삭제할 티켓을 선택하세요.");
      return;
    }
    if (!confirm(`${checkedIds.length}개의 티켓을 삭제하시겠어요?`)) return;
    onDeleteMany?.(checkedIds);
    setCheckedMap({});
    setEditMode(false);
  };

  const placementIndices = [0, 1, 2, 3];

  // orderedTickets: createdAt이 있으면 오래된->최신으로 정렬.
  // 없으면 tickets 배열 자체를 '등록순(앞=오래된)'으로 가정.
  const orderedTickets: Ticket[] = (() => {
    if (!tickets || tickets.length === 0) return [];

    const allHaveCreatedAt = tickets.every(
      (t) => (t as any).createdAt !== undefined && (t as any).createdAt !== null
    );

    if (allHaveCreatedAt) {
      return [...tickets].sort((a, b) => {
        const aTime = new Date((a as any).createdAt).getTime();
        const bTime = new Date((b as any).createdAt).getTime();
        return aTime - bTime; // 오래된 순
      });
    }

    // createdAt이 없으면 배열 자체를 등록순(오래된->최신)라고 가정
    return [...tickets];
  })();

  // orderedTickets를 placementIndices 순서대로 4칸에 배치
  const placed: (Ticket | null)[] = [null, null, null, null];
  for (let i = 0; i < orderedTickets.length && i < 4; i++) {
    const slot = placementIndices[i];
    placed[slot] = orderedTickets[i];
  }

  // helper: 모든 슬롯 비어있는지
  const allEmpty = placed.every((p) => p === null);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* 툴바 */}
      <div className="w-full max-w-[1240px] flex justify-end gap-5">
        {hasTickets && (
          <>
            {!editMode && (
              <BtnIcon
                onClick={() => navigate("/ticket/create")}
                startIcon={<PlusIcon className="size-6 text-color-high" />}
              >
                티켓 추가
              </BtnIcon>
            )}
            {editMode && (
              <BtnIcon
                onClick={handleDeleteSelected}
                startIcon={<TrashIcon className="w-6 h-6 text-color-high" />}
              >
                삭제하기
              </BtnIcon>
            )}
            <BtnIcon
              onClick={() => {
                setEditMode((s) => !s);
                setCheckedMap({});
              }}
              startIcon={
                editMode ? (
                  <SquareX className="size-6 text-color-high" />
                ) : (
                  <Pencil className="w-[16.5px] h-[17.5px] text-color-high" />
                )
              }
            >
              {editMode ? "취소하기" : "편집하기"}
            </BtnIcon>
          </>
        )}
      </div>

      {/* 티켓북 배경 래퍼 */}
      <div className="relative w-full px-[55px] py-[49px] max-w-310 h-252.5">
        <img
          src={ticketbook}
          alt="티켓북 배경"
          className="absolute inset-0 w-full h-252.5 object-cover pointer-events-none"
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10">
          <div className="grid grid-cols-2 gap-x-[235px] gap-y-6.5 place-items-center">
            {placed.map((slotTicket, idx) => {
              const side = idx % 2 === 0 ? "left" : "right";
              if (allEmpty) {
                if (idx === 0) {
                  return (
                    <div key={idx} className="w-[430px]">
                      <TicketEmptyCard
                        onCreate={() => navigate("/ticket/create")}
                      />
                    </div>
                  );
                }
                return <React.Fragment key={idx} />;
              }

              if (slotTicket) {
                return (
                  <div key={slotTicket.id} className="w-[430px]">
                    <TicketCard
                      key={slotTicket.id}
                      ticket={slotTicket}
                      side={side}
                      onClick={() => {
                        if (editMode)
                          toggleCheck(
                            slotTicket.id,
                            !checkedMap[slotTicket.id]
                          );
                        else navigate(`/ticket/edit/${slotTicket.id}`);
                      }}
                      selectable={editMode}
                      checked={!!checkedMap[slotTicket.id]}
                      onToggleCheck={toggleCheck}
                    />
                  </div>
                );
              }
              return <React.Fragment key={idx} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
