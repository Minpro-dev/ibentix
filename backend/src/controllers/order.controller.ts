import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { orderSerivice } from "../services/order.service";
import { Role } from "../../generated/prisma/enums";
import { CreateOrerSchema } from "../schemas/order.schema";

export const orderController = {
  createOrder: catchAsync(
    async (req: Request<{}, {}, CreateOrerSchema>, res: Response) => {
      const userId = req.user?.userId;
      const {
        eventId,
        isPointsUsed,
        eventCouponId,
        appCouponId,
        referralCouponId,
        tickets,
      } = req.body;

      const orderData = await orderSerivice.createOrder({
        userId,
        eventId,
        isPointsUsed,
        eventCouponId,
        appCouponId,
        referralCouponId,
        tickets,
      });

      res.status(201).json({
        status: "success",
        message: "Order successfully created",
        data: orderData,
      });
    },
  ),

  // ------ GET ALL ORDER WITH FILTER
  getAllOrders: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const limit = Number(req.query.limit) || 15;
    const page = Number(req.query.page) || 1;
    const { orders, totalData, totalPage } = await orderSerivice.getAllOrders({
      ...req.query,
      limit,
      page,
      userId,
    });

    res.status(200).json({
      status: "success",
      message: "Get all order data successfull",
      totalData,
      totalPage,
      data: orders,
    });
  }),

  // GET ORDER DETAILS (BY ORDER ID)
  getOrderDetails: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const userRole = req.user?.role as Role;
    const orderId = req.params.orderId as string;

    const orderDetails = await orderSerivice.getOrderDetails(
      userId,
      userRole,
      orderId,
    );

    res.status(200).json({
      status: "success",
      message: "Get order details successfull",
      data: orderDetails,
    });
  }),
};
