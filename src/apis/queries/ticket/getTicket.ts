import axiosInstance from "@/apis/axios";
import type {
  GetTicketBookRequest,
  GetTicketBookResponse,
  GetTicketRequest,
  GetTicketResponse,
} from "@/types/ticket";

export const getTicket = async (
  data: GetTicketRequest
): Promise<GetTicketResponse> => {
  const { ticketid } = data;
  const response = await axiosInstance.get<GetTicketResponse>(
    `/api/v1/tickets/${ticketid}`
  );
  return response.data;
};

export const getTicketBook = async (
  data: GetTicketBookRequest
): Promise<GetTicketBookResponse> => {
  const { archiveId, page, size, sort, direction } = data;
  const response = await axiosInstance.get<GetTicketBookResponse>(
    `/api/v1/tickets/book/${archiveId}`,
    {
      params: { page, size, sort, direction },
    }
  );
  return response.data;
};
