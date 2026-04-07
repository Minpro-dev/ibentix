import { Request, Response, Router } from "express";
import { authController } from "../controllers/auth.controller";
import { upload } from "../config/multer.config";
import { authentication, authorization } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import {
  editUserSchema,
  loginSchema,
  signupSchema,
  updatePasswordSchema,
} from "../schemas/auth.schema";

const route = Router();

route.post(
  "/signup",
  // upload.single("avatar"),
  validate(signupSchema),
  authController.signup,
);

route.post("/login", validate(loginSchema), authController.login);
route.get("/refresh", authController.refresh);
route.post("/verify-otp", authController.verifyOtp);
route.get("/resend-otp", authController.resendOtp);
route.post("/forgot-password", authController.resetPasswordRequest);
route.post(
  "/forgot-password/:token",
  validate(updatePasswordSchema),
  authController.createNewPassword,
);
route.patch(
  "/update-details",
  authentication,
  upload.single("avatar"),
  validate(editUserSchema),
  authController.editUserDetails,
);

export default route;
