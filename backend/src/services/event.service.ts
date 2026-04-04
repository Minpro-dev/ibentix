import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 1. CREATE EVENT
export const createEventService = async (data: any, organizerId: string) => {
  const slug = data.title.toLowerCase().replace(/ /g, '-') + '-' + Date.now();

  return await prisma.event.create({
    data: {
      organizer_id: organizerId,
      category_id: data.category_id,
      title: data.title,
      slug: slug,
      description: data.description,
      available_slot: Number(data.available_slot),
      thumbnail_url: data.thumbnail_url,
      location_name: data.location_name,
      address: data.address,
      city: data.city,
      event_date: new Date(data.event_date),
      start_selling_date: new Date(data.start_selling_date),
      end_selling_date: new Date(data.end_selling_date),
      isFree: data.isFree === true || data.isFree === 'true',
      price: data.price ? Number(data.price) : 0,
      coupon_id: data.coupon_id || null,
    }
  });
};

// 2. GET ALL EVENTS (Untuk Attendee)
export const getAllEventsService = async () => {
  return await prisma.event.findMany({
    where: { deleted_at: null }, // Hanya ambil yang belum dihapus (Soft Delete)
    orderBy: { event_date: 'asc' },
    include: {
      // Jika punya model Category/User, bisa di-include di sini

    }
  });
};

// 3. GET EVENT DETAIL
export const getEventDetailService = async (eventId: string) => {
  return await prisma.event.findUnique({
    where: { id: eventId },
  });
};

// 4. GET EVENTS BY ORGANIZER
export const getEventsByOrganizerService = async (organizerId: string) => {
  return await prisma.event.findMany({
    where: { 
      organizer_id: organizerId,
      deleted_at: null 
    },
    orderBy: { created_at: 'desc' }
  });
};

// 5. UPDATE EVENT
export const updateEventService = async (eventId: string, data: any, organizerId: string) => {
  const existingEvent = await prisma.event.findFirst({
    where: { id: eventId, organizer_id: organizerId }
  });

  if (!existingEvent) {
    throw new Error("Event not found or you don't have permission");
  }

  return await prisma.event.update({
    where: { id: eventId },
    data: {
      ...data,
      available_slot: data.available_slot ? Number(data.available_slot) : undefined,
      price: data.price ? Number(data.price) : undefined,
      event_date: data.event_date ? new Date(data.event_date) : undefined,
    }
  });
};