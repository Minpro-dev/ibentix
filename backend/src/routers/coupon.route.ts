import { Router } from "express";
import { couponController } from "../controllers/coupon.controller";
import { validate } from "../middleware/validation.middleware";
import {
  createEventCouponSchema,
  getAllEventCouponsSchema,
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

// FIXME - consider to add userId
route.get(
  "/:eventCouponId",
  authentication,
  authorization("ATTENDEE"),
  validate(getCouponDetailsSchema),
  couponController.getCouponDetails,
);

route.get(
  "/user/:userId",
  validate(getAllEventCouponsSchema),
  couponController.getAllCoupons,
);

export default route;
