import { useQuery } from "@tanstack/react-query";
import { getAppCoupons } from "../../../../services/promoService";

export const useFetchAppCoupon = () => {
  const { data: appCouponData, isLoading: appCouponLoading } = useQuery({
    queryKey: ["appCoupons"],
    queryFn: getAppCoupons,
  });

  return { appCouponData, appCouponLoading };
};
