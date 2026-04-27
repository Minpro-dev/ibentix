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

      if (!isValidPaymentStatus) {
        throw new AppError(400, "Invalid payment status");
      }

      const updatedOrderStatus = await prisma.$transaction(async (tx) => {
        const orderDetails = await tx.order.findUnique({
          where: {
            // attendee can update during upload
            userId: userRole === "ATTENDEE" ? userId : undefined,
            event: {
              // organizer can update thru dashboard
              userId: userRole === "ORGANIZER" ? userId : undefined,
            },
            orderId,
          },
          include: {
            payment: true,
            tickets: true,
          },
        });

        if (!orderDetails) {
          throw new AppError(404, "Order is not found");
        }

        // get attendee details for emailing
        const user = await tx.user.findUnique({
          where: { userId: orderDetails.userId },
        });

        if (
          orderDetails.payment?.paymentStatus === "CANCELED" ||
          orderDetails.payment?.paymentStatus === "EXPIRED"
        ) {
          throw new AppError(403, "Final status cannot be modified");
        }

        if (status === "DONE") {
          // only organizer can confirmed the payment
          if (userRole !== "ORGANIZER") {
            throw new AppError(401, "Unauthorized access");
          }

          await tx.payment.update({
            where: {
              paymentId: orderDetails!.paymentId,
            },
            data: {
              paymentStatus: status,
            },
          });
        } else {
          await tx.payment.update({
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

        // RETURNING
        if (
          status === "CANCELED" ||
          status === "EXPIRED" ||
          status === "REJECTED"
        ) {
          // return used points
          if (orderDetails.pointsUsed) {
            await tx.point.updateMany({
              where: {
                orderId,
              },
              data: {
                orderId: null,
              },
            });
          }

          // return used referral coupon
          if (orderDetails.referralCouponId) {
            await tx.referralCoupon.update({
              where: {
                referralCouponId: orderDetails.referralCouponId,
              },
              data: {
                usedAt: null,
              },
            });
          }

          // return used event coupon
          if (orderDetails.eventCouponId) {
            await tx.order.update({
              where: {
                orderId,
              },
              data: {
                eventCouponId: null,
              },
            });
          }

          // return available seat
          const totalReturnedSeats = await tx.ticket.count({
            where: {
              orderId,
            },
          });

          await tx.event.update({
            where: {
              eventId: orderDetails.eventId,
            },
            data: {
              availableSlot: { increment: totalReturnedSeats },
            },
          });
        }

        const updatedOrderDetails = await tx.order.findUnique({
          where: {
            orderId,
          },
          include: {
            tickets: true,
            payment: true,
          },
        });

        return { updatedOrderDetails, email: user?.email };
      });

      return updatedOrderStatus;
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

      const MAX_FILE_SIZE = 2 * 1024 * 1024;

      if (file && Number(file.size) > MAX_FILE_SIZE) {
        throw new AppError(400, "File size too large. Maximum allowed is 2MB");
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
