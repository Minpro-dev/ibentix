import { useQuery } from "@tanstack/react-query";
import { getEventCoupons } from "../../../../services/promoService";

export const useFetchEventCoupon = (eventId: string) => {
  const { data: eventCouponData, isLoading: eventCouponLoading } = useQuery({
    queryKey: ["eventCoupons", eventId],
    queryFn: () => getEventCoupons(eventId!),
  });

  return { eventCouponData, eventCouponLoading };
};
