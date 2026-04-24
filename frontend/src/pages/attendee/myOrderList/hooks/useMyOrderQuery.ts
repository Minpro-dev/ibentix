import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../../../../services/orderService";

export const useMyOrdersQuery = (page: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders", "history", page],
    queryFn: () => getMyOrders(page),
  });

  return { data, isLoading };
};
