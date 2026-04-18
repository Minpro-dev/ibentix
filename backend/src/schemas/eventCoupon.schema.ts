import { startOfDay } from "date-fns";
import * as z from "zod";

// --------- CREATE
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
      z.date().min(startOfDay(new Date()), "Start date cannot be past time"),
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

// ----- GET BY ID
export const getCouponDetailsSchema = z.object({
  params: z.object({
    eventCouponId: z.uuid(),
  }),
});

// ----- GET ALL
export const getAllEventCouponsSchema = z.object({
  query: z.object({
    eventId: z.uuid().optional(),
    search: z.string().optional(),
    validFrom: z.string().optional(),
    validUntil: z.string().optional(),
    createdAt: z.string().optional(),
  }),
});

// ------ DELETE
export const deleteEventCouponSchema = z.object({
  body: createEventCouponSchema.shape.body.pick({
    eventId: true,
  }),
});

export type createEventCouponSchema = z.infer<
  typeof createEventCouponSchema
>["body"];
export type getCouponDetailsSchema = z.infer<
  typeof getCouponDetailsSchema
>["params"];
export type getAllCouponsQuerySchema = z.infer<
  typeof getAllEventCouponsSchema
>["query"];
export type deleteEventCouponSchema = z.infer<
  typeof deleteEventCouponSchema
>["body"];
