import { useQuery } from "@tanstack/react-query";
import { getReferralCoupons } from "../../../../services/promoService";

export const useFetchReferralCoupon = () => {
  const { data: referralCouponData, isLoading: referralCouponLoading } =
    useQuery({
      queryKey: ["promo", "referral"],
      queryFn: getReferralCoupons,
    });

  return { referralCouponData, referralCouponLoading };
};
