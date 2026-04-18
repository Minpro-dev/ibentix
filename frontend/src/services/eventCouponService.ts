import api from "../api/axiosInstance";
import type { CreateEventCouponType } from "../pages/organizer/marketing/types/createEventCouponTypes";

// import type { CreateEventCouponType } from "../pages/organizer/marketsing/types/createEventCouponType";

export const handleCreateEventCoupon = async (data: CreateEventCouponType) => {
  await api.post("/event-coupon", data);
};

export const handleGetEventCoupon = async (search?: string, page?: number) => {
  try {
    return await api.get("/event-coupon", {
      params: {
        search,
        page,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
