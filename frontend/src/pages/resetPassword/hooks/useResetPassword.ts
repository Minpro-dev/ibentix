import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPasswordService } from "../../../services/authService";

export const useResetPassword = (token: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newPassword: string) =>
      resetPasswordService(token, newPassword),
    onSuccess: () => {
      toast.success("Password updated successfully!");
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Failed to reset password";
      toast.error(msg);
    },
  });
};
