import { useQuery } from "@tanstack/react-query";
import { getUserPoints } from "../../../../services/promoService";

export const useFetchUserPoints = () => {
  const { data: pointsData, isLoading: pointsDataLoading } = useQuery({
    queryKey: ["userPoints"],
    queryFn: getUserPoints,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 403) return false;
      return failureCount < 3; //
    },
  });

  return { pointsData, pointsDataLoading };
};
