import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { orderSerivice } from "../services/order.service";

export const orderController = {
  createOrder: catchAsync(async (req: Request, res: Response) => {
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
  }),

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
};
