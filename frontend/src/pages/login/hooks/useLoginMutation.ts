import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../../../store/useAuthStore";
import type { LoginFormType } from "../types/loginTypes";
import { handleSubmitLogin } from "../../../services/authService";
import { capitalize } from "../../../utils/capitalize";
import api from "../../../api/axiosInstance";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (values: LoginFormType) => handleSubmitLogin(values),
    onSuccess: async (res) => {
      const token = res?.accessToken;
      const userResponse = res?.user;
      console.log("res", res);

      const user = {
        id: userResponse?.userId,
        firstName: userResponse?.firstName,
        lastName: userResponse?.lastName,
        email: userResponse?.email,
        phone: userResponse?.phone,
        gender: userResponse?.gender,
        address: userResponse?.address,
        countryId: userResponse?.countryId,
        isVerified: userResponse?.isVerified,
        role: userResponse?.role,
        avatar: userResponse?.avatar,
        createdAt: userResponse?.createdAt,
      };

      if (!userResponse?.isVerified) {
        navigate("/verify-email", { replace: true });
        return;
      }

      // save to zustand
      setAuth(token, user);

      toast.success(
        "Welcome back, " + capitalize(user.firstName.toLowerCase()),
      );

      // Redirect logic
      const targetPath = user.role === "ATTENDEE" ? "/" : "/organizer";
      navigate(targetPath, { replace: true });
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      toast.error(errorMessage);
    },
  });
};
