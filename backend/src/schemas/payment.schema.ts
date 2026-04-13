import * as z from "zod";

const statusEnum = z.enum([
  "WAITING_FOR_PAYMENT",
  "WAITING_FOR_ADMIN_CONFIRMATION",
  "DONE",
  "REJECTED",
  "EXPIRED",
  "CANCELED",
]);

export const updatePaymentStatusSchema = z.object({
  body: z.object({
    orderId: z.uuid("Invalid order UUID"),
    paymentStatus: statusEnum,
  }),
});

export type UpdatePaymentStatusSchema = z.infer<
  typeof updatePaymentStatusSchema
>["body"];
