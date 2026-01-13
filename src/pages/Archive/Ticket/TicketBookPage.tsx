import React, { useCallback, useEffect, useMemo, useState } from "react";
import TicketBook from "@/components/ticket/TicketBook";
import { useTickets } from "@/hooks/useTickets";
import { useNavigate } from "react-router-dom";
import type { Ticket } from "@/types/ticket";
import Pagination from "@/components/common/Pagination";
import EditableTitle from "@/components/common/EditableTitle";

export default function TicketBookPage() {
  const initial: Ticket[] = []; // 실제 초기 데이터는 API에서 받음
  const { tickets, addTicket, updateTicket, deleteTickets /* replaceAll? */ } =
    useTickets(initial);
  const navigate = useNavigate();

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(4);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [ticketbookName, setTicketbookName] =
    useState<string>("티켓북명 (사용자 지정)");

  // 샘플 추가 (개발 편의)
  const addSample = () => {
    const id = `tmp-${Date.now()}`;
    const now = new Date().toISOString();
    const sample: Ticket = {
      id,
      eventName: `샘플 이벤트 ${totalItems + 1}`,
      imageUrl: null,
      isRepresentative: false,
      dateTime: "2026.01.01 19:00",
      place: "예시극장",
      seat: "B-1",
      rating: 2.5,
      casting: "casting",
      review:
        "Lorem ipsum dolor sit amet consectetur. Et justo laoreet molestie magna tellus non. Vitae morbi nis.",
      createdAt: now,
    };
    addTicket(sample);
    setTotalItems((t) => t + 1);
  };

  // 저장 콜백: 로컬 상태 업데이트, 나중에 API 호출로 대체
  const handleSaveName = (nextName: string) => {
    setTicketbookName(nextName);
    // 나중에 API 연결: axios.post('/api/...', { name: nextName }) 등
  };

  // 1) tickets가 바뀌면 totalItems를 동기화 (항상 최신 값 유지)
  useEffect(() => {
    setTotalItems(tickets.length);
    // 현재 페이지가 총 페이지 수를 초과하면 마지막 페이지로 보정
    const lastPage = Math.max(
      1,
      Math.ceil(Math.max(0, tickets.length) / pageSize)
    );
    if (page > lastPage) setPage(lastPage);
  }, [tickets, pageSize, page]);

  // loadPage: 1-based pageNumber 받음
  const loadPage = useCallback(async (pageNumber: number) => {
    setLoading(true);
    try {
      // 나중에 API 로직으로 대체 (서버에 보낼 때 0-based로 변환 필요하면 변환)
      setPage(pageNumber);
    } catch (err) {
      console.error("페이지 로드 실패", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const currentPageTickets = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return tickets.slice(start, end);
  }, [tickets, page, pageSize]);

  // 2) 삭제 처리: 부모에서 tickets 삭제 + totalItems 보정 + 페이지 보정
  const handleDeleteMany = useCallback(
    (ids: string[]) => {
      if (!ids || ids.length === 0) return;

      // (A) 로컬 훅에서 항목 삭제
      deleteTickets(ids);

      // (B) 새로운 total 계산: 현재 tickets 길이를 기준으로 계산
      const newTotal = Math.max(0, tickets.length - ids.length);
      setTotalItems(newTotal);

      // (C) 페이지 보정: 현재 페이지가 비어있으면 마지막 페이지로 이동
      const lastPageAfterDelete = Math.max(
        1,
        Math.ceil(newTotal / pageSize) || 1
      );
      setPage((curPage) => Math.min(curPage, lastPageAfterDelete));

      // (D) 서버 연동이면 loadPage(resolvedPage)를 호출
      // 예: const resolvedPage = Math.min(page, lastPageAfterDelete); loadPage(resolvedPage);
    },
    [deleteTickets, pageSize, tickets]
  );

  // mount 시 기본 페이지는 1
  useEffect(() => {
    setPage(1);
  }, []);

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
          {/* UI 확인용 */}
          <button
            onClick={addSample}
            className="ml-10 px-3 py-1 border rounded"
          >
            샘플 추가
          </button>
        </div>

        <div className="mt-5 mb-15">
          <TicketBook
            tickets={currentPageTickets}
            onDeleteMany={handleDeleteMany}
          />
        </div>
        <div className="flex justify-center mb-12">
          <Pagination
            totalItems={totalItems}
            pageSize={pageSize}
            visiblePages={5}
            currentPage={page}
            onChange={(p) => loadPage(p)}
          />
        </div>
      </div>
    </div>
  );
}
