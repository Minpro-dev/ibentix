import { addHours } from "date-fns";
import { prisma } from "../config/prismaClient.config";
import { AppError } from "../utils/AppError";
import {
  generateInvoiceNumber,
  generateTicketCode,
} from "../utils/generateRandom";

export const orderSerivice = {
  // ---> $transactions ---> create payment✅ ---> create ticket✅ --> update points✅, update refferalCoupon✅ --> create order✅ --> update event_slot✅ :v

  createOrder: async ({
    userId,
    eventId,
    isPointsUsed,
    eventCouponId,
    appCouponId,
    referralCouponId,
    tickets,
  }: any) => {
    console.log("user id --> ", userId);
    // CHECK EVENT IN DB
    const event = await prisma.event.findUnique({ where: { eventId } });

    if (!event) {
      throw new AppError(404, "Event is not found");
    }

    const unitPrice = event?.price;
    const invoiceNumber = generateInvoiceNumber();
    const ticketQuantity = tickets.length;
    const subtotal = ticketQuantity * Number(unitPrice);
    const expiresAt = addHours(new Date(), 2);

    let points = 0;
    let eventCouponAmount: number = 0;
    let appCouponAmount: number = 0;
    let referralCouponAmount: number = 0;

    if (isPointsUsed) {
      const userPoints = await prisma.point.aggregate({
        where: {
          userId,
          orderId: null,
        },
        _sum: {
          pointAmount: true,
        },
      });

      points = userPoints._sum.pointAmount || 0;
    }
    if (eventCouponId) {
      // EVENT COUPON
      const eventCoupon = await prisma.eventCoupon.findUnique({
        where: { eventCouponId },
      });

      if (!eventCoupon) {
        eventCouponAmount = 0;
      } else {
        eventCouponAmount = Number(eventCoupon?.discountAmount);
      }
    }

    // APP COUPON
    if (appCouponId) {
      const appCoupon = await prisma.appCoupon.findUnique({
        where: { appCouponId },
      });

      if (!appCoupon) {
        appCouponAmount = 0;
      } else {
        appCouponAmount = Number(appCoupon?.discountAmount);
      }
    }

    // APP REFERRAL
    if (referralCouponId) {
      const referralCoupon = await prisma.referralCoupon.findUnique({
        where: { referralCouponId, usedAt: null },
      });

      if (!referralCoupon) {
        referralCouponAmount = 0;
      } else {
        referralCouponAmount = Number(referralCoupon!.discountAmount);
      }
    }

    const rawDiscounts = [
      eventCouponAmount,
      appCouponAmount,
      referralCouponAmount,
    ];

    const appliedDiscounts = rawDiscounts.filter(
      (discount) => !!discount && discount > 0,
    );

    // TOTAL AMMOUNT AFTER DSC
    const totalAmount = appliedDiscounts.reduce((prev, dsc) => {
      return prev - (prev * dsc) / 100;
    }, subtotal);

    const totalDiscount = subtotal - totalAmount;
    const finalTotalAmount = totalAmount - points;

    const createdTickets: any = [];

    // ------------------- TRANSACTIONS -------------
    const orderData: any = await prisma.$transaction(async (tx) => {
      // CREATE PAYMENT
      const payment = await tx.payment.create({
        data: {},
      });

      //ORDER TRANSACTIONS
      const order = await tx.order.create({
        data: {
          invoiceNumber,
          userId,
          eventId,
          ticketQuantity,
          unitPrice,
          subtotal,
          discountAmount: totalDiscount,
          pointsUsed: points,
          totalAmount: finalTotalAmount,
          eventCouponId: eventCouponId ? eventCouponId : null,
          appCouponId: appCouponId ? appCouponId : null,
          referralCouponId: referralCouponId ? referralCouponId : null,
          paymentId: payment.paymentId,
          expiresAt,
        },
        include: {
          event: true,
          payment: true,
        },
      });

      // GENERATE TICKET CODE
      for (const ticket of tickets) {
        let ticketCode = "";
        let isUnique = false;

        while (!isUnique) {
          ticketCode = generateTicketCode();
          const isExisting = await tx.ticket.findUnique({
            where: { ticketCode },
          });

          if (!isExisting) {
            isUnique = true;
          }
        }

        // CREATE TICKETS
        const generatedTicket = await tx.ticket.create({
          data: {
            ticketCode,
            orderId: order.orderId,
            userId,
            attendeeName: ticket.attendeeName,
            attendeeEmail: ticket.attendeeEmail,
          },
        });

        createdTickets.push(generatedTicket);

        //---------- UPDATE EVENT SLOT
        // availableSeat

        await tx.event.update({
          where: {
            eventId,
          },
          data: {
            availableSlot: { decrement: 1 },
          },
        });
      }
      // --> end ticket loop

      //---------- UPDATE USED PROMO
      // pointsUsed - done,
      // referralCoupon - done,
      if (points) {
        await tx.point.updateMany({
          where: { userId },
          data: {
            orderId: order.orderId,
          },
        });
      }

      if (referralCouponId) {
        await tx.referralCoupon.update({
          where: { referralCouponId },
          data: {
            usedAt: new Date(),
          },
        });
      }

      return {
        ...order,
        tickets: createdTickets,
      };
    });

    return orderData;
  },
};
