export interface referralCouponType {
  referralCouponId: string;
  couponCode: string;
  referralCodeBy: string;
  userId: string;
  validFrom: string;
  validUntil: string;
  discountAmount: string;
  usedAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
