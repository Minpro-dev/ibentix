import * as Yup from "yup";

export const createOrderSchema = Yup.object().shape({
  eventId: Yup.string()
    .required("Event is required"),

  tickets: Yup.array()
    .of(
      Yup.object().shape({
        fullName: Yup.string()
          .min(3, "Name must be at least 3 characters")
          .max(100, "Name is too long")
          .required("Full name is required"),

        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
      })
    )
    .min(1, "At least 1 ticket is required")
    .required("Tickets are required"),

  // 🔹 Optional fields (sesuai backend kamu)
  isPointsUsed: Yup.boolean(),

  eventCouponId: Yup.string().nullable(),

  appCouponId: Yup.string().nullable(),

  referralCouponId: Yup.string().nullable(),
});