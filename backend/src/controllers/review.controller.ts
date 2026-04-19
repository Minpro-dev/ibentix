import { Request, Response } from "express";
import { reviewService } from "../services/review.service";
import { catchAsync } from "../utils/catchAsync";
import { ReviewSchema } from "../schemas/review.schema";

export const reviewController = {
  // CREATE REVIEW
  createReview: catchAsync(
    async (req: Request<{}, {}, ReviewSchema>, res: Response) => {
      const userId = req.user?.userId;
      const { orderId, eventId, rating, title, description, isAnonymous } =
        req.body;

      const createdReview = await reviewService.createReview({
        userId,
        orderId,
        eventId,
        rating,
        title,
        description,
        isAnonymous,
      });

      res.status(201).json({
        status: "success",
        message: "Create review successfull",
        data: createdReview,
      });
    },
  ),

  // GET REVIEW DETAILS BY ORDER ID
  getReviewDetails: catchAsync(async (req: Request, res: Response) => {
    const orderId = req.params.orderId as string;

    const reviewDetails = await reviewService.getReviewDetails(orderId);

    res.status(200).json({
      status: "success",
      message: "Get review details successfull",
      data: reviewDetails,
    });
  }),

  // GET REVIEWS BY EVENT
  getAllReviewsByEventId: catchAsync(async (req: Request, res: Response) => {
    const eventId = req.params.eventId as string;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { reviews, totalData, totalPage } =
      await reviewService.getAllReviewsByEventId(eventId, page, limit);

    res.status(200).json({
      status: "success",
      message: "Get all reviews details successfull",
      data: { totalData, totalPage, reviews },
    });
  }),

  // GET ALL REVIEWS DATA
  getAllReviesData: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { averageRatings, totalData, totalPage, reviews } =
      await reviewService.getAllReviewsData(userId, page, limit);

    res.status(200).json({
      status: "success",
      message: "Get all reviews successfull",
      data: { averageRatings, totalData, totalPage, reviews },
    });
  }),
};
