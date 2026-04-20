import { useQuery } from "@tanstack/react-query";
import { handleGetDashboardStats } from "../../../../services/statisticsService";

export const useFetchDashboardStats = (range: string) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard-stats", range],
    queryFn: () => handleGetDashboardStats(range),
    placeholderData: (previousData) => previousData,
  });

  return {
    stats: data,
    isLoading,
    isError,
    refetch,
  };
};
