import { useQuery } from "@tanstack/react-query";
import { handleGetAllCountries } from "../../../services/authService";

export const useFetchCountries = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: handleGetAllCountries,
  });

  return { data, isLoading };
};
