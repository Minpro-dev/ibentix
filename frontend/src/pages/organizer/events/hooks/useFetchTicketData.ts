import { useQuery } from "@tanstack/react-query";
import { handleGetTicketByEvent } from "../../../../services/ticketService";
import type { Event } from "../../../../types/eventType";

export const useFetchTicketData = (
  event: Event,
  isOpen: boolean,
  page: number,
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["tickets", event?.eventId, page],
    queryFn: () => handleGetTicketByEvent(event?.eventId, page),
    enabled: !!event && isOpen,
  });

  return { data, isLoading };
};
