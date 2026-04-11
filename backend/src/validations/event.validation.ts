import { string, z } from 'zod';

// ======================
// CREATE EVENT
// ======================
export const createEventSchema = z.object({
  title: z.string().min(3, 'Title minimal 3 karakter'),

  description: z.string().optional(),

  category_id: z.string().min(1, 'category_id is required'),

  available_slot: z.coerce
    .number()
    .min(1, 'available_slot minimal 1'),

  price: z.coerce
    .number()
    .min(0, 'price tidak boleh negatif'),

  city: z.string().min(2, 'city wajib diisi'),

  location_name: z.string().optional(),
  address: z.string().optional(),
});


// ======================
// UPDATE EVENT
// ======================
export const updateEventSchema = createEventSchema.partial();


// ======================
// QUERY FILTER (GET ALL EVENTS)
// ======================
export const getEventsQuerySchema = z.object({
  search: z.string().optional(),

  city: z.string().optional(),


  date: z
    .enum(['today', 'this_week', 'next_week', 'this_month'])
    .optional(),

  isFree: z.string().optional(), // tetap string karena query

  page: z.coerce.number().default(1),

  limit: z.coerce.number().default(10),

  sort: z
    .enum(['event_date', 'price', 'created_at'])
    .default('event_date'),
});