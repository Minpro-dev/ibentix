import { Router } from "express";
import { authentication, authorization } from "../middleware/auth.middleware";
import { paymentController } from "../controllers/payment.controller";

const route = Router();

// update orderStatus
route.patch(
  "/status",
  authentication,
  authorization("ORGANIZER", "ATTENDEE"),
  paymentController.updateOrderStatus,
);

export default route;
