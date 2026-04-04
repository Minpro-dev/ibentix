import * as z from "zod";

const ROLE_ENUM = z.enum(["ATTENDEE", "ORGANIZER"]);
const GENDER_ENUM = z.enum(["MALE", "FEMALE"]);

export const signupSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, "First name at least has 2 characters")
      .max(30, "Maximum first name is 30 character"),
    lastName: z
      .string()
      .min(2, "First name at least has 2 characters")
      .max(30, "Maximum first name is 30 character"),
    email: z
      .email({ message: "Email is not valid" })
      .max(100, "Email is too long"),
    phone: z
      .string()
      .min(9, "Phone at least contains 9 digits")
      .max(15, "Maximum phone is 15 digits"),
    gender: GENDER_ENUM,
    address: z
      .string()
      .min(5, "Address at least contains 5 characters")
      .max(45, "Maximum address is 45 characters"),
    countryId: z.uuid(),
    role: ROLE_ENUM,
    password: z
      .string()
      .min(8, "Password at least has 8 characters")
      // Contoh regex: Harus ada huruf besar, kecil, dan angka
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain capital, lower case, dan numbers",
      ),
    confirmPassword: z.string(),
    avatar: z.string().optional(),
    usedReferralCode: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: signupSchema.shape.body.pick({
    email: true,
    password: true,
  }),
});

export type SignupSchema = z.infer<typeof signupSchema>["body"];
export type LoginSchema = z.infer<typeof loginSchema>["body"];
