import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { orderSerivice } from "../services/order.service";

export const orderController = {
  createOrder: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const {
      eventId,
      pointsUsed,
      eventCouponId,
      appCouponId,
      referralCouponId,
      tickets,
    } = req.body;

    const orderData = await orderSerivice.createOrder({
      userId,
      eventId,
      pointsUsed,
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
};
