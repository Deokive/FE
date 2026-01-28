import axiosInstance from "@/apis/axios";
import type { CreateEventRequest, EventResponse } from "@/types/calendar";

export const postCalendar = async (archiveId: number, data: CreateEventRequest): Promise<EventResponse> => {
  const response = await axiosInstance.post(`/api/v1/events/${archiveId}`, data);
  return response.data;
}