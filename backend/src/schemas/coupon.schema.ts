import * as z from "zod";

export const createEventCouponSchema = z.object({
  body: z.object({
    couponCode: z
      .string()
      .min(5, "Coupon code at least 5 characters")
      .max(10, "Maximum coupon code is 10 characters"),
    eventId: z.uuid(),
    validFrom: z.preprocess(
      (val) => {
        if (typeof val === "string" || val instanceof Date) {
          return new Date(val);
        }
        return val;
      },
      z.date().min(new Date(), "Start date cannot be past time"),
    ),

    validUntil: z.preprocess((val) => {
      if (typeof val === "string" || val instanceof Date) {
        return new Date(val);
      }
      return val;
    }, z.date()),
    discountAmount: z.number("Must be a number"),
  }),
});

export type createEventCouponSchema = z.infer<
  typeof createEventCouponSchema
>["body"];
