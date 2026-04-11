import { PaymentStatus } from "../../generated/prisma/enums";
import { prisma } from "../config/prismaClient.config";
import { handlePrismaError } from "../utils/prismaErrorHandler";

export const paymentService = {
  updateOrderStatus: async (
    userId: string,
    orderId: string,
    orderStatus: string,
  ) => {
    const status = orderId.toUpperCase();

    try {
      const orderDetails = await prisma.order.findUnique({
        where: {
          orderId,
        },
      });

      //   PaymentStatus :

      //   WAITING_FOR_PAYMENT
      //   WAITING_FOR_ADMIN_CONFIRMATION
      //   DONE
      //   REJECTED
      //   EXPIRED
      //   CANCELED

      // - waiting confirmation
      if (status === "WAITING_FOR_ADMIN_CONFIRMATION") {
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
