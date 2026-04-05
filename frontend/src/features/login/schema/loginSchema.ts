import * as y from "yup";

export const loginSchema = y.object().shape({
  email: y
    .string()
    .required("Email is required")
    .email("Email address is not valid")
    .max(100, "Maximum 100 email characters"),
  password: y.string().required(),
});
