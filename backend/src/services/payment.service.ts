import { PaymentStatus, Role } from "../../generated/prisma/enums";
import { prisma } from "../config/prismaClient.config";
import { AppError } from "../utils/AppError";
import { uploadSingle } from "../utils/cloudinaryUploader";
import { handlePrismaError } from "../utils/prismaErrorHandler";

export const paymentService = {
  updateOrderStatus: async (
    userId: string,
    userRole: Role,
    orderId: string,
    paymentStatus: string,
  ) => {
    try {
      const status = paymentStatus.toUpperCase();
      const isValidPaymentStatus = Object.values(PaymentStatus).includes(
        status as PaymentStatus,
      );

      console.log("is valid --> ", isValidPaymentStatus);

      if (!isValidPaymentStatus) {
        throw new AppError(400, "Invalid payment status");
      }

      const orderDetails = await prisma.order.findUnique({
        where: {
          // attendee can update during upload
          userId: userRole === "ATTENDEE" ? userId : undefined,
          event: {
            // organizer can update thru dashboard
            userId: userRole === "ORGANIZER" ? userId : undefined,
          },
          orderId,
        },
      });

      if (!orderDetails) {
        throw new AppError(404, "Order is not found");
      }

      // FIXME --> only certain status can be changed by certain role (only handling done ATM)

      // - waiting confirmation
      if (status === "DONE") {
        // only organizer can confirmed the payment
        if (userRole !== "ORGANIZER") {
          throw new AppError(401, "Unauthorized access");
        }

        await prisma.payment.update({
          where: {
            paymentId: orderDetails!.paymentId,
          },
          data: {
            paymentStatus: status,
          },
        });
      } else {
        await prisma.payment.update({
          where: {
            paymentId: orderDetails!.paymentId,
          },
          data: {
            paymentStatus: status as PaymentStatus,
            paymentAt:
              status === "WAITING_FOR_ADMIN_CONFIRMATION" ? new Date() : null,
          },
        });
      }

      const updatedOrderDetails = await prisma.order.findUnique({
        where: {
          orderId,
        },
        include: {
          tickets: true,
          payment: true,
        },
      });

      return updatedOrderDetails;
    } catch (error) {
      handlePrismaError(error);
    }
  },

  // UPLOAD PAYMENT PROOF
  uploadPaymentProof: async (
    userId: string,
    userRole: Role,
    orderId: string,
    file: Express.Multer.File | undefined,
  ) => {
    try {
      const orderDetails = await prisma.order.findUnique({
        where: {
          orderId,
          userId,
        },
      });

      if (!orderDetails) {
        throw new AppError(404, "Order is not found");
      }

      if (!file) {
        throw new AppError(400, "Payment proof is not received");
      }

      const url = await uploadSingle(file, "payment-proof");

      await prisma.payment.update({
        where: {
          paymentId: orderDetails.paymentId,
        },
        data: {
          paymentProof: url,
          paymentAt: new Date(),
        },
      });

      const updatedorder = await paymentService.updateOrderStatus(
        userId,
        userRole,
        orderId,
        "WAITING_FOR_ADMIN_CONFIRMATION",
      );

      return updatedorder;
    } catch (error) {
      handlePrismaError(error);
    }
  },
};
