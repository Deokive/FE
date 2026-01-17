import axiosInstance from "@/apis/axios";
import type { DeleteTicketRequest, DeleteTicketResponse } from "@/types/ticket";

export const deleteTicket = async (
  data: DeleteTicketRequest
): Promise<DeleteTicketResponse> => {
  const { ticketid } = data;
  const response = await axiosInstance.delete<DeleteTicketResponse>(
    `/api/v1/tickets/${ticketid}`
  );
  return response.data;
};
