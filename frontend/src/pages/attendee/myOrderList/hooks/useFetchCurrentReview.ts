import { useQuery } from "@tanstack/react-query";
import { getCurrentReview } from "../../../../services/reviewService";

export const useFetchCurrentReview = (orderId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["current-review"],
    queryFn: () => getCurrentReview(orderId),
  });

  return { data, isLoading };
};
