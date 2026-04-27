import { useQuery } from "@tanstack/react-query";
import { getUserPoints } from "../../../../services/promoService";

export const useFetchUserPoints = (isLoggin: boolean) => {
  const { data: pointsData, isLoading: pointsDataLoading } = useQuery({
    queryKey: ["userPoints"],
    queryFn: getUserPoints,
    enabled: isLoggin,
  });

  return { pointsData, pointsDataLoading };
};
