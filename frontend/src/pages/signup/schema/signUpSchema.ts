import * as y from "yup";

export const signupContactSchema = y.object().shape({
  firstName: y
    .string()
    .required("Name is required")
    .min(2, "Name must contain at least 4 letters")
    .max(35, "Maximum 35 name characters"),
  lastName: y
    .string()
    .required("Name is required")
    .min(2, "Name contains at least 4 letters")
    .max(35, "Maximum 35 name characters"),
  gender: y
    .string()
    .required("Gender is required")
    .oneOf(["MALE", "FEMALE"], "Invalid gender selected"),
  countryId: y.string().required("Country is required"),
  address: y
    .string()
    .required("Address is required")
    .min(8, "Full address contains at least 8 character")
    .max(35, "Maximum 35 characters"),
  referralCode: y.string().optional(),
});

export const signupCredentialsSchema = y.object().shape({
  email: y
    .string()
    .required("Email is required")
    .email("Email address is not valid")
    .max(100, "Maximum 100 email characters"),
  phone: y
    .string()
    .required("Phone number is required")
    .min(8, "Phone contains at least 8 digits")
    .max(15, "Maximum 15 digits"),
  password: y.string().required(),
  confirmPassword: y.string().required(),
});
