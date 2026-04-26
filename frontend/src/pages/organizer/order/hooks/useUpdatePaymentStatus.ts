import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { handleChangeSatatus } from "../../../../services/OrderService";

export const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      orderId,
      paymentStatus,
    }: {
      orderId: string;
      paymentStatus: string;
    }) => handleChangeSatatus(orderId, paymentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order is confirmed");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      toast.error(errorMessage);
    },
  });

  return { mutateAsync, isPending };
};
