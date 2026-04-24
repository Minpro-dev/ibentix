export interface appCouponType {
  appCouponId: string;
  couponCode: string;
  totalCouponAvailable: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  discountAmount: string;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
