import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { paymentService } from "../services/payment.service";
import { Role } from "../../generated/prisma/enums";
import { UpdatePaymentStatusSchema } from "../schemas/payment.schema";
import { emailService } from "../services/email.service";
import { Ticket } from "../../generated/prisma/browser";
import { AppError } from "../utils/AppError";

export const paymentController = {
  // UPDATE ORDER/PAYMENT STATUS
  updateOrderStatus: catchAsync(
    async (req: Request<{}, {}, UpdatePaymentStatusSchema>, res: Response) => {
      const userId = req.user?.userId as string;
      const userRole = req.user?.role as Role;
      const { orderId, paymentStatus } = req.body;

      const order = await paymentService.updateOrderStatus(
        userId,
        userRole,
        orderId,
        paymentStatus,
      );

      if (paymentStatus === "DONE" && order) {
        await emailService.sendPaymentDoneConfirmation(
          order?.email as string,
          order?.updatedOrderDetails?.tickets as Ticket[],
        );
      }

      if (paymentStatus === "REJECTED" && order) {
        await emailService.sendPaymentRejectedConfirmation(
          order.updatedOrderDetails?.orderId as string,
          order.email as string,
        );
      }

      res.status(201).json({
        status: "success",
        message: "Update order/payment status successfull",
        data: order,
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
