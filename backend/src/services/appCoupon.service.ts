import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppCouponType } from "../types/appCoupon.type";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import { prisma } from "../config/prismaClient.config";
import { startOfDay } from "date-fns";

export const appCouponService = {
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
};
