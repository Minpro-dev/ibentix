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

route.post(
  "/",
  authentication,
  authorization("ORGANIZER"),
  validate(createEventCouponSchema),
  couponController.createEventCoupon,
);

route.put(
  "/",
  authentication,
  authorization("ORGANIZER"),
  validate(createEventCouponSchema),
  couponController.editCoupon,
);

route.get(
  "/details/:eventCouponId",
  authentication,
  authorization("ORGANIZER"),
  validate(getCouponDetailsSchema),
  couponController.getCouponDetails,
);

route.get(
  "/",
  authentication,
  authorization("ORGANIZER"),
  validate(getAllEventCouponsSchema),
  couponController.getAllCoupons,
);

route.delete(
  "/",
  authentication,
  authorization("ORGANIZER"),
  validate(getAllEventCouponsSchema),
  couponController.deleteCoupon,
);

export default route;
