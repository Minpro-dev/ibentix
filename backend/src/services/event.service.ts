import { prisma } from "../config/prismaClient.config";

// Create Event
// GET EVENT
// Test Event

// 1. CREATE EVENT
export const createEventService = async (data: any, organizerId: string) => {
  const slug = data.title.toLowerCase().replace(/ /g, '-') + '-' + Date.now();

  return await prisma.event.create({
    data: {
      organizerId,
      userId: data.user,
      title: data.title,
      slug: slug,
      description: data.description,
      availableSlot: Number(data.available_slot),
      thumbnailUrl: data.thumbnail_url,
      locationName: data.location_name,
      address: data.address,
      city: data.city,
      eventDate: new Date(data.event_date),
      startSellingDate: new Date(data.start_selling_date),
      endSellingDate: new Date(data.end_selling_date),
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
    category_id,
    date,
    isFree,
    page = 1,
    limit = 10,
    sort = 'event_date',
  } = query;

  const skip = (Number(page) - 1) * Number(limit);

  // base where
  let whereClause: any = {
    deleted_at: null,
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
  if (category_id) {
    whereClause.category_id = category_id;
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
      whereClause.event_date = {
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
      category: true,
      organizer: true,
    },
  });
};

// // 3. GET EVENT DETAIL
// export const getEventDetailService = async (eventId: string) => {
//   return await prisma.event.findUnique({
//     where: {
//   id: eventId,
//   deleted_at: null
// }});
// };

// // 4. EVENT DETAIL (Slug-based)
// export const getEventBySlugService = async (slug: string) => {
//   return await prisma.event.findFirst({
//     where: {
//       slug,
//       deleted_at: null
//     },
//     include: {
//       category: true,
//       organizer: true,
//     }
//   });
// };

// // 5. GET EVENTS BY ORGANIZER
// export const getEventsByOrganizerService = async (organizerId: string) => {
//   return await prisma.event.findMany({
//     where: {
//       organizer_id: organizerId,
//       deleted_at: null
//     },
//     orderBy: { created_at: 'desc' }
//   });
// };

// // 6. TRENDING EVENT
// export const getTrendingEventsService = async () => {
//   return await prisma.event.findMany({
//     where: {
//       deleted_at: null,
//       event_date: {
//         gte: new Date()
//       }
//     },
//     orderBy: {
//       available_slot: 'asc' // makin sedikit makin trend
//     },
//     take: 5
//   });
// };

// // 7. UPDATE EVENT
// export const updateEventService = async (eventId: string, data: any, organizerId: string) => {
//   const existingEvent = await prisma.event.findFirst({
//     where: { id: eventId, organizer_id: organizerId }
//   });
// const parseDate = (value: any) => {
//   const date = new Date(value);
//   return isNaN(date.getTime()) ? null : date;
// };
//   if (!existingEvent) {
//     throw new Error("Event not found or you don't have permission");
//   }

//   return await prisma.event.update({
//     where: { id: eventId },
//     data: {
//   title: data.title,
//   description: data.description,
//   category_id: data.category_id,
//   available_slot: data.available_slot ? Number(data.available_slot) : undefined,
//   price: data.price ? Number(data.price) : undefined,
//   event_date: data.event_date ? new Date(data.event_date) : undefined,
// }
//   });
// };

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
