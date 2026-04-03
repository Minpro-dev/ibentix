import { Request, Response, Router } from "express";
import { authController } from "../controllers/auth.controller";

import { upload } from "../config/multer.config";
import { authentication, authorization } from "../middleware/auth.middleware";

const route = Router();

route.post("/signup", upload.single("avatar"), authController.signup);
route.post("/login", authController.login);
route.get("/refresh", authController.refresh);
route.post("/verify-otp", authController.verifyOtp);

route.get(
  "/event",
  authentication,
  authorization("ORGANIZER"),
  (req: Request, res: Response) => {
    res.status(200).json({
      status: "success",
      message: "get data successful",
    });
  },
);

export default route;
