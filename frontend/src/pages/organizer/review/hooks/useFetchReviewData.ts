import { useQuery } from "@tanstack/react-query";
import { handleGetReviewData } from "../../../../services/reviewService";

export const useFetchReviewData = (page: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["reviews", page],
    queryFn: () => handleGetReviewData(page),
  });

  return { data, isLoading };
};
