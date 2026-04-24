import api from "../api/axiosInstance";
import type { PaymentStatus } from "../pages/attendee/myOrderList/types/myOrderType";

export const updatePaymentStatus = async (
  orderId: string,
  paymentStatus: PaymentStatus,
) => {
  await api.patch("/payment/status", {
    orderId,
    paymentStatus,
  });
};

export const uploadPaymentProof = async (orderId: string, file: File) => {
  const formData = new FormData();
  formData.append("orderId", orderId);
  formData.append("payment", file);

  const res = await api.patch("/payment/upload-proof", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
