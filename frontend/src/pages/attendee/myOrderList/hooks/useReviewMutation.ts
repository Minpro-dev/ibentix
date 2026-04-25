import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { postReview } from "../../../../services/reviewService";

export const useReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => postReview(payload),
    onSuccess: () => {
      Swal.fire({
        title: "Review Submitted!",
        text: "Thank you for your feedback.",
        icon: "success",
        confirmButtonColor: "#4f46e5",
        customClass: { popup: "rounded-3xl" },
      });
      // Refresh data order biar tombol review hilang/berubah
      queryClient.invalidateQueries({ queryKey: ["order", "details"] });
      queryClient.invalidateQueries({ queryKey: ["current-review"] });
    },
    onError: (error: any) => {
      Swal.fire({
        title: "Failed",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
        customClass: { popup: "rounded-3xl" },
      });
    },
  });
};
