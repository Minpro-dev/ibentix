import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../config/prismaClient.config";
import { EventCouponType, GetAllEventCoupon } from "../types/coupon.type";
import { AppError } from "../utils/AppError";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import { EventCouponWhereInput } from "../../generated/prisma/models";

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

  getAllCoupons: (data: GetAllEventCoupon) => {
    const where: EventCouponWhereInput = {
      deletedAt: null,
    };

    if (data.eventId) {
      where.eventId = data.eventId;
    }

    if (data.validFrom && data.validUntil) {
      where.AND = [
        { validFrom: { gte: startOfDay(data.validFrom) } },
        { validUntil: { lte: endOfDay(data.validUntil) } },
      ];
    }

    if (data.validFrom) {
      where.validFrom = { gte: startOfDay(data.validFrom) };
    }

    if (data.validUntil) {
      where.validUntil = { lte: endOfDay(data.validUntil) };
    }

    if (data.createdAt) {
      where.AND = [
        { createdAt: { gte: startOfDay(data.createdAt) } },
        { createdAt: { lte: endOfDay(data.createdAt) } },
      ];
    }

    const coupons = prisma.eventCoupon.findMany({ where });

    return coupons;
  },
};
