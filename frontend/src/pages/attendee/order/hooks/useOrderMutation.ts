import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { createOrderPayloadType } from "../types/createOrderPayloadType";
import { handleCreateOrder } from "../../../../services/orderService";

export const useOrderMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: createOrderPayloadType) => handleCreateOrder(payload),

    onSuccess: (res) => {
      // SWAL Sukses
      Swal.fire({
        title: "Order Placed!",
        text: "Your order has been created successfully. Redirecting to payment...",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "rounded-3xl", // Menjaga konsistensi minimalist rounded
        },
      }).then(() => {
        const orderId = res.data?.data?.orderId;
        navigate(`/payment/${orderId}`);
      });
    },

    onError: (error: any) => {
      Swal.fire({
        title: "Order Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong, please try again.",
        icon: "error",
        confirmButtonColor: "#4f46e5", // Indigo-600
        customClass: {
          popup: "rounded-3xl",
        },
      });
    },
  });
};

// confitmation helper function
export const confirmOrder = (onConfirm: () => void) => {
  Swal.fire({
    title: "Confirm Order?",
    text: "Please make sure the attendee details are correct before proceeding.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, continue",
    cancelButtonText: "Check again",
    confirmButtonColor: "#4f46e5",
    reverseButtons: true,
    customClass: {
      popup: "rounded-3xl p-8",
      confirmButton: "rounded-xl px-6 py-3 font-semibold",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};
