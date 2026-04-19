import { Router } from "express";
import { authentication, authorization } from "../middleware/auth.middleware";
import { paymentController } from "../controllers/payment.controller";
import { upload } from "../config/multer.config";
import { validate } from "../middleware/validation.middleware";
import { updatePaymentStatusSchema } from "../schemas/payment.schema";

const route = Router();

// update orderStatus
route.patch(
  "/status",
  validate(updatePaymentStatusSchema),
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
