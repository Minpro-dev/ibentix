import { Router } from "express";
import { appCouponController } from "../controllers/appCoupon.controller";

const route = Router();

route.post("/", appCouponController.createAppCoupon);

export default route;
