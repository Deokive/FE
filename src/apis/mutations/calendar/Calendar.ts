import axiosInstance from "@/apis/axios";
import type { CreateEventRequest, EventResponse, UpdateEventRequest } from "@/types/calendar";

export const PostCalendar = async (archiveId: number, data: CreateEventRequest): Promise<EventResponse> => {
  const response = await axiosInstance.post(`/api/v1/events/${archiveId}`, data);
  return response.data;
}

export const PatchCalendar = async (eventId: number, data: UpdateEventRequest): Promise<EventResponse> => {
  const response = await axiosInstance.patch(`/api/v1/events/${eventId}`, data);
  return response.data;
}

export const DeleteCalendar = async (eventId: number): Promise<void> => {
  await axiosInstance.delete(`/api/v1/events/${eventId}`);
}


