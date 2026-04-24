import api from "../api/axiosInstance";

export const getAppCoupons = async () => {
  return await api.get("/app-coupon");
};

export const getEventCoupons = async (eventId: string) => {
  return await api.get(`/event-coupon/details/by-event/${eventId}`);
};

export const getUserPoints = async () => {
  return await api.get("/point");
};
