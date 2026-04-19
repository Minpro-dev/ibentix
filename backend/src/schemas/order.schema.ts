import * as z from "zod";

const ticketSchema = z.object({
  attendeeName: z.string().min(3, "Name is too short"),
  attendeeEmail: z.email("Invalid email format"),
});

export const createOrderSchema = z.object({
  body: z.object({
    eventId: z.uuid("Invalid event UUID"),
    isPointsUsed: z.boolean().default(false),
    eventCouponId: z.uuid("Invalid event coupon UUID").nullable().optional(),
    appCouponId: z.uuid("Invalid app coupon UUID").nullable().optional(),
    referralCouponId: z
      .uuid("Invalid referral coupon UUID")
      .nullable()
      .optional(),
    tickets: z.array(ticketSchema).min(1, "At least one ticket is required"),
  }),
});

export type CreateOrerSchema = z.infer<typeof createOrderSchema>["body"];
