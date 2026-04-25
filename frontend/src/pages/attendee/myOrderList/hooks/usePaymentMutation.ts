import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { uploadPaymentProof } from "../../../../services/paymentService";

export const useUploadPayment = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadPaymentProof(orderId, file),
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Payment proof uploaded. Waiting for admin confirmation.",
        icon: "success",
        customClass: { popup: "rounded-3xl" },
        confirmButtonColor: "#4f46e5",
      });

      queryClient.invalidateQueries({
        queryKey: ["order", "details", orderId],
      });

      queryClient.invalidateQueries({ queryKey: ["orders", "history"] });
    },
    onError: (error: any) => {
      Swal.fire({
        title: "Upload Failed",
        text: error.response?.data?.message || "Make sure file is under 2MB",
        icon: "error",
        customClass: { popup: "rounded-3xl" },
      });
    },
  });
};
