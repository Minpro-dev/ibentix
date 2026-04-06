import { Router } from "express";
import { couponController } from "../controllers/coupon.controller";
import { validate } from "../middleware/validation.middleware";
import {
  createEventCouponSchema,
  getCouponDetailsSchema,
} from "../schemas/coupon.schema";
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

route.get(
  "/:eventCouponId",
  validate(getCouponDetailsSchema),
  couponController.getCouponDetails,
);

export default route;
