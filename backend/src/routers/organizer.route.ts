import { Router } from "express";
import { organizerController } from "../controllers/organizer.controller";
import { authentication, authorization } from "../middleware/auth.middleware";
import { upload } from "../config/multer.config";

const route = Router();

route.post(
  "/",
  authentication,
  authorization("ORGANIZER"),
  upload.single("image"),
  organizerController.createOrganizerProfile,
);

route.get(
  "/",
  authentication,
  authorization("ORGANIZER"),
  organizerController.getAllOrganizerProfiles,
);

route.delete(
  "/:id",
  authentication,
  authorization("ORGANIZER"),
  organizerController.deleteOrganizerProfile,
);

export default route;
