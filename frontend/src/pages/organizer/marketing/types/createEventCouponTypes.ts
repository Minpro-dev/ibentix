export interface CreateEventCouponType {
  eventId: string;
  couponCode: string;
  discountAmount: number;
  validFrom: string;
  validUntil: string;
}
