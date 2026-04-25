import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axiosInstance";

export const useResendOtpQuery = () => {
  return useQuery({
    queryKey: ["resend-otp"],
    queryFn: async () => {
      const response = await api.get(`/auth/resend-otp`);
      return response.data;
    },

    enabled: false,
    retry: false,
    staleTime: 0,
  });
};
