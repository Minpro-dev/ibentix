import { useQuery } from "@tanstack/react-query";
import { handleGetAllOrderByStatus } from "../../../../services/orderService";

export const useFetchNewOrder = (
  orderStatus: string[],
  newest: string,
  page: number,
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => handleGetAllOrderByStatus(orderStatus, newest, page),
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  return { data, isLoading };
};
