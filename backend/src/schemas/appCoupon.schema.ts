import * as z from "zod";

// ---------------------- CREATE APP COUPON
export const createAppCouponShema = z.object({
  body: z.object({
    couponCode: z.string().max(10, "Max 10 characters"),
    totalCouponAvailable: z.number("Total coupon available should be a number"),

    validFrom: z.preprocess((val) => {
      if (typeof val === "string" || val instanceof Date) {
        return new Date(val);
      }
      return val;
    }, z.date()),
    validUntil: z.preprocess((val) => {
      if (typeof val === "string" || val instanceof Date) {
        return new Date(val);
      }
      return val;
    }, z.date()),

    discountAmount: z.number("Discount amount should be a number"),
  }),
});

// DELETE

export const deleteAppCouponSchema = z.object({
  body: z.object({
    appCouponId: z.uuid(),
  }),
});

export const changeAppCouponStatusSchema = z.object({
  body: z.object({
    appCouponId: z.uuid(),
  }),
});

export type CreateAppCouponSchema = z.infer<
  typeof createAppCouponShema
>["body"];
export type DeleteAppCouponSchema = z.infer<
  typeof deleteAppCouponSchema
>["body"];
export type ChangeAppCouponStatusSchema = z.infer<
  typeof changeAppCouponStatusSchema
>["body"];
