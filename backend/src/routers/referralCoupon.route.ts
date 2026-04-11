import { Router } from "express";
import { referralCouponController } from "../controllers/referralCoupon.controller";
import { authentication, authorization } from "../middleware/auth.middleware";

const route = Router();

route.get(
  "/",
  authentication,
  authorization("ATTENDEE"),
  referralCouponController.getReferralCouponDetails,
);

export default route;
