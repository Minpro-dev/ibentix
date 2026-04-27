import { Response, Router } from "express";
import { authController } from "../controllers/auth.controller";
import { upload } from "../config/multer.config";
import { authentication, authorization } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import {
  editUserSchema,
  insertReferralSchemas,
  loginSchema,
  signupSchema,
  updatePasswordSchema,
} from "../schemas/auth.schema";

const route = Router();

route.post("/signup", validate(signupSchema), authController.signup);
route.post("/login", validate(loginSchema), authController.login);
route.post("/logout", authentication, authController.logout);
route.get("/refresh", authController.refresh);
route.post("/verify-otp", authController.verifyOtp);
route.get("/resend-otp", authController.resendOtp);
route.post("/forgot-password", authController.resetPasswordRequest);

route.patch(
  "/forgot-password/:token",
  validate(updatePasswordSchema),
  authController.createNewPassword,
);

route.get("/details", authentication, authController.getUserDetails);

route.patch(
  "/update-details",
  authentication,
  upload.single("avatar"),
  validate(editUserSchema),
  authController.editUserDetails,
);

route.post(
  "/referral",
  validate(insertReferralSchemas),
  authController.addReferral,
);

export default route;
