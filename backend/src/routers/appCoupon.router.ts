import { Router } from "express";
import { appCouponController } from "../controllers/appCoupon.controller";
import { validate } from "../middleware/validation.middleware";
import {
  createAppCouponShema,
  deleteAppCouponSchema,
} from "../schemas/appCoupon.schema";

const route = Router();

route.post(
  "/",
  validate(createAppCouponShema),
  appCouponController.createAppCoupon,
);

route.delete(
  "/",
  validate(deleteAppCouponSchema),
  appCouponController.deleteAppCoupon,
);

route.get("/", appCouponController.getAllAppCoupon);

route.patch("/", appCouponController.changeCouponStatus);

export default route;
