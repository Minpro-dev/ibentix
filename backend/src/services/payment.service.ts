import { PaymentStatus, Role } from "../../generated/prisma/enums";
import { prisma } from "../config/prismaClient.config";
import { AppError } from "../utils/AppError";
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
            paymentAt: new Date(),
          },
        });
      } else {
        await prisma.payment.update({
          where: {
            paymentId: orderDetails!.paymentId,
          },
          data: {
            paymentStatus: status as PaymentStatus,
            paymentAt: null,
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
};

//   PaymentStatus :

//   WAITING_FOR_PAYMENT
//   WAITING_FOR_ADMIN_CONFIRMATION
//   DONE
//   REJECTED
//   EXPIRED
//   CANCELED
