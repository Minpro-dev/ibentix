import { AppCouponType } from "../types/appCoupon.type";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import { prisma } from "../config/prismaClient.config";
import { startOfDay } from "date-fns";

export const appCouponService = {
  // CREATE
  createAppCoupon: async (data: AppCouponType) => {
    try {
      const coupon = await prisma.appCoupon.create({
        data: {
          ...data,
          validFrom: startOfDay(data.validFrom),
          validUntil: startOfDay(data.validUntil),
        },
      });

      return coupon;
    } catch (error) {
      handlePrismaError(error);
    }
  },

  // GET ALL
  getAllCoupon: async () => {
    const appCoupons = await prisma.appCoupon.findMany({
      where: { deletedAt: null },
    });

    return appCoupons;
  },

  // DELETE
  deleteCoupon: async (appCouponId: string) => {
    try {
      await prisma.appCoupon.update({
        where: { appCouponId },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  },

  changeCouponStatus: async (appCouponId: string) => {
    try {
      const updatedAppCoupon = await prisma.$transaction(async (tx) => {
        const couponTarget = await tx.appCoupon.findUnique({
          where: { appCouponId },
        });

        if (!couponTarget?.isActive) {
          await tx.appCoupon.update({
            where: { appCouponId },
            data: { isActive: true },
          });
        } else {
          await tx.appCoupon.update({
            where: { appCouponId },
            data: { isActive: false },
          });
        }
      });

      return updatedAppCoupon;
    } catch (error) {
      handlePrismaError(error);
    }
  },
};
