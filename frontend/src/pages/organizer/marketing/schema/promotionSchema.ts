import * as Yup from "yup";

export const promotionSchema = Yup.object().shape({
  couponCode: Yup.string()
    .required("Coupon code is required")
    .min(3, "Code is too short")
    .max(20, "Code is too long")
    .matches(/^[a-zA-Z0-9]+$/, "Code must be alphanumeric (no spaces)"),

  discountAmount: Yup.number()
    .required("Discount amount is required")
    .min(1, "Discount must be at least 1")
    .typeError("Discount must be a number"),

  validFrom: Yup.date()
    .required("Start date is required")
    .typeError("Invalid date format")
    .min(new Date(), "Start date cannot be in the past"),

  validUntil: Yup.date()
    .required("End date is required")
    .typeError("Invalid date format")
    // Logika agar tanggal berakhir tidak mendahului tanggal mulai
    .min(Yup.ref("validFrom"), "End date must be after the start date"),
});
