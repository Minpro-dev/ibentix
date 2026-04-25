import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../../../../api/axiosInstance";
import { useAuthStore } from "../../../../store/useAuthStore";

export const useLogoutMutation = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      clearAuth();
      toast.success("Logged out successfully", {
        description: "See you soon at ibentix!",
      });

      queryClient.clear();

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "failed to logout";
      toast.error(message.toLowerCase());
    },
  });
};
