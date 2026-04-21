import api from "../api/axiosInstance";

// create order -> untuk dipanggil di payment
export const handleCreateOrder = async (data: any) => {
  const res = await api.post("/order", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

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
