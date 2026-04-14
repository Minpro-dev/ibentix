import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { authentication, authorization } from "../middleware/auth.middleware";
import { createOrderSchema } from "../schemas/order.schema";
import { validate } from "../middleware/validation.middleware";

const route = Router();

// create order
route.post(
  "/",
  validate(createOrderSchema),
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

// get product details
route.get(
  "/details/:orderId",
  authentication,
  authorization("ORGANIZER", "ATTENDEE"),
  orderController.getOrderDetails,
);

export default route;
