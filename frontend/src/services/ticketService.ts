import api from "../api/axiosInstance";

export const handleGetTicketByEvent = async (eventId: string, page: number) => {
  return await api.get(`/events/event-attendees/${eventId}`, {
    params: {
      page,
    },
  });
};
