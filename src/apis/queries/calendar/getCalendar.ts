import axiosInstance from "@/apis/axios";
import type { EventResponse } from "@/types/calendar";

export const getMonthlyEvents = async (archiveId: number, year: number, month: number): Promise<EventResponse[]> => {
  const response = await axiosInstance.get(`/api/v1/events/monthly/${archiveId}`, {
    params: {
      year,
      month,
    },
  });
  return response.data;
};