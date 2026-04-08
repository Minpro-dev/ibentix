export interface AppCouponType {
  couponCode: string;
  totalCouponAvailable: number;
  validFrom: Date;
  validUntil: Date;
  discountAmount: number;
}
