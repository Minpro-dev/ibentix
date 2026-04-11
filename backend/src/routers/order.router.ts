import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { authentication, authorization } from "../middleware/auth.middleware";

const route = Router();

// create order
route.post(
  "/",
  authentication,
  authorization("ATTENDEE"),
  orderController.createOrder,
);

// get all order
route.get(
  "/",
  authentication,
  authorization("ORGANIZER"),
  orderController.getAllOrders,
);

export default route;
