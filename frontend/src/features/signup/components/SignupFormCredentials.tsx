import { Field, type FormikErrors, type FormikTouched } from "formik";
import { useState } from "react";
import { getAllData } from "../../../services/authService";

export interface ContactFormValue {
  email: string;
  phone: string;
  password: string;
  reconfirmPassword: string;
}

interface SignupFormCredentialsProps {
  onHandlePrev: () => void;
  errors: FormikErrors<ContactFormValue>;
  touched: FormikTouched<ContactFormValue>;
  isValid: boolean;
  dirty: boolean;
}

function SignupFormCredentials({
  onHandlePrev,
  errors,
  touched,
  isValid,
  dirty,
}: SignupFormCredentialsProps) {
  const [hidePassword, setHidePassword] = useState(true);

  const handleHidePassword = () => {
    setHidePassword((hide) => !hide);
  };

  return (
    <div className="space-y-5">
      {/* Row 2: Contact */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-indigo-700 ml-1">Email Address</label>
          <Field
            name="email"
            placeholder="name@email.com"
            className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-indigo-700 ml-1">Phone Number</label>
          <Field
            name="phone"
            maxLength={15}
            placeholder="08123456789"
            className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all"
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Row 4: Passwords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-indigo-700 ml-1">Password</label>
          <Field
            name="password"
            type={hidePassword ? "password" : "text"}
            placeholder="••••••••"
            className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all"
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-[10px] mt-1">{errors.password}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-indigo-700 ml-1">
            Reconfirm Password
          </label>
          <Field
            name="reconfirmPassword"
            type={hidePassword ? "password" : "text"}
            placeholder="••••••••"
            className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30 transition-all"
          />
          {errors.reconfirmPassword && touched.reconfirmPassword && (
            <p className="text-red-500 text-[10px] mt-1">
              {errors.reconfirmPassword}
            </p>
          )}
        </div>
      </div>

      <div onClick={handleHidePassword} className="cursor-pointer">
        <p>{hidePassword ? "Show password" : "Hide password"}</p>
      </div>

      {/* Action Button */}
      <button
        disabled={isValid && dirty}
        type="submit"
        // onClick={getAllData}
        className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white  py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 tracking-wider text-md">
        Create Account
      </button>
      {/* Previous Button */}
      <button
        type="button"
        onClick={onHandlePrev}
        className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white  py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 tracking-wider text-md">
        Previous
      </button>
    </div>
  );
}

export default SignupFormCredentials;
