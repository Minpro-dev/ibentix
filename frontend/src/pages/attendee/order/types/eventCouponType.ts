export interface eventCouponType {
  eventCouponId: string;
  couponCode: string;
  eventId: string;
  userId: string;
  validFrom: string;
  validUntil: string;
  discountAmount: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
