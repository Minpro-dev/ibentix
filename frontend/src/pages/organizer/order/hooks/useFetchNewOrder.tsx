import { useQuery } from "@tanstack/react-query";
import { handleGetAllOrderByStatus } from "../../../../services/OrderService";

export const useFetchNewOrder = (
  orderStatus: string[],
  newest: string = "true",
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => handleGetAllOrderByStatus(orderStatus, newest),
  });

  return { data, isLoading };
};
