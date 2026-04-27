import { useMutation } from "@tanstack/react-query";
import { forgotPasswordService } from "../../../services/authService";
import { toast } from "sonner";

export const useRequestResetPassword = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (email: string) => forgotPasswordService(email),
    onSuccess: () => {
      toast.success("Reset link sent to your email!");
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);
    },
  });

  return { mutate, isPending, isSuccess };
};
