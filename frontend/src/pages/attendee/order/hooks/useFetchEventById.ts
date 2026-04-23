import { useQuery } from "@tanstack/react-query";
import { handleGetEventById } from "../../../../services/eventService";

export const useFetchEventById = (eventId: string) => {
  const { data: eventData, isLoading: eventLoading } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => handleGetEventById(eventId as string),
  });

  return { eventData, eventLoading };
};
