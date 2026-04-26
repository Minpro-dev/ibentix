import { addHours, endOfDay, startOfDay, subDays } from "date-fns";
import { prisma } from "../config/prismaClient.config";
import { AppError } from "../utils/AppError";
import {
  generateInvoiceNumber,
  generateTicketCode,
} from "../utils/generateRandom";
import {
  OrderOrderByWithRelationInput,
  OrderWhereInput,
} from "../../generated/prisma/models";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import { PaymentStatus, Role } from "../../generated/prisma/enums";

export const orderService = {
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
        data: {
          paymentStatus: !Number(unitPrice) ? "DONE" : "WAITING_FOR_PAYMENT",
        },
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

  // GET ALL ORDER DATA
  getAllOrders: async ({
    userId,
    limit,
    page,
    search,
    eventId,
    orderDate,
    orderStatus,
    lastOneWeek,
    lastOneMonth,
    newest,
    oldest,
    userRole,
  }: any) => {
    //filter & search params :
    // - limit
    // - page
    // - search (orderId)
    // - by eventId
    // - orderDate
    // - orderStatus
    // - last 1 week
    // - last 30 days
    // - sort by newest
    // - sort by oldest

    //pagination
    const offset = (page - 1) * limit;

    const where: OrderWhereInput = {
      userId: userRole === "ATTENDEE" ? userId : undefined,
      event: userRole === "ORGANIZER" ? { userId } : {},
    };

    const orderBy: OrderOrderByWithRelationInput = {};

    // search by invoiceNumber ✅
    if (search) {
      where.invoiceNumber = { contains: search, mode: "insensitive" };
    }

    // by eventId ✅
    if (eventId) {
      where.eventId = eventId;
    }

    // by orderDate ✅
    if (orderDate) {
      where.createdAt = {
        lte: endOfDay(orderDate),
        gte: startOfDay(orderDate),
      };
    } else if (lastOneWeek === "true") {
      const startDay = endOfDay(new Date());
      const endDay = startOfDay(subDays(startDay, 6));
      where.expiresAt = {
        lte: startDay,
        gte: endDay,
      };
    } else if (lastOneMonth === true) {
      const startDay = endOfDay(new Date());
      const endDay = startOfDay(subDays(startDay, 29));
      where.expiresAt = {
        lte: startDay,
        gte: endDay,
      };
    }

    // by orderStatus ✅
    if (orderStatus) {
      const status = orderStatus.split(",");

      where.payment = {
        paymentStatus: {
          in: status,
        },
      };
      // const status = orderStatus.toUpperCase();
      // where.payment = { paymentStatus: status };
    }

    // Sort by filter ✅
    if (newest === "true") {
      orderBy.createdAt = "desc";
    } else if (oldest === "true") {
      orderBy.createdAt = "asc";
    }

    const orders = await prisma.order.findMany({
      skip: offset,
      take: limit,
      where,
      orderBy,
      include: {
        tickets: true,
        payment: true,
        event: true,
      },
    });

    const totalData = await prisma.order.count({
      where,
      orderBy,
    });

    const totalPage = Math.ceil(totalData / limit);
    return { orders, totalData, totalPage };
  },

  //. GET ORDER DETAILS (BY ORDER ID)
  getOrderDetails: async (userId: string, userRole: Role, orderId: string) => {
    try {
      const orderDetails = await prisma.order.findUnique({
        where: {
          userId: userRole === "ATTENDEE" ? userId : undefined,
          orderId,
          event: { userId: userRole === "ORGANIZER" ? userId : undefined },
        },
        include: {
          tickets: true,
          payment: true,
          event: true,
        },
      });

      if (!orderDetails) {
        throw new AppError(400, "Invalid params:orderId");
      }

      return orderDetails;
    } catch (error) {
      handlePrismaError(error);
    }
  },
};
