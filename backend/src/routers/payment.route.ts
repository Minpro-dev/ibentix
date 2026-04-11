import { Router } from "express";
import { authentication, authorization } from "../middleware/auth.middleware";
import { paymentController } from "../controllers/payment.controller";
import { upload } from "../config/multer.config";

const route = Router();

// update orderStatus
route.patch(
  "/status",
  authentication,
  authorization("ORGANIZER", "ATTENDEE"),
  paymentController.updateOrderStatus,
);

route.patch(
  "/upload-proof",
  authentication,
  authorization("ATTENDEE"),
  upload.single("payment"),
  paymentController.uploadPaymentProof,
);

export default route;
