import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import TicketBook from "@/components/ticket/TicketBook";
import type { Ticket } from "@/types/ticket";
import Pagination from "@/components/common/Pagination";
import EditableTitle from "@/components/common/EditableTitle";
import { useGetTicketBook } from "@/apis/queries/ticket/useGetTicket";
import { useUpdateTicketBook } from "@/apis/mutations/ticket/usePatchTicket";
import { useDeleteTicket } from "@/apis/mutations/ticket/useDeleteTicket";
import { formatDateTime } from "@/utils/date";

export default function TicketBookPage() {
  const { id } = useParams<{ id: string }>();
  const archiveId = Number(id);
  const [searchParams, setSearchParams] = useSearchParams();

  // Pagination state
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 4;

  // 편집 모드 상태
  const [editMode, setEditMode] = useState(false);
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  // 티켓북 데이터 조회
  const { data, isLoading, isError } = useGetTicketBook({
    archiveId,
    page: page - 1,
    size: pageSize,
  });

  // 티켓북 이름 수정
  const { mutate: updateTicketBookName } = useUpdateTicketBook();

  // 티켓 삭제
  const { mutate: deleteTicket } = useDeleteTicket();

  // 티켓북 이름 저장
  const handleSaveName = (nextName: string) => {
    updateTicketBookName({
      archiveId,
      title: nextName,
    });
  };

  // 티켓 삭제 처리
  const handleDeleteMany = (ids: string[]) => {
    if (!ids || ids.length === 0) return;

    ids.forEach((ticketId) => {
      deleteTicket({ ticketId: Number(ticketId) });
    });
  };

  // 페이지 변경 처리
  const handleOnChangePage = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  // 데이터 변환: API 응답 → Ticket 타입
  const tickets: Ticket[] =
    data?.content?.map((item) => ({
      id: String(item.id),
      eventName: item.title,
      imageUrl: item.thumbnail,
      dateTime: formatDateTime(item.date),
      seat: item.seat,
      place: item.location,
      casting: item.casting,
      createdAt: item.createdAt,
    })) ?? [];

  const totalItems = data?.page?.totalElements ?? 0;
  const ticketbookName = data?.title ?? "티켓북";

  return (
    <div className="flex flex-col items-center">
      <div className="w-310">
        <div className="my-15">
          <EditableTitle
            value={ticketbookName}
            onSave={handleSaveName}
            placeholder="티켓북명을 입력하세요."
            maxLength={50}
          />
        </div>

        <div className="mt-5 mb-15">
          <TicketBook
            key={page}
            archiveId={archiveId}
            tickets={tickets}
            editMode={editMode}
            setEditMode={setEditMode}
            checkedMap={checkedMap}
            setCheckedMap={setCheckedMap}
            onDeleteMany={handleDeleteMany}
          />
        </div>
        <div className="flex justify-center mb-12">
          <Pagination
            totalItems={totalItems}
            pageSize={pageSize}
            visiblePages={5}
            currentPage={page}
            onChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
}
