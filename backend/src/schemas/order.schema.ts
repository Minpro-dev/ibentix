import * as z from "zod";

export const createOrder = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, "First name at least has 2 characters")
      .max(30, "Maximum first name is 30 characters")
      .optional(),
    lastName: z
      .string()
      .min(2, "First name at least has 2 characters")
      .max(30, "Maximum first name is 30 characters")
      .optional(),
    phone: z
      .string()
      .min(9, "Phone at least contains 9 digits")
      .max(15, "Maximum phone is 15 digits")
      .optional(),
    address: z
      .string()
      .min(5, "Address at least contains 5 characters")
      .max(45, "Maximum address is 45 characters")
      .optional(),
    countryId: z.uuid().optional(),
    password: z
      .string()
      .min(8, "Password at least has 8 characters")
      // Contoh regex: Harus ada huruf besar, kecil, dan angka
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain capital, lower case, dan numbers",
      )
      .optional(),
    avatar: z.string().optional(),
  }),
});
