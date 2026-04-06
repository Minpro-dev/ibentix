import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../config/prismaClient.config";
import { EventCouponType } from "../types/coupon.type";
import { AppError } from "../utils/AppError";
import { handlePrismaError } from "../utils/prismaErrorHandler";

export const couponService = {
  createEventCoupon: async (data: EventCouponType) => {
    try {
      const onGoingCoupon = await prisma.eventCoupon.findFirst({
        where: {
          eventId: data.eventId,
          validUntil: {
            gte: endOfDay(new Date()),
          },
        },
      });

      if (onGoingCoupon) {
        throw new AppError(403, "You already have one active coupon");
      }

      const eventCoupon = await prisma.eventCoupon.create({
        data: {
          ...data,
          validFrom: startOfDay(data.validFrom),
          validUntil: endOfDay(data.validUntil),
        },
      });

      return eventCoupon;
    } catch (error) {
      handlePrismaError(error);
    }
  },

  getCouponDetails: async (eventCouponId: string) => {
    const eventCouponDetails = await prisma.eventCoupon.findUnique({
      where: {
        eventCouponId,
        deletedAt: null,
      },
    });

    if (!eventCouponDetails) {
      throw new AppError(404, "Event coupon is not found");
    }

    return eventCouponDetails;
  },
};
