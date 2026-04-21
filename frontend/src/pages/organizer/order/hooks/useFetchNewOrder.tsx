import { useQuery } from "@tanstack/react-query";
import { handleGetAllOrderByStatus } from "../../../../services/OrderService";

export const useFetchNewOrder = (
  orderStatus: string[],
  newest: string = "true",
  page: number,
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => handleGetAllOrderByStatus(orderStatus, newest, page),
  });

  return { data, isLoading };
};
