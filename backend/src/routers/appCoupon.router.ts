import { Router } from "express";
import { appCouponController } from "../controllers/appCoupon.controller";
import { validate } from "../middleware/validation.middleware";
import { createAppCouponShema } from "../schemas/appCoupon.schema";

const route = Router();

route.post(
  "/",
  validate(createAppCouponShema),
  appCouponController.createAppCoupon,
);

export default route;
