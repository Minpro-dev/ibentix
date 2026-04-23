import api from "../api/axiosInstance";
import type { createOrderPayloadType } from "../pages/attendee/order/types/createOrderPayloadType";

// get all order by status
export const handleGetAllOrderByStatus = async (
  orderStatus: string[],
  newest: string,
  page: number,
) => {
  const status = orderStatus.join(",");

  return await api.get("/order", {
    params: {
      orderStatus: status,
      newest,
      page,
    },
  });
};

// handle change status
export const handleChangeSatatus = async (
  orderId: string,
  paymentStatus: string,
) => {
  await api.patch("/payment/status", {
    orderId,
    paymentStatus,
  });
};

// create order
export const handleCreateOrder = async (payload: createOrderPayloadType) => {
  return await api.post("/order", payload);
};
