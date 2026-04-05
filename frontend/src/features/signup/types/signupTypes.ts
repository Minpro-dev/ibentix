import type { FormikErrors, FormikTouched } from "formik";
import type { Role } from "../../../types/userType";

// ----------- CONTACT FORM
export interface ContactFormValue {
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "";
  referralCode?: string;
  countryId?: string;
  address: string;
}

export interface SignupFormContactProps {
  onHandleSelectRole: (role: Role) => void;
  onHandleNext: () => void;
  role: string;
  errors: FormikErrors<ContactFormValue>;
  touched: FormikTouched<ContactFormValue>;
}

// ----------- CREDENTIALS FORM
export interface ContactFormValue {
  email: string;
  phone: string;
  password: string;
  reconfirmPassword: string;
}

export interface SignupFormCredentialsProps {
  onHandlePrev: () => void;
  errors: FormikErrors<ContactFormValue>;
  touched: FormikTouched<ContactFormValue>;
  isValid: boolean;
  dirty: boolean;
}
