import { addDays } from "date-fns";
import { prisma } from "../config/prismaClient.config";
import { AppError } from "../utils/AppError";
import { handlePrismaError } from "../utils/prismaErrorHandler";

export const reviewService = {
  createReview: async (data: any) => {
    try {
      const eventDetails = await prisma.event.findUnique({
        where: {
          eventId: data.eventId,
        },
      });

      const eventDate = eventDetails?.eventDate;

      if (new Date() <= addDays(eventDate!, 1)) {
        throw new AppError(
          403,
          "Review can be added only 1 day after the event",
        );
      }

      const createdReview = await prisma.review.create({
        data: {
          userId: data.userId,
          orderId: data.orderId,
          eventId: data.eventId,
          title: data.title,
          description: data.description,
          isAnonymous: data.isAnonymous,
          rating: data.rating,
        },
      });

      return createdReview;
    } catch (error) {
      handlePrismaError(error);
    }
  },

  getReviewDetails: async (orderId: string) => {
    const reviewDetails = await prisma.review.findUnique({
      where: { orderId },

      select: {
        reviewId: true,
        orderId: true,
        rating: true,
        title: true,
        description: true,
        isAnonymous: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    return reviewDetails;
  },

  // GET REVIEWS BY EVENT ID
  getAllReviewsByEventId: async (
    eventId: string,
    page: number,
    limit: number,
  ) => {
    const offset = (page - 1) * limit;

    const reviews = await prisma.review.findMany({
      where: {
        order: {
          eventId,
        },
      },
      take: limit,
      skip: offset,
    });

    const totalData = await prisma.review.count({
      where: {
        order: {
          eventId,
        },
      },
    });

    const totalPage = Math.ceil(totalData / limit);

    return { reviews, totalData, totalPage };
  },

  // GET ALL REVIEWS DATA
  getAllReviewsData: async (userId: string, page: number, limit: number) => {
    const offset = (page - 1) * limit;
    const reviews = await prisma.review.findMany({
      where: {
        order: {
          event: {
            userId,
          },
        },
      },

      select: {
        reviewId: true,
        orderId: true,
        rating: true,
        title: true,
        description: true,
        isAnonymous: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },

      take: limit,
      skip: offset,
    });

    const totalData = await prisma.review.count({
      where: {
        order: {
          event: {
            userId,
          },
        },
      },
    });

    const averageRatings = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
    });

    const totalPage = Math.ceil(totalData / limit);

    return {
      averageRatings: averageRatings._avg.rating,
      totalData,
      totalPage,
      reviews,
    };
  },
};
