import api from "../api/axiosInstance";
import type { OrderListResponse } from "../pages/attendee/myOrderList/types/myOrderType";
import type { createOrderPayloadType } from "../pages/attendee/order/types/createOrderPayloadType";
import type { GetTicketResponse } from "../pages/attendee/ticket/types.ts/getTicketResponseType";

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

// get all order (attendee)
export const getMyOrders = async (page: number): Promise<OrderListResponse> => {
  const res = await api.get("/order", {
    params: {
      page,
      newest: "true",
    },
  });

  return res.data;
};

// get order details by Id
export const getOrderDetails = async (orderId: string) => {
  const res = await api.get(`/order/details/${orderId}`);
  return res.data.data;
};

// get all order for tickets data
export const getMyTickets = async (
  page: number,
): Promise<GetTicketResponse> => {
  const res = await api.get("/order", {
    params: { orderStatus: "DONE", page, newest: "true" },
  });
  return res.data;
};
