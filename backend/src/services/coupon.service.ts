import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../config/prismaClient.config";
import { EventCouponType, GetAllEventCoupon } from "../types/eventCoupon.type";
import { AppError } from "../utils/AppError";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import { EventCouponWhereInput } from "../../generated/prisma/models";
import { includes } from "zod";

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

  // ----- GET COUPON DETAILS
  getCouponDetails: async (eventCouponId: string, userId: string) => {
    const eventCouponDetails = await prisma.eventCoupon.findUnique({
      where: {
        eventCouponId,
        deletedAt: null,
      },
    });

    if (!eventCouponDetails) {
      throw new AppError(404, "Event coupon is not found");
    }

    if (userId !== eventCouponDetails.userId) {
      throw new AppError(401, "Only owner can see the coupon details");
    }

    return eventCouponDetails;
  },

  // -------- GET ALL COUPONS
  getAllCoupons: (data: GetAllEventCoupon, userId: string) => {
    const where: EventCouponWhereInput = {
      userId,
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

    if (data.search) {
      where.OR = [
        { couponCode: { contains: data.search, mode: "insensitive" } },
      ];
    }

    const coupons = prisma.eventCoupon.findMany({ where });

    return coupons;
  },

  // -------- EDIT COUPON
  editCoupon: async ({
    userId,
    couponCode,
    eventId,
    validFrom,
    validUntil,
    discountAmount,
  }: EventCouponType) => {
    try {
      const coupon = await prisma.eventCoupon.findUnique({
        where: {
          eventId,
        },
      });

      if (!coupon) {
        throw new AppError(404, "No coupon match in database");
      }

      if (coupon.userId !== userId) {
        throw new AppError(401, "Only coupon owner can");
      }

      const newCoupon = await prisma.eventCoupon.update({
        where: { eventId },
        data: {
          userId,
          couponCode,
          eventId,
          validFrom,
          validUntil,
          discountAmount,
        },
      });

      return newCoupon;
    } catch (error) {
      handlePrismaError(error);
    }
  },

  deleteCoupon: async (userId: string, eventId: string) => {
    try {
      const coupon = await prisma.eventCoupon.findUnique({
        where: { eventId },
      });

      if (!coupon) {
        throw new AppError(404, "No coupon found");
      }

      if (coupon.userId !== userId) {
        throw new AppError(401, "Only owner can delete coupon");
      }

      await prisma.eventCoupon.update({
        where: { eventId },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  },
};
