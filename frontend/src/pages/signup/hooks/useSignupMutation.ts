import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import api from "../../../api/axiosInstance";

export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: any) => {
      const response = await api.post("/auth/signup", values);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully!", {
        description: "Wee've sent a verification code to your email.",
      });

      setTimeout(() => {
        navigate("/verify-email", {
          replace: true,
        });
      }, 1500);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "registration failed";

      toast.error(message.toLowerCase(), {
        description: "please check your details and try again.",
      });
    },
  });
};
