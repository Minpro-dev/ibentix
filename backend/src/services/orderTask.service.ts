import { prisma } from "../config/prismaClient.config";

export const handleAutoCancelOrders = async () => {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  // 1. Cari Payment yang macet di konfirmasi admin > 3 hari
  const expiredPayments = await prisma.payment.findMany({
    where: {
      paymentStatus: "WAITING_FOR_ADMIN_CONFIRMATION",
      updatedAt: { lt: threeDaysAgo },
    },
    include: {
      order: true, // Ambil data order untuk kembalikan slot
    },
  });

  if (expiredPayments.length === 0) return 0;

  // 2. Eksekusi Pembatalan dalam Transaction
  await prisma.$transaction(async (tx) => {
    for (const payment of expiredPayments) {
      if (!payment.order) continue;

      // Update status Payment ke CANCELED
      await tx.payment.update({
        where: { paymentId: payment.paymentId },
        data: { paymentStatus: "CANCELED" },
      });

      // Kembalikan slot event
      await tx.event.update({
        where: { eventId: payment.order.eventId },
        data: {
          availableSlot: { increment: payment.order.ticketQuantity },
        },
      });

      // return used points
      if (payment.order.pointsUsed) {
        await tx.point.updateMany({
          where: {
            orderId: payment.order.orderId,
          },
          data: {
            orderId: null,
          },
        });
      }

      // return used referral coupon
      if (payment.order.referralCouponId) {
        await tx.referralCoupon.update({
          where: {
            referralCouponId: payment.order.referralCouponId,
          },
          data: {
            usedAt: null,
          },
        });
      }

      // return used event coupon
      if (payment.order.eventCouponId) {
        await tx.order.update({
          where: {
            orderId: payment.order.orderId,
          },
          data: {
            eventCouponId: null,
          },
        });
      }

      console.log(
        `[AUTO-CANCEL] Order ${payment.order.invoiceNumber} cancelled.`,
      );
    }
  });

  return expiredPayments.length;
};
