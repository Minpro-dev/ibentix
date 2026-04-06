export interface EventCouponType {
  couponCode: string;
  eventId: string;
  validFrom: Date;
  validUntil: Date;
  discountAmount: number;
}

export interface GetAllEventCoupon {
  eventId?: string | undefined;
  search?: string | undefined;
  validFrom?: string | undefined;
  validUntil?: string | undefined;
  createdAt?: string | undefined;
}
