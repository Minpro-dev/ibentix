import { useQuery } from "@tanstack/react-query";
import { handleGetTrendingEvent } from "../../../../services/eventService";

export const useTrendingEvents = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: handleGetTrendingEvent,
  });

  return { data, isLoading };
};
