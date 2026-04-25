import { useQuery } from "@tanstack/react-query";
import type { EventCategory } from "../../../../types/eventType";
import { handleGetAllActiveEvents } from "../../../../services/eventService";

export const useEeventQuery = (
  searchValue: string,
  selectedCategory: EventCategory | null,
  isFree: string,
  page: number,
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["events", searchValue, selectedCategory, isFree, page],
    queryFn: () =>
      handleGetAllActiveEvents(searchValue, selectedCategory, isFree, page),
  });

  return { data, isLoading };
};
