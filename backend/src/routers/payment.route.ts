import { Router } from "express";
import { authentication } from "../middleware/auth.middleware";
import { paymentController } from "../controllers/payment.controller";

const route = Router();

// update orderStatus
route.patch("/status", authentication, paymentController.updateOrderStatus);

export default route;
