import { Router } from "express";
import { authentication, authorization } from "../middleware/auth.middleware";
import { reviewController } from "../controllers/review.controller";
import { validate } from "../middleware/validation.middleware";
import { reviewSchema } from "../schemas/review.schema";

const route = Router();

// create review
route.post(
  "/",
  validate(reviewSchema),
  authentication,
  authorization("ATTENDEE"),
  reviewController.createReview,
);

// get review by orderId
route.get("/:orderId", reviewController.getReviewDetails);

// get all reviews by eventId
route.get(
  "/event/:eventId",
  authentication,
  reviewController.getAllReviewsByEventId,
);

// get all reviews by userId
route.get(
  "/",
  authentication,
  authorization("ORGANIZER", "ATTENDEE"),
  reviewController.getAllReviesData,
);

export default route;
