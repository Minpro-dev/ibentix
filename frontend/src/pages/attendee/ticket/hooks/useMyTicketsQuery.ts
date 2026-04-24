import { useQuery } from "@tanstack/react-query";
import { getMyTickets } from "../../../../services/orderService";

export const useMyTicketsQuery = (page: number) => {
  return useQuery({
    queryKey: ["orders", "tickets", "done", page],
    queryFn: () => getMyTickets(page),
  });
};
