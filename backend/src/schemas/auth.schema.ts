import * as z from "zod";

const ROLE_ENUM = z.enum(["ATTENDEE", "ORGANIZER"]);
const GENDER_ENUM = z.enum(["MALE", "FEMALE"]);

export const signupSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, "First name at least has 2 characters")
      .max(30, "Maximum first name is 30 characters"),
    lastName: z
      .string()
      .min(2, "First name at least has 2 characters")
      .max(30, "Maximum first name is 30 characters"),
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
    // avatar: z.string().optional(),
    // usedReferralCode: z.string().optional(),
  }),
});

export const editUserSchema = z.object({
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
    gender: GENDER_ENUM.optional(),
    address: z
      .string()
      .min(5, "Address at least contains 5 characters")
      .max(45, "Maximum address is 45 characters")
      .optional(),
    countryId: z.uuid().optional(),
    role: ROLE_ENUM.optional(),
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

export const loginSchema = z.object({
  body: signupSchema.shape.body.pick({
    email: true,
    password: true,
  }),
});

export const insertReferralSchemas = z.object({
  body: z.object({
    email: z
      .email({ message: "Email is not valid" })
      .max(100, "Email is too long"),
    referralCode: z.string().max(10, "Referral code is too long"),
  }),
});

export const updatePasswordSchema = z.object({
  body: z.object({
    newPassword: z
      .string()
      .min(8, "Password at least has 8 characters")
      // Contoh regex: Harus ada huruf besar, kecil, dan angka
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain capital, lower case, dan numbers",
      ),
  }),
  params: z.object({
    token: z.string(),
  }),
});

export type SignupSchema = z.infer<typeof signupSchema>["body"];
export type EditUserDetails = z.infer<typeof editUserSchema>["body"];
export type InsertReferral = z.infer<typeof insertReferralSchemas>["body"];
export type LoginSchema = z.infer<typeof loginSchema>["body"];
export type updatePasswordSchemaBody = z.infer<
  typeof updatePasswordSchema
>["body"];
export type updatePasswordSchemaParams = z.infer<
  typeof updatePasswordSchema
>["params"];
