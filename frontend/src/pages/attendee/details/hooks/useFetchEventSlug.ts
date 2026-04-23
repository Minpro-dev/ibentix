import { useQuery } from "@tanstack/react-query";
import { handleGetEventBySlug } from "../../../../services/eventService";

export const useFetchEventSlug = (slug: string | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["event-details", slug],
    queryFn: () => handleGetEventBySlug(slug as string),
    enabled: !!slug,
  });

  return { data, isLoading, isError };
};
