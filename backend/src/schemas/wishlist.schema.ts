import { z } from "zod";

export const createWishlistSchema = z.object({
  body: z.object({
    eventId: z
      .string()
      .min(1, "eventId is required"),
  }),
});