import { Router } from "express";
import { couponController } from "../controllers/coupon.controller";
import { validate } from "../middleware/validation.middleware";
import { createEventCouponSchema } from "../schemas/coupon.schema";
import { authentication, authorization } from "../middleware/auth.middleware";

const route = Router();

// FIXME - add authentication & authorization middleware
route.post(
  "/",
  authentication,
  authorization("ORGANIZER"),
  validate(createEventCouponSchema),
  couponController.createEventCoupon,
);

export default route;
