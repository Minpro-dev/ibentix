import api from "../api/axiosInstance";
import type { CreateEventCouponType } from "../pages/organizer/marketing/types/createEventCoupontype";

export const handleCreateEventCoupon = async (data: CreateEventCouponType) => {
  await api.post("/event-coupon", data);
};
