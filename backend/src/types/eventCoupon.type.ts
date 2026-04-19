export interface EventCouponType {
  userId: string;
  couponCode: string;
  eventId: string;
  validFrom: Date;
  validUntil: Date;
  discountAmount: string | number;
}

export interface GetAllEventCoupon {
  eventId?: string | undefined;
  search?: string | undefined;
  validFrom?: string | undefined;
  validUntil?: string | undefined;
  createdAt?: string | undefined;
  limit: number;
  page: number;
}
