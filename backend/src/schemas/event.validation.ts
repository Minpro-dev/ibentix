import * as z from "zod";

// ======================
// CREATE EVENT
// ======================
export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title minimum 3 characters"),

    description: z.string().optional(),

    availableSlot: z.coerce.number().min(1, "availableSlot minimum 1"),

    price: z.coerce.number().min(0, "price cannot negatif"),

    city: z.string().min(2, "city is required"),

    locationName: z.string().optional(),
    address: z.string().optional(),
  }),
});

// ======================
// UPDATE EVENT - patch
// ======================
export const updateEventSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title minimum 3 characters"),

    description: z.string().optional(),

    availableSlot: z.coerce.number().min(1, "availableSlot minimum 1"),

    price: z.coerce.number().min(0, "price cannot negatif"),

    locationName: z.string().optional(),
    address: z.string().optional(),
  }),
});

// ======================
// QUERY FILTER (GET ALL EVENTS)
// ======================
export const getEventsQuerySchema = z.object({
  search: z.string().optional(),

  city: z.string().optional(),

  date: z.enum(["today", "this_week", "next_week", "this_month"]).optional(),

  isFree: z.string().optional(), // tetap string karena query

  page: z.coerce.number().default(1),

  limit: z.coerce.number().default(10),

  sort: z.enum(["eventDate", "price", "createdAt"]).default("eventDate"),
});

// UPDATE EVENT VALIDATION

// export const updateEventSchema = z.object({
//   body: z.object({
//     title: z
//       .string()
//       .min(3, "Title minimum 3 characters")
//       .optional(),

//     description: z.string().optional(),

//     categories: z
//       .array(z.string())
//       .min(1, "category is required")
//       .max(5, "Maximum category is 5")
//       .optional(),

//     availableSlot: z.coerce
//       .number()
//       .min(1, "availableSlot minimum 1")
//       .optional(),

//     price: z.coerce
//       .number()
//       .min(0, "price cannot negatif")
//       .optional(),

//     city: z.string().min(2, "city is required").optional(),

//     locationName: z.string().optional(),

//     address: z.string().optional(),

//     eventDate: z
//       .string()
//       .refine((val) => !isNaN(new Date(val).getTime()), {
//         message: "Invalid date format",
//       })
//       .optional(),

//     thumbnailUrl: z.string().url("Invalid URL").optional(),
//   }),
// });
