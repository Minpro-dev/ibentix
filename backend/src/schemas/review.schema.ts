// (orderId, eventId, rating, title, description, isAnonymous);

import * as z from "zod";

export const reviewSchema = z.object({
  body: z.object({
    orderId: z.uuid("Invalid order UUID"),
    eventId: z.uuid("Invalid event UUID"),
    rating: z
      .number()
      .min(1, "Review range from 1 to 5")
      .max(5, "Review range from 1 to 5"),
    title: z
      .string()
      .min(8, "Title at least has 8 characters")
      .max(50, "Maximum title character is 50"),
    description: z
      .string()
      .min(15, "Description at least has 15 characters")
      .max(500, "Maximum Description character is 500"),
    isAnonymous: z.boolean().default(false).optional(),
  }),
});

export type ReviewSchema = z.infer<typeof reviewSchema>["body"];
