import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { paymentService } from "../services/payment.service";
import { Role } from "../../generated/prisma/enums";

export const paymentController = {
  // UPDATE ORDER/PAYMENT STATUS
  updateOrderStatus: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const userRole = req.user?.role as Role;
    const { orderId, paymentStatus } = req.body;

    console.log("userId --> ", userId);
    console.log("body --> ", req.body);

    const updatedOrderDetails = await paymentService.updateOrderStatus(
      userId,
      userRole,
      orderId,
      paymentStatus,
    );

    res.status(201).json({
      status: "success",
      message: "Update order/payment status successfull",
      data: updatedOrderDetails,
    });
  }),
};
