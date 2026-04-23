import { useQuery } from "@tanstack/react-query";
import { getUserPoints } from "../../../../services/promoService";

export const useFetchUserPoints = () => {
  const { data: pointsData, isLoading: pointsDataLoading } = useQuery({
    queryKey: ["userPoints"],
    queryFn: getUserPoints,
  });

  return { pointsData, pointsDataLoading };
};
