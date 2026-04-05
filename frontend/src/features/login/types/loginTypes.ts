import type { FormikErrors, FormikTouched } from "formik";

export interface LoginFormType {
  email: string;
  password: string;
}

export interface LoginFormProps {
  errors: FormikErrors<LoginFormType>;
  touched: FormikTouched<LoginFormType>;
  isValid: boolean;
  dirty: boolean;
}
