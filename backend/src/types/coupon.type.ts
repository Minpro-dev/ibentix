export interface EventCouponType {
  couponCode: string;
  eventId: string;
  validFrom: Date;
  validUntil: Date;
  discountAmount: number;
}
