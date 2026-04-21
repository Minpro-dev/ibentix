import { Router } from "express";
import { authentication, authorization } from "../middleware/auth.middleware";
import * as StatisticsController from "../controllers/statistics.controller";

const route = Router();

route.get(
  "/",
  authentication,
  authorization("ORGANIZER"),
  StatisticsController.getDashboardStats,
);

export default route;
