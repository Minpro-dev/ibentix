import { Router } from "express";
import { pointController } from "../controllers/point.controller";
import { authentication, authorization } from "../middleware/auth.middleware";

const route = Router();

// get all points of certain user
route.get(
  "/",
  authentication,
  authorization("ATTENDEE"),
  pointController.getAllUserPoints,
);

export default route;
