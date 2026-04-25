import { useQuery } from "@tanstack/react-query";
import type { EventCategory } from "../../../../types/eventType";
import { handleGetAllActiveEvents } from "../../../../services/eventService";

export const useEeventQuery = (
  searchValue: string,
  selectedCategory: EventCategory | null,
  isFree: string,
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["events", searchValue, selectedCategory, isFree],
    queryFn: () =>
      handleGetAllActiveEvents(searchValue, selectedCategory, isFree),
  });

  return { data, isLoading };
};
