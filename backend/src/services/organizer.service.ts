import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. GET PROFILE
export const getOrganizerProfileService = async (userId: string) => {
  return await prisma.organizer_profile.findFirst({
    where: { user_id: userId },
  });
};

// 2. UPDATE PROFILE
export const updateOrganizerProfileService = async (
  userId: string,
  data: any
) => {
  return await prisma.organizer_profile.update({
    where: { user_id: userId },
    data,
  });
};


// 3. GET ORDERS (FILTERABLE)
export const getOrdersService = async (organizerId: string, query: any) => {
  const { event_id, status } = query;

  return await prisma.order.findMany({
    where: {
      organizer_profile_id: organizerId,
      ...(event_id && { event_id }),
      ...(status && { status }),
    },
    include: {
      user: true,
      event: true,
      payment: true,
    },
    orderBy: { created_at: 'desc' },
  });
};

// 5. UPDATE ORDER STATUS
export const updateOrderStatusService = async (
  orderId: string,
  status: string
) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

// 6. GET ATTENDEES
export const getAttendeesService = async (eventId: string) => {
  return await prisma.ticket.findMany({
    where: {
      event_id: eventId,
      deleted_at: null,
    },
    select: {
      attendee_name: true,
      attendee_email: true,
      ticket_code: true,
    },
  });
};

// 7. CREATE COUPON by ORGANIZER
export const createCouponService = async (
  eventId: string,
  data: any
) => {
  return await prisma.event_coupons.create({
    data: {
      event_id: eventId,
      coupon_code: data.coupon_code,
      discount_amount: Number(data.discount_amount),
      valid_from: new Date(data.valid_from),
      valid_until: new Date(data.valid_until),
    },
  });
};

// 8. GET COUPONS by ORGANIZER
export const getCouponsService = async (eventId: string) => {
  return await prisma.event_coupons.findMany({
    where: {
      event_id: eventId,
      deleted_at: null,
    },
  });
};

// 9. DASHBOARD
export const getDashboardService = async (organizerId: string) => {
  const totalEvents = await prisma.event.count({
    where: { organizer_id: organizerId },
  });

  const totalOrders = await prisma.order.count({
    where: { organizer_profile_id: organizerId },
  });

  const revenue = await prisma.order.aggregate({
    _sum: { total_amount: true },
    where: { organizer_profile_id: organizerId },
  });

  return {
    totalEvents,
    totalOrders,
    totalRevenue: revenue._sum.total_amount || 0,
  };
};