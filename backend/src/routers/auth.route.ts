import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const route = Router();

route.get("/", authController.test);

export default route;
