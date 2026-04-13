import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { paymentService } from "../services/payment.service";
import { Role } from "../../generated/prisma/enums";
import { UpdatePaymentStatusSchema } from "../schemas/payment.schema";

export const paymentController = {
  // UPDATE ORDER/PAYMENT STATUS
  updateOrderStatus: catchAsync(
    async (req: Request<{}, {}, UpdatePaymentStatusSchema>, res: Response) => {
      const userId = req.user?.userId as string;
      const userRole = req.user?.role as Role;
      const { orderId, paymentStatus } = req.body;

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
    },
  ),

  // UPLOAD PAYMENT PROOF
  uploadPaymentProof: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const userRole = req.user?.role as Role;
    const orderId = req.body.orderId;
    const file = req.file;

    const orderDetails = await paymentService.uploadPaymentProof(
      userId,
      userRole,
      orderId,
      file,
    );
    res.status(201).json({
      status: "success",
      message: "Upload payment proof successfull",
      data: orderDetails,
    });
  }),
};
