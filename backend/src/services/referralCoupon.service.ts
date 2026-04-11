import { prisma } from "../config/prismaClient.config";

export const referralCouponService = {
  getReferralCouponDetails: async (userId: string) => {
    const referralCouponDetails = await prisma.referralCoupon.findUnique({
      where: {
        userId,
        usedAt: null,
      },
    });

    return referralCouponDetails ? referralCouponDetails : null;
  },
};
