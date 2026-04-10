import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { authentication } from "../middleware/auth.middleware";

const route = Router();

route.post("/", authentication, orderController.createOrder);

export default route;
