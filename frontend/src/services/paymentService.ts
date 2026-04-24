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
