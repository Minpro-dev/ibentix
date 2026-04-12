import { prisma } from "../config/prismaClient.config";

// Create Event
// GET EVENT
// Test Event

// 1. CREATE EVENT
export const createEventService = async (data: any, userId: string) => {
  const slug = data.title.toLowerCase().replace(/ /g, '-') + '-' + Date.now();

  return await prisma.event.create({
    data: {
      organizerId: data.organizerId,
      userId,
      title: data.title,
      slug: slug,
      description: data.description,
      availableSlot: Number(data.availableSlot),
      thumbnailUrl: data.thumbnailUrl,
      locationName: data.locationName,
      address: data.address,
      city: data.city,
      eventDate: new Date(data.eventDate),
      startSellingDate: new Date(data.startSellingDate),
      endSellingDate: new Date(data.endSellingDate),
      isFree: data.isFree === true || data.isFree === 'true',
      price: data.price ? Number(data.price) : 0,
    }
  });
};

// 2. GET ALL EVENTS (Untuk Attendee)
export const getAllEventsService = async (query: any) => {
  const {
    search,
    city,
    categoryId,
    date,
    isFree,
    page = 1,
    limit = 10,
    sort = 'eventDate',
  } = query;

  const skip = (Number(page) - 1) * Number(limit);

  // base where
  let whereClause: any = {
    deletedAt: null,
  };

  // SEARCH
  if (search) {
    whereClause.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  // CITY
  if (city) {
    whereClause.city = {
      equals: city,
      mode: 'insensitive',
    };
  }

  // CATEGORY
  if (categoryId) {
    whereClause.categoryId = categoryId;
  }

  // FREE / PAID
  if (isFree !== undefined) {
    whereClause.isFree = String(isFree) === 'true';
  }

  // DATE FILTER
  if (date) {
    const now = new Date();
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    switch (date) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        endDate = new Date(now.setHours(23, 59, 59, 999));
        break;

      case 'this_week': {
        const firstDay = new Date();
        firstDay.setDate(now.getDate() - now.getDay());
        const lastDay = new Date(firstDay);
        lastDay.setDate(firstDay.getDate() + 6);

        startDate = new Date(firstDay.setHours(0, 0, 0, 0));
        endDate = new Date(lastDay.setHours(23, 59, 59, 999));
        break;
      }

      case 'next_week': {
        const nextWeekStart = new Date();
        nextWeekStart.setDate(now.getDate() + (7 - now.getDay()));

        const nextWeekEnd = new Date(nextWeekStart);
        nextWeekEnd.setDate(nextWeekStart.getDate() + 6);

        startDate = new Date(nextWeekStart.setHours(0, 0, 0, 0));
        endDate = new Date(nextWeekEnd.setHours(23, 59, 59, 999));
        break;
      }

      case 'this_month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
    }

    if (startDate && endDate) {
      whereClause.eventDate = {
        gte: startDate,
        lte: endDate,
      };
    }
  }

  // FINAL QUERY
  return await prisma.event.findMany({
    where: whereClause,
    orderBy: {
      [sort]: 'asc',
    },
    skip,
    take: Number(limit),
    include: {
      organizer: true,
    },
  });
};

// 3. GET EVENT DETAIL
export const getEventDetailService = async (eventId: string) => {
  return await prisma.event.findUnique({
    where: {
  eventId,
  deletedAt: null
}});
};

// 4. EVENT DETAIL (Slug-based)
export const getEventBySlugService = async (slug: string) => {
  return await prisma.event.findFirst({
    where: {
      slug,
      deletedAt: null
    },
    include: {
      // category: true,
      organizer: true,
    }
  });
};

// 5. GET EVENTS BY ORGANIZER
export const getEventsByOrganizerService = async (organizerId: string) => {
  return await prisma.event.findMany({
    where: {
      organizerId: organizerId,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  });
};

// 6. TRENDING EVENT
export const getTrendingEventsService = async () => {
  return await prisma.event.findMany({
    where: {
      deletedAt: null,
      eventDate: {
        gte: new Date()
      }
    },
    orderBy: {
      availableSlot: 'asc' // makin sedikit makin trend
    },
    take: 5
  });
};

// 7. UPDATE EVENT
// export const updateEventService = async (eventId: string, data: any, organizerId: string) => {
//   const existingEvent = await prisma.event.findFirst({
//     where: { eventId: eventId, organizerId: organizerId }
//   });
// const parseDate = (value: any) => {
//   const date = new Date(value);
//   return isNaN(date.getTime()) ? null : date;
// };
//   if (!existingEvent) {
//     throw new Error("Event not found or you don't have permission");
//   }

//   return await prisma.event.update({
//     where: {eventId},
//     data: {
//   title: data.title,
//   description: data.description,
//   // categoryId: data.categoryId,
//   availableSlot: data.availableSlot ? Number(data.availableSlot) : undefined,
//   price: data.price ? Number(data.price) : undefined,
//   eventDdate: data.eventDate ? new Date(data.eventDate) : undefined,
// }
//   });
// };
export const updateEventService = async (
  eventId: string,
  data: any,
  userId: string
) => {
  const existingEvent = await prisma.event.findFirst({
    where: { eventId, userId }
  });

  const parseDate = (value: any) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  };

  if (!existingEvent) {
    throw new Error("Event not found or you don't have permission");
  }

  return await prisma.event.update({
    where: { eventId },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.description && { description: data.description }),
      ...(data.availableSlot && { availableSlot: Number(data.availableSlot) }),
      ...(data.price && { price: Number(data.price) }),
      ...(data.eventDate && { eventDate: parseDate(data.eventDate) }),
      ...(data.thumbnailUrl && { thumbnailUrl: data.thumbnailUrl }),
    }
  });
};

// // 7. DELETE EVENT
// export const deleteEventService = async (eventId: string, organizerId: string) => {
//   const existingEvent = await prisma.event.findFirst({
//     where: {
//       id: eventId,
//       organizer_id: organizerId,
//       deleted_at: null,
//     },
//   });

//   if (!existingEvent) {
//     throw new Error("Event not found or you don't have permission");
//   }

//   return await prisma.event.update({
//     where: { id: eventId },
//     data: {
//       deleted_at: new Date(),
//     },
//   });
// };
