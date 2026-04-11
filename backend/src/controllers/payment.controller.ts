import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { paymentService } from "../services/payment.service";

export const paymentController = {
  // UPDATE ORDER/PAYMENT STATUS
  updateOrderStatus: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const { orderId, orderStatus } = req.body;

    const updatedOrderDetails = await paymentService.updateOrderStatus(
      userId,
      orderId,
      orderStatus,
    );

    res.status(201).json({
      status: "success",
      message: "Update order/payment status successfull",
      data: updatedOrderDetails,
    });
  }),
};
