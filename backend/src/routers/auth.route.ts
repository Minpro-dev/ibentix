import { Router } from "express";
import { authController } from "../controllers/auth.controller";

import { upload } from "../config/multer.config";

const route = Router();

route.post("/signup", upload.single("avatar"), authController.signup);

export default route;
